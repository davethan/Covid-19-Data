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

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.componentDidMount = this.componentDidMount.bind(this);
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
    this.setState({ data });
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
                <CountriesSummary CountriesSummary={state.data.Countries} />
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
