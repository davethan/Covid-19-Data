import React from "react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import CountryGeneralConfirmedDeaths from "../CountryGeneralConfirmedDeaths/CountryGeneralConfirmedDeaths";
import CountryRecovered from "../CountryRecovered";
import Explanations from "../Explanations/Explanations";

class LoadEveryChart extends React.Component {
  render() {
    const { classes } = this.props;
    if (this.props === null) {
      return <div></div>;
    } else {
      return (
        <div className={classes.LoadEveryChart}>
          <CountryGeneralConfirmedDeaths props={this.props} />
          <CountryRecovered props={this.props} />
          <Explanations />
        </div>
      );
    }
  }
}

export default withStyles(styles)(LoadEveryChart);
