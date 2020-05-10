import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "fit-content",
    width: "100%",
    margin: "0rem auto 0.5rem",
    maxWidth: 360,
    backgroundColor: "initial",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
  },
  typography: {
    textAlign: "center",
  },
  pairOfStatistics: {
    display: "flex",
  },
  "@media(max-width: 600px)": {
    pairOfStatistics: {
      flexDirection: "column",
    },
  },
}));

export default useStyles;
