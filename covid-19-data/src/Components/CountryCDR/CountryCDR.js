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
  let dataWithoutProvinces = [];
  let k = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].Province === "") {
      dataWithoutProvinces[k] = data[i];
      k++;
    }
  }
  for (let i = 0; i < dataWithoutProvinces.length; i++) {
    delete dataWithoutProvinces[i]["CountryCode"];
    delete dataWithoutProvinces[i]["City"];
    delete dataWithoutProvinces[i]["CityCode"];
    delete dataWithoutProvinces[i]["Lat"];
    delete dataWithoutProvinces[i]["Lon"];
    delete dataWithoutProvinces[i]["Province"];
  }
  return dataWithoutProvinces;
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

    /*
    let data = [
      {
        Country: "Albania",
        CountryCode: "AL",
        Province: "",
        City: "",
        CityCode: "",
        Lat: "41.15",
        Lon: "20.17",
        Cases: 2,
        Status: "confirmed",
        Date: "2020-03-09T00:00:00Z",
      },
      {
        Country: "Albania",
        CountryCode: "AL",
        Province: "",
        City: "",
        CityCode: "",
        Lat: "41.15",
        Lon: "20.17",
        Cases: 10,
        Status: "confirmed",
        Date: "2020-03-10T00:00:00Z",
      },
      {
        Country: "Albania",
        CountryCode: "AL",
        Province: "",
        City: "",
        CityCode: "",
        Lat: "41.15",
        Lon: "20.17",
        Cases: 12,
        Status: "confirmed",
        Date: "2020-03-11T00:00:00Z",
      },
    ];*/

    // let data = [];
    let dataConfirmedWithoutProvinces = dataEdit(dataConfirmed);
    let dataDeathsWithoutProvinces = dataEdit(dataDeaths);
    let dataRecoveredWithoutProvinces = dataEdit(dataRecovered);

    this.setState({
      dataConfirmedWithoutProvinces,
      dataDeathsWithoutProvinces,
      dataRecoveredWithoutProvinces,
    });
  }

  render() {
    const { classes } = this.props;

    if (this.state === null) {
      return <Loading />;
    } else if (this.state.dataConfirmedWithoutProvinces.length <= 0) {
      return (
        <Typography className={classes.noData}>
          This country doesn't have any cases.
        </Typography>
      );
    } else {
      const CurrentCases = this.state.dataConfirmedWithoutProvinces.length - 1;
      const CurrentDeaths = this.state.dataDeathsWithoutProvinces.length - 1;
      return (
        <div className={classes.countryCDR}>
          <GenaralCountrywide
            cases={this.state.dataConfirmedWithoutProvinces[CurrentCases]}
            deaths={this.state.dataDeathsWithoutProvinces[CurrentDeaths]}
          />
          <CountryChart
            dataWithoutProvinces={this.state.dataConfirmedWithoutProvinces}
          />
          <CountryChart
            dataWithoutProvinces={this.state.dataDeathsWithoutProvinces}
          />
          <CountryChart
            dataWithoutProvinces={this.state.dataRecoveredWithoutProvinces}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(CountryCDR);
