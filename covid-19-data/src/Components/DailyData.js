import React from "react";
import styles from "./CountryGeneralConfirmedDeaths/Styles";
import { withStyles } from "@material-ui/styles";
import CountryChart from "./Charts/CountryChart";

function makeDailyAndFixNegativeCases(data) {
  let i;
  data[data.length - 1].Cases =
    data[data.length - 1].Cases - data[data.length - 2].Cases;
  for (i = data.length - 2; i > 0; i--) {
    data[i].Cases = data[i].Cases - data[i - 1].Cases;
    if (
      data[i + 1].Cases < 0 &&
      data[i].Cases > 0 &&
      -data[i + 1].Cases <= data[i].Cases
    ) {
      data[i].Cases = data[i].Cases + data[i + 1].Cases;
      data[i + 1].Cases = 0;
    }
  }
  return data;
}

class DailyData extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  componentDidMount() {
    const dailyData = makeDailyAndFixNegativeCases(
      this.props.dataWithoutDetails
    );
    this.setState({
      dailyData,
    });
  }

  render() {
    if (this.state === null) {
      return <div></div>;
    } else {
      return (
        <CountryChart
          dataWithoutDetails={this.state.dailyData}
          typeOfChart={"column"}
          totalOrDaily={"Daily"}
        />
      );
    }
  }
}

export default withStyles(styles)(DailyData);
