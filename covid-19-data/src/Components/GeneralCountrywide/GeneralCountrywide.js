import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Styles.js";

export default function GeneralCountrywide(props) {
  function getCasesStatus(data) {
    if (data[data.length - 1].Cases < 100) {
      return "Insufficient data";
    }
    if (data[0].Cases > data[data.length - 1].Cases) {
      return "Decreasing";
    }
    let sum = 0;
    const rate = 1.2;
    const check = 5;
    for (let i = 0; i < check; i++) {
      if (i === 0 || i === check - 1) {
      }
      if (
        data[i].Cases * rate <= data[i + check].Cases &&
        data[i + check].Cases * rate <= data[i + 2 * check].Cases
      ) {
        sum++;
      }
    }
    if (sum >= 3) {
      return "Increasing Exponentially";
    }
    return "Increasing Linearly";
  }

  const classes = useStyles();

  let dr = (props.deathsLastDay.Cases * 100) / props.casesLastDay.Cases;
  dr = Math.round(dr * 10) / 10;

  const casesStatus = getCasesStatus(props.casesLast2Weeks);
  const deathsStatus = getCasesStatus(props.deathsLast2Weeks);

  let casesLastDayDots = props.casesLastDay.Cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  let deathsLastDayDots = props.deathsLastDay.Cases.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.listItem}>
          <Typography variant="h6" className={classes.typography}>
            Total Cases in {props.casesLastDay.Country}
          </Typography>
          <Typography variant="h4" className={classes.typography}>
            {casesLastDayDots}
          </Typography>
        </ListItem>
        <div className={classes.pairOfStatistics}>
          <ListItem button className={classes.listItem}>
            <Typography variant="h6" className={classes.typography}>
              Total Deaths
            </Typography>
            <Typography variant="h4" className={classes.typography}>
              {deathsLastDayDots}
            </Typography>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Typography variant="h6" className={classes.typography}>
              Death rate
            </Typography>
            <Typography variant="h4" className={classes.typography}>
              {dr}%
            </Typography>
          </ListItem>
        </div>
        <div className={classes.pairOfStatistics}>
          <ListItem button className={classes.listItem}>
            <Typography variant="h6" className={classes.typography}>
              Cases status*
            </Typography>
            <Typography variant="h4" className={classes.typography}>
              {casesStatus}
            </Typography>
          </ListItem>
          <ListItem button className={classes.listItem}>
            <Typography variant="h6" className={classes.typography}>
              Deaths status*
            </Typography>
            <Typography variant="h4" className={classes.typography}>
              {deathsStatus}
            </Typography>
          </ListItem>
        </div>
      </List>
    </div>
  );
}
