import React from "react";
import useStyles from "./Styles.js";
import Summary from "../Summary/Summary";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Summary />
    </div>
  );
}

export default App;
