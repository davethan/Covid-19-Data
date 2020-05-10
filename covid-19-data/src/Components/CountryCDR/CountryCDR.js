import React from "react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import CountryChart from "../Charts/CountryChart";
import Typography from "@material-ui/core/Typography";
import Loading from "../Loading";
import GenaralCountrywide from "../GeneralCountrywide/GeneralCountrywide";

function getSlug(slug) {
  slug = slug.slice(9, slug.length);
  return slug;
}

function dataEdit(data) {
  let dataWithoutDetails = [];
  let k = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].Province === "") {
      dataWithoutDetails[k] = data[i];
      k++;
    }
  }
  for (let i = 0; i < dataWithoutDetails.length; i++) {
    delete dataWithoutDetails[i]["CountryCode"];
    delete dataWithoutDetails[i]["City"];
    delete dataWithoutDetails[i]["CityCode"];
    delete dataWithoutDetails[i]["Lat"];
    delete dataWithoutDetails[i]["Lon"];
    delete dataWithoutDetails[i]["Province"];
  }
  return dataWithoutDetails;
}

function last2weeks(data){
  if (data.length < 14){
    return [];
  }
  return data.slice(data.length-15, data.length)
}

function lastDay(data){
  return data[data.length - 1];
}

class CountryCDR extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  async componentDidMount() {
    const slug = getSlug(this.props.props.match.url);

    let url = `https://api.covid19api.com/dayone/country/${slug}/status/confirmed`;
    const responseConfirmed = await fetch(url);
    let dataConfirmed = await responseConfirmed.json();

    url = `https://api.covid19api.com/dayone/country/${slug}/status/deaths`;
    const responseDeaths = await fetch(url);
    let dataDeaths = await responseDeaths.json();

    url = `https://api.covid19api.com/dayone/country/${slug}/status/recovered`;
    const responseRecovered = await fetch(url);
    let dataRecovered = await responseRecovered.json();

    let dataConfirmedWithoutDetails = dataEdit(dataConfirmed);
    let dataDeathsWithoutDetails = dataEdit(dataDeaths);
    let dataRecoveredWithoutDetails = dataEdit(dataRecovered);

    this.setState({
      dataConfirmedWithoutDetails,
      dataDeathsWithoutDetails,
      dataRecoveredWithoutDetails,
    });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state);
    if (this.state === null) {
      return <Loading />;
    } else if (this.state.dataConfirmedWithoutDetails.length <= 0) {
      return (
        <Typography className={classes.noData}>
          This country doesn't have any cases.
        </Typography>
      );
    } else {
      const casesLast2Weeks = last2weeks(this.state.dataConfirmedWithoutDetails);
      const deathsLast2Weeks = last2weeks(this.state.dataDeathsWithoutDetails);
      const casesLastDay = lastDay(this.state.dataConfirmedWithoutDetails);
      const deathsLastDay = lastDay(this.state.dataDeathsWithoutDetails);
      return (
        <div className={classes.countryCDR}>
          <GenaralCountrywide
            casesLastDay={casesLastDay}
            deathsLastDay={deathsLastDay}
            casesLast2Weeks={casesLast2Weeks}
            deathsLast2Weeks={deathsLast2Weeks}
          />
          <CountryChart
            dataWithoutDetails={this.state.dataConfirmedWithoutDetails}
          />
          <CountryChart
            dataWithoutDetails={this.state.dataDeathsWithoutDetails}
          />
          <CountryChart
            dataWithoutDetails={this.state.dataRecoveredWithoutDetails}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(CountryCDR);
