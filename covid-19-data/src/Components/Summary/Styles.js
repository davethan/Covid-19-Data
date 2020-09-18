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
  skeletonOfGeneral: {
    minWidth: "12rem",
    width: "90%",
    height: "1rem",
    margin: "0.7rem auto 0.3rem",
    maxWidth: 360,
  },
  skeletonOfGeneralBig: {
    minWidth: "10rem",
    width: "90%",
    height: "3.5rem",
    margin: "0rem auto 0.3rem",
    maxWidth: 360,
  },
  skeletonOfTable: {
    width: "100%",
    height: "3rem",
  }
});

export default styles;
