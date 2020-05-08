import React from "react";
import useStyles from "./Styles.js";
import Summary from "../Summary/Summary";
import Header from "../Header";

function App() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.App}>
        <Summary />
      </div>
    </div>
  );
}

export default App;
