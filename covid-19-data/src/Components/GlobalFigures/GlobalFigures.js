import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Styles.js";

export default function GlobalFigures(props) {
  const classes = useStyles();
  const data = props.Globals;

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Total Cases Worldwide</Typography>
          <Typography variant="h4">{data.TotalConfirmed}</Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6">Total Deaths Worldwide</Typography>
          <Typography variant="h4">{data.TotalDeaths}</Typography>
        </ListItem>
      </List>
    </div>
  );
}
