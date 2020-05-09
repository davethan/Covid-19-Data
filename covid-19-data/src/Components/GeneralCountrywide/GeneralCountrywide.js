import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Styles.js";

export default function GeneralCountrywide(props) {
  const classes = useStyles();
  let dr = (props.deaths.Cases * 100) / props.cases.Cases;
  dr = Math.round(dr * 10) / 10;
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">
            Total Cases in {props.cases.Country}
          </Typography>
          <Typography variant="h4">{props.cases.Cases}</Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Total Deaths</Typography>
          <Typography variant="h4">{props.deaths.Cases}</Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Death rate</Typography>
          <Typography variant="h4">{dr}%</Typography>
        </ListItem>
      </List>
    </div>
  );
}
