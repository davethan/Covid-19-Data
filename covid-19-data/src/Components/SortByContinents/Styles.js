import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent:"center",
    minWidth: "fit-content",
    width: "100%",
    margin: "0rem auto 0rem",
  },
  form: {
    minWidth: "fit-content",
    width: "100%",
  }
});
export default useStyles;
