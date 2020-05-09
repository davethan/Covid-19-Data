import React from "react";
import useStyles from "./Styles.js";
import CountryCases from "../Charts/CountryCases";
import CountryDeaths from "../Charts/CountryDeaths";
import CountryRecovered from "../Charts/CountryRecovered";

export default function CountryCDR(props) {
  const classes = useStyles();
  let slug = props.props.location.pathname;
  slug = slug.slice(9, slug.length);
  return (
    <div className={classes.countryCDR}>
      <CountryCases slug={slug} />
      <CountryDeaths slug={slug} />
      <CountryRecovered slug={slug} />
    </div>
  );
}
