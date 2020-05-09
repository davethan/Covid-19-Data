const styles = () => ({
  summaryBody: {
    maxWidth: "94%",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  lastUpdate: {
    textAlign: "center",
    marginTop: "1rem",
  },
  "@media(max-width: 600px)": {
    summaryBody: {
      maxWidth: "100%",
    },
  },
});

export default styles;
