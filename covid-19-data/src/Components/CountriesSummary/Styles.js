import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  link: {
    textTransform: "none",
    textDecoration: "none",
    color: "black",
  },
  tableCell: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  icon: {
    maxHeight: "0.7rem",
    minWidth: "1rem",
    color: "#828282",
  },
});
export default useStyles;
