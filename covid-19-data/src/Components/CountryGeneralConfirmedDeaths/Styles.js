const styles = () => ({
  noData: {
    marginTop: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  skeletonOfGeneral: {
    minWidth: "12rem",
    width: "90%",
    height: "1rem",
    margin: "0.7rem auto 0.3rem",
    maxWidth: 360,
  },
  skeletonOfGeneralBig: {
    minWidth: "12rem",
    width: "90%",
    height: "3.5rem",
    margin: "0rem auto 0.3rem",
    maxWidth: 360,
  },
  flexOfSkeleton: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  "@media(max-width: 600px)": {
    flexOfSkeleton: {
      flexDirection: "column",
    },
  },
});

export default styles;
