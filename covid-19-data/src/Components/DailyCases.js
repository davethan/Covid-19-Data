import React from "react";
import styles from "./CountryGeneralConfirmedDeaths/Styles";
import { withStyles } from "@material-ui/styles";
import CountryChart from "./Charts/CountryChart";
import Typography from "@material-ui/core/Typography";
import Loading from "./Loading";

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

function makeDaily(data){
    var i;
    for (i=data.length-1;i>0;i--){
        data[i].Cases = data[i].Cases - data[i-1].Cases
    }
    return data;
}

class DailyCases extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  async componentDidMount() {
    const slug = getSlug(this.props.props.props.match.url);

    const url = `https://api.covid19api.com/dayone/country/${slug}/status/confirmed`;
    const response = await fetch(url);
    let data = await response.json();

    let dataWithoutDetails = dataEdit(data);
    let dailyConfirmed = makeDaily(dataWithoutDetails)
    this.setState({
        dailyConfirmed
    });
  }

  render() {
    const { classes } = this.props;
    if (this.state === null) {
      return <Loading />;
    } else if (this.state.dailyConfirmed.length <= 0) {
      return (
        <Typography className={classes.noData}>
          This country doesn't have any recovered.
        </Typography>
      );
    } else {
      return (
        <div>
          <CountryChart
            dataWithoutDetails={this.state.dailyConfirmed}
          />
        </div>
      );
    }
  }
}

export default withStyles(styles)(DailyCases);
