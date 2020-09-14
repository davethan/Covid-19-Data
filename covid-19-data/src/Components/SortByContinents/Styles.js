import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  radioGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:"center",
    minWidth: "fit-content",
    width: "100%",
    margin: "0rem auto 0.5rem",
  },
  form: {
    minWidth: "fit-content",
    width: "100%",
  },
  individual: {
    width: "5.1rem",
  }
});
export default useStyles;
