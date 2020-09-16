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
  titleOfTablecells: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  icon: {
    maxHeight: "1rem",
    minWidth: "1rem",
    color: "#c2c2c2"
  },
  iconButton: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});
export default useStyles;
