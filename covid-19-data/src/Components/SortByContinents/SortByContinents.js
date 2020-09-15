import React from "react";
import Button from "@material-ui/core/Button";
import useStyles from "./Styles.js";

export default function FormControlLabelPlacement(props) {
  const classes = useStyles();
  const buttonLabels = [
    "All",
    "North America",
    "Europe",
    "Asia",
    "Africa",
    "South America",
    "Oceania",
  ];
  return (
    <div className={classes.buttons}>
      {buttonLabels.map(function (key, index) {
        return (
          <Button
            key={index}
            className={classes.individual}
            style={{ borderStyle: "solid solid none solid" }}
            variant="outlined"
            color="primary"
            onClick={() => props.showByContinents(key)}
          >
            {key}
          </Button>
        );
      })}
    </div>
  );
}
