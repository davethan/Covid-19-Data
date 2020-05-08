import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Styles.js";

export default function GlobalFigures(props) {
  const classes = useStyles();
  const data = props.Globals;

  return (
    <div className={classes.root}>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.listItem}>
          <Typography className={classes.typography}>
            <h3>Total Cases Worldwide</h3>
          </Typography>
          <Typography className={classes.typography}>
            <h1>{data.TotalConfirmed}</h1>
          </Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography className={classes.typography}>
            <h3>Total Deaths Worldwide</h3>
          </Typography>
          <Typography className={classes.typography}>
            <h1>{data.TotalDeaths}</h1>
          </Typography>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
}
