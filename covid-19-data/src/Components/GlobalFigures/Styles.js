import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "1rem auto 1rem",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
  },
  typography: {
    lineHeight: "0",
  },
}));

export default useStyles;
