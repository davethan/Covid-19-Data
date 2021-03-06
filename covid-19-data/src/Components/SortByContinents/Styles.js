import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap-reverse",
    justifyContent: "center",
    minWidth: "fit-content",
    width: "100%",
    margin: "0rem auto 0rem",
  },
  individual: {
    borderRadius: "5px 5px 0px 0px",
    backgroundColor: "white",
    '&:hover': {
      backgroundColor: "rgba(240, 240, 240, 1)"
  }
  },
});
export default useStyles;
