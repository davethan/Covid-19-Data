import React from "react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import Loading from "../Loading";
import GlobalFigures from "../GlobalFigures/GlobalFigures";
import CountriesSummary from "../CountriesSummary/CountriesSummary";
import Typography from "@material-ui/core/Typography";
import { Route } from "react-router-dom";
import CountryCDR from "../CountryCDR/CountryCDR";
import Header from "../Header/Header";

function timeSinceLastUpdate(date) {
  let time = date + "";
  let year = time.slice(0, 4);
  let month = time.slice(5, 7);
  let day = time.slice(8, 10);
  let heure = time.slice(11, 16);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (month[0] == "0") {
    month = month[1];
  }
  month--;
  month = months[month];
  time = `on ${day} ${month} ${year} at ${heure}`;
  return time;
}

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    // console.log("invoked");
    /*
    let url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();

    //if maximum requests reached :
    */
    let data = {
      Global: {
        NewConfirmed: 100282,
        TotalConfirmed: 1162857,
        NewDeaths: 5658,
        TotalDeaths: 63263,
        NewRecovered: 15405,
        TotalRecovered: 230845,
      },
      Countries: [
        {
          Country: "Afghanistan",
          CountryCode: "AF",
          Slug: "afghanistan",
          NewConfirmed: 18,
          TotalConfirmed: 299,
          NewDeaths: 1,
          TotalDeaths: 7,
          NewRecovered: 0,
          TotalRecovered: 10,
          Date: "2020-04-05T06:37:00Z",
        },
        {
          Country: "Albania",
          CountryCode: "AL",
          Slug: "albania",
          NewConfirmed: 29,
          TotalConfirmed: 333,
          NewDeaths: 3,
          TotalDeaths: 20,
          NewRecovered: 10,
          TotalRecovered: 99,
          Date: "2020-04-05T06:37:00Z",
        },
      ],
      Date: "2020-04-05T06:37:00Z",
    };
    for (let i = 0; i < data.Countries.length; i++) {
      delete data.Countries[i]["CountryCode"];
      delete data.Countries[i]["Date"];
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
        <Header/>
        <div className={classes.summaryBody}>
          <Loading />
        </div>
      </div>
    ) : (
      <div>
        <Header/>
        <div className={classes.summaryBody}>
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <GlobalFigures Globals={state.data.Global} />
                <CountriesSummary CountriesSummary={state.data.Countries} />
              </div>
            )}
          />

          <Route
            exact
            path="/country:countryName"
            render={(params) => (
              <div>
                <CountryCDR props={params} />
              </div>
            )}
          />

          <div className={classes.lastUpdate}>
            <Typography>last update: {time} </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Summary);
