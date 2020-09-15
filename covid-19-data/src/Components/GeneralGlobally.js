import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useStyles from "./GeneralCountrywide/Styles";

export default function GeneralGlobally(props) {
  const classes = useStyles();
  const data = props.Globals;

  let dr = (data.TotalDeaths * 100) / data.TotalConfirmed;
  dr = Math.round(dr * 10) / 10;

  let totalCasesDots = data.TotalConfirmed.toString().replace(
    /(\d)(?=(\d\d\d)+(?!\d))/g,
    "$1."
  );
  let totalDeathsDots = data.TotalDeaths.toString().replace(
    /(\d)(?=(\d\d\d)+(?!\d))/g,
    "$1."
  );

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button className={classes.listItem}>
          <Typography variant="h6" className={classes.typography}>
            Total Cases Worldwide
          </Typography>
          <Typography variant="h4" className={classes.typography}>
            {totalCasesDots}
          </Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6" className={classes.typography}>
            Total Deaths
          </Typography>
          <Typography variant="h4" className={classes.typography}>
            {totalDeathsDots}
          </Typography>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <Typography variant="h6" className={classes.typography}>
            Death Rate
          </Typography>
          <Typography variant="h4" className={classes.typography}>
            {dr}%
          </Typography>
        </ListItem>
      </List>
    </div>
  );
}
