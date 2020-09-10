import React from "react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import Loading from "../Loading";
import GeneralGlobally from "../GeneralGlobally";
import CountriesSummary from "../CountriesSummary/CountriesSummary";
import Typography from "@material-ui/core/Typography";
import { Route } from "react-router-dom";
import LoadEveryChart from "../LoadEveryChart/LoadEveryChart";
import Header from "../Header/Header";

function timeSinceLastUpdate(dateFromState) {
  let date = dateFromState + ""; 
  date = new Date(date);
  date = date + "";
  let day = date.slice(0, 15);
  let heure = date.slice(16, date.length);

  let time = `on ${day} at ${heure}`;
  return time;
}

function compareValues(key, order = 'asc') {
  console.log(key)
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sortTable = this.sortTable.bind(this);
  }

  async componentDidMount() {
    let url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();
    for (let i = 0; i < data.Countries.length; i++) {
      delete data.Countries[i]["CountryCode"];
      delete data.Countries[i]["Date"];
      delete data.Countries[i]["Premium"];
    }
    let asc = {
      NewConfirmed: true,
      TotalConfirmed: true,
      NewDeaths: true,
      TotalDeaths: true,
      NewRecovered: true,
      TotalRecovered: true,
      Country: true,
    }
    this.setState({ data, asc });
  }

  sortTable(index) {
    let data = this.state.data.Countries
    let sortBy
    switch (index) {
      case 2:
        sortBy = "NewConfirmed";
        break;
      case 3:
        sortBy = "TotalConfirmed";
        break;
      case 4:
        sortBy = "NewDeaths";
        break;
      case 5:
        sortBy = "TotalDeaths";
        break;
      case 6:
        sortBy = "NewRecovered";
        break;
      case 7:
        sortBy = "TotalRecovered";
        break;
      default:
        sortBy = "Country";
        break;
    }

    let ascOrDesc = !this.state.asc[sortBy];
    let howToSort = 'asc'
    if (ascOrDesc === false){ howToSort = 'desc'}

    data.sort(compareValues(sortBy, howToSort));
    this.setState(({data}) => ({
      data
    }));
    this.setState(prevState  => ({
      asc:{
        ...prevState.asc,
        [sortBy]: ascOrDesc
      }
    }));
  }

  render() {
    const state = this.state;
    const { classes } = this.props;
    let time;
    if (state) {
      time = timeSinceLastUpdate(state.data.Date);
    }
    return state === null ? (
      <div>
        <Header />
        <div className={classes.summaryBody}>
          <Loading />
        </div>
      </div>
    ) : (
      <div>
        <Header />
        <div className={classes.summaryBody}>
          <Route
            exact
            path="/Covid-19-Data"
            render={() => (
              <div>
                <GeneralGlobally Globals={state.data.Global} />
                <CountriesSummary sortTable={this.sortTable} CountriesSummary={state.data.Countries} />
              </div>
            )}
          />

          <Route
            exact
            path="/Covid-19-Data/country:countryName"
            render={(params) => (
              <LoadEveryChart props={params} />
            )}
          />

          <div className={classes.lastUpdate}>
            <Typography>Last update {time} </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Summary);
