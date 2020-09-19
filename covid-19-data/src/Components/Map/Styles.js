import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  mapAndSwitch: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "0.9rem",
    paddingRight: "0.9rem",
    borderRadius: "1rem",
    alignItems: "center",
  },
  "@media(max-width: 900px) and (min-width: 601px)": {
    mapAndSwitch: {
      width: "90%",
    },
  },
  "@media(max-width: 600px)": {
    mapAndSwitch: {
      width: "100%",
    },
  },
  switch: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    paddingTop: "0.3rem"
  },
}));

export default useStyles;
