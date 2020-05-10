import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "./Styles";

export default function GeneralCountrywide() {
    const classes = useStyles();
  return (
    <div className={classes.explanations}>
      <Typography>*Based on the last two weeks</Typography>
    </div>
  );
}
