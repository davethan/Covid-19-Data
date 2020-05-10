import CanvasJSReact from "./canvasjs.react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
var React = require("react");
var Component = React.Component;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function constructDataPoints(state) {
  let dataPoints = [];
  for (let i = 0; i < state.dataWithoutDetails.length; i++) {
    dataPoints[i] = {
      x: new Date(state.dataWithoutDetails[i].Date),
      y: state.dataWithoutDetails[i].Cases,
    };
  }
  return dataPoints;
}

class CountryChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    let dataPoints = null;
    dataPoints = constructDataPoints(this.props);

    const options = {
      animationEnabled: true,
      title: {
        text: ``,
      },
      axisX: {
        valueFormatString: "DD MMM",
      },
      axisY: {
        title: "",
        prefix: "",
        includeZero: false,
      },
      data: [
        {
          yValueFormatString: "#,###",
          xValueFormatString: "",
          type: "line",
          dataPoints: dataPoints,
        },
      ],
    };

    let status;
    switch (this.props.dataWithoutDetails[0].Status) {
      case "confirmed":
        status = "cases";
        break;
      case "deaths":
        status = "deaths";
        break;
      case "recovered":
        status = "recovered";
        break;
      default:
        status = this.props.dataWithoutDetails[0].Status;
        break;
    }

    return (
      <Paper elevation={3} className={classes.chart}>
        <Typography variant="h5" className={classes.title}>
          Total {status} in {this.props.dataWithoutDetails[0].Country}
        </Typography>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </Paper>
    );
  }
}

export default withStyles(styles)(CountryChart);
