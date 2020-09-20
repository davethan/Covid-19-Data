import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  mapAndSwitch: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    alignItems: "center",
  },
  "@media(max-width: 1430px) and (min-width: 1000px)": {
    mapAndSwitch: {
      width: "70%",
    },
  },
  "@media(max-width: 1000px) and (min-width: 913px)": {
    mapAndSwitch: {
      width: "90%",
    },
  },
  "@media(max-width: 912px)": {
    mapAndSwitch: {
      width: "100%",
    },
  },
  switch: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    paddingTop: "0.8rem"
  },
}));

export default useStyles;

//# sourceMappingURL=react-svg-worldmap.esm.js.map
// var CSizes = {
//   "sm": 240,
//   "md": 336,
//   "lg": 480,
//   "xl": 640
// };