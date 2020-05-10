import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Styles.js";

export default function GeneralCountrywide(props) {
  function getCasesStatus(data) {
    console.log(data);
    if (data[data.length - 1].Cases < 100){
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
        console.log(data[i].Cases);
        console.log(data[i + check].Cases);
        console.log(data[i + 2 * check].Cases);
      }
      if (
        data[i].Cases * rate <= data[i + check].Cases &&
        data[i + check].Cases * rate <= data[i + 2 * check].Cases
      ) {
        sum++;
      }
    }
    console.log(sum);
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

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">
            Total Cases in {props.casesLastDay.Country}
          </Typography>
          <Typography variant="h4">{props.casesLastDay.Cases}</Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Total Deaths</Typography>
          <Typography variant="h4">{props.deathsLastDay.Cases}</Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Death rate</Typography>
          <Typography variant="h4">{dr}%</Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Cases status</Typography>
          <Typography variant="h5">{casesStatus}</Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Deaths status</Typography>
          <Typography variant="h5">{deathsStatus}</Typography>
        </ListItem>
      </List>
    </div>
  );
}
