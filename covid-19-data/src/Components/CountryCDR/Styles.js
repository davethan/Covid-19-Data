import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    countryCDR: {
    width: "70%",
    margin: "auto",
  },
  chart:{
      marginBottom: "1rem",
    },
  '@media(max-width: 900px) and (min-width: 601px)':{
    countryCDR: {
      width: '90%',
    },
  },
  '@media(max-width: 600px)':{
    countryCDR: {
      width: '100%',
    },
  },
}));

export default useStyles;
