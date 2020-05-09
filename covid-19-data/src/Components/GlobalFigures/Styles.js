import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0rem auto 0.5rem",
    maxWidth: 360,
    backgroundColor: "initial",
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
