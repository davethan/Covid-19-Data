import React, { useLayoutEffect, useState } from "react";
import { WorldMap } from "react-svg-worldmap";
import Switch from "@material-ui/core/Switch";
import useStyles from "./Styles.js";
import { Paper } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";

function createCases(data) {
  let cases = [];
  for (let i = 0; i < data.length; i++) {
    cases[i] = {
      country: data[i].CountryCode.toLowerCase(),
      value: data[i].TotalConfirmed,
    };
  }
  return cases;
}

function createDeaths(data) {
  let deaths = [];
  for (let i = 0; i < data.length; i++) {
    deaths[i] = {
      country: data[i].CountryCode.toLowerCase(),
      value: data[i].TotalDeaths,
    };
  }
  return deaths;
}

function useWindowSize() {
  let [size, setSize] = useState("md");
  const addPixels = 10;
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth < 366 + addPixels) {
        size = "sm";
      } else if (
        window.innerWidth >= 366 + addPixels &&
        window.innerWidth < 480 + addPixels
      ) {
        size = "md";
      } else if (
        window.innerWidth >= 480 + addPixels &&
        window.innerWidth < 640 + 5 * addPixels
      )
        size = "lg";
      else {
        size = "xl";
      }
      setSize(size);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function Map(props) {
  const classes = useStyles();
  const sizeOfSVG = useWindowSize();
  let cases = createCases(props.data);
  let deaths = createDeaths(props.data);

  const [state, setState] = React.useState({
    dataToShow: cases,
    color: "red",
    title: "Total cases worldwide",
    checked: true,
  });

  const handleChange = (event) => {
    let data, color, title;
    if (!event.target.checked) {
      data = deaths;
      color = "black";
      title = "Total deaths worldwide";
    } else {
      data = cases;
      color = "red";
      title = "Total cases worldwide";
    }
    setState({
      dataToShow: data,
      color: color,
      title: title,
      [event.target.name]: event.target.checked,
    });
  };

  return state.dataToShow === null ||
    state.dataToShow === undefined ||
    sizeOfSVG === null ||
    sizeOfSVG === undefined ? (
    <Skeleton
      animation="wave"
      variant="rect"
      className={classes.mapAndSwitch}
      height={400}
      style={{ marginTop: "0.7rem" }}
    />
  ) : (
    <Paper elevation={1} className={classes.mapAndSwitch}>
      <Typography variant="h6" className={classes.title}>{state.title}</Typography>
      <WorldMap
        color={state.color}
        title=""
        value-suffix="people"
        size={sizeOfSVG}
        data={state.dataToShow}
      />
      <Switch
        className={classes.switch}
        checked={state.checked}
        onChange={handleChange}
        name="checked"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </Paper>
  );
}
//# sourceMappingURL=react-svg-worldmap.esm.js.map
// var CSizes = {
//   "sm": 240,
//   "md": 336,
//   "lg": 480,
//   "xl": 640
// };
