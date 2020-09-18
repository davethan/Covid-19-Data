import React from "react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import CountryChart from "../Charts/CountryChart";
import Typography from "@material-ui/core/Typography";
import GeneralCountrywide from "../GeneralCountrywide/GeneralCountrywide";
import DailyData from "../DailyData.js";
import Skeleton from "@material-ui/lab/Skeleton";

function getSlug(slug) {
  slug = slug.slice(23, slug.length);
  return slug;
}

function dataEdit(data) {
  let dataWithoutDetails = [];
  let k = 0;
  let l;
  for (let i = 0; i < data.length; i++) {
    dataWithoutDetails[k] = data[i];
    l = 1;
    if (data[i + l]) {
      while (data[i].Date === data[i + l].Date) {
        dataWithoutDetails[k].Cases =
          dataWithoutDetails[k].Cases + data[i + l].Cases;
        l++;
        if (!data[i + l]) {
          break;
        }
      }
    }
    i = i + l - 1;
    delete dataWithoutDetails[k]["CountryCode"];
    delete dataWithoutDetails[k]["City"];
    delete dataWithoutDetails[k]["CityCode"];
    delete dataWithoutDetails[k]["Lat"];
    delete dataWithoutDetails[k]["Lon"];
    delete dataWithoutDetails[k]["Province"];
    k++;
  }
  return dataWithoutDetails;
}

function last2weeks(data) {
  if (data.length < 14) {
    return [];
  }
  return data.slice(data.length - 15, data.length);
}

function lastDay(data) {
  return data[data.length - 1];
}

class CountryGeneralConfirmedDeaths extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  async componentDidMount() {
    const slug = getSlug(this.props.props.props.match.url);

    let url = `https://api.covid19api.com/dayone/country/${slug}/status/confirmed`;
    const responseConfirmed = await fetch(url);
    let dataConfirmed = await responseConfirmed.json();

    url = `https://api.covid19api.com/dayone/country/${slug}/status/deaths`;
    const responseDeaths = await fetch(url);
    let dataDeaths = await responseDeaths.json();

    let dataConfirmedWithoutDetails = dataEdit(dataConfirmed);
    let dataDeathsWithoutDetails = dataEdit(dataDeaths);

    this.setState({
      dataConfirmedWithoutDetails,
      dataDeathsWithoutDetails,
    });
  }

  render() {
    const { classes } = this.props;
    if (this.state === null) {
      return (
        <div>
          <Skeleton
            className={classes.skeletonOfGeneral}
            animation="wave"
            variant="rect"
          />
          <Skeleton
            className={classes.skeletonOfGeneralBig}
            animation="wave"
            variant="rect"
          />
          <div className={classes.flexOfSkeleton}>
            <div>
              <Skeleton
                className={classes.skeletonOfGeneral}
                animation="wave"
                variant="rect"
              />
              <Skeleton
                className={classes.skeletonOfGeneralBig}
                animation="wave"
                variant="rect"
              />
            </div>
            <div>
              <Skeleton
                className={classes.skeletonOfGeneral}
                animation="wave"
                variant="rect"
              />
              <Skeleton
                className={classes.skeletonOfGeneralBig}
                animation="wave"
                variant="rect"
              />
            </div>
          </div>
          <div className={classes.flexOfSkeleton}>
            <div>
              <Skeleton
                className={classes.skeletonOfGeneral}
                animation="wave"
                variant="rect"
              />
              <Skeleton
                className={classes.skeletonOfGeneralBig}
                animation="wave"
                variant="rect"
              />
            </div>
            <div>
              <Skeleton
                className={classes.skeletonOfGeneral}
                animation="wave"
                variant="rect"
              />
              <Skeleton
                className={classes.skeletonOfGeneralBig}
                animation="wave"
                variant="rect"
              />
            </div>
          </div>
          <Skeleton
            animation="wave"
            variant="rect"
            height={400}
            style={{ marginTop: "0.7rem" }}
          />
          <Skeleton
            animation="wave"
            variant="rect"
            height={400}
            style={{ marginTop: "0.7rem" }}
          />
          <Skeleton
            animation="wave"
            variant="rect"
            height={400}
            style={{ marginTop: "0.7rem" }}
          />
          <Skeleton
            animation="wave"
            variant="rect"
            height={400}
            style={{ marginTop: "0.7rem" }}
          />
        </div>
      );
    } else if (this.state.dataConfirmedWithoutDetails.length <= 0) {
      return (
        <Typography className={classes.noData}>
          This country doesn't have any cases.
        </Typography>
      );
    } else {
      const casesLast2Weeks = last2weeks(
        this.state.dataConfirmedWithoutDetails
      );
      const deathsLast2Weeks = last2weeks(this.state.dataDeathsWithoutDetails);
      const casesLastDay = lastDay(this.state.dataConfirmedWithoutDetails);
      const deathsLastDay = lastDay(this.state.dataDeathsWithoutDetails);
      return (
        <div>
          <GeneralCountrywide
            casesLastDay={casesLastDay}
            deathsLastDay={deathsLastDay}
            casesLast2Weeks={casesLast2Weeks}
            deathsLast2Weeks={deathsLast2Weeks}
          />
          <CountryChart
            dataWithoutDetails={this.state.dataConfirmedWithoutDetails}
            typeOfChart={"line"}
            totalOrDaily={"Total"}
          />
          <DailyData
            dataWithoutDetails={this.state.dataConfirmedWithoutDetails}
          />
          <CountryChart
            dataWithoutDetails={this.state.dataDeathsWithoutDetails}
            typeOfChart={"line"}
            totalOrDaily={"Total"}
          />
          <DailyData dataWithoutDetails={this.state.dataDeathsWithoutDetails} />
        </div>
      );
    }
  }
}

export default withStyles(styles)(CountryGeneralConfirmedDeaths);
