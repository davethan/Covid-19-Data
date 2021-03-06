import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  appBar: {
    height: "3rem",
  },
  toolBar: {
    minHeight: "3rem",
  },
  link: {
    textTransform: "none",
    textDecoration: "none",
    color: "white",
  },
}));

export default useStyles;
