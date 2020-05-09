import CanvasJSReact from "./canvasjs.react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import Loading from "../Loading";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
var React = require("react");
var Component = React.Component;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function constructDataPoints(state) {
  let dataPoints = [];
  for (let i = 0; i < state.dataWithoutProvinces.length; i++) {
    dataPoints[i] = {
      x: new Date(state.dataWithoutProvinces[i].Date),
      y: state.dataWithoutProvinces[i].Cases,
    };
  }
  return dataPoints;
}

class CountryDeaths extends Component {
  constructor(props) {
    super(props);
    this.state = null;
  }

  async componentDidMount() {
    let url = `https://api.covid19api.com/dayone/country/${this.props.slug}/status/deaths`;
    const response = await fetch(url);
    const data = await response.json();
    /*
    let data = [
      {
        Country: "Albania",
        CountryCode: "AL",
        Province: "",
        City: "",
        CityCode: "",
        Lat: "41.15",
        Lon: "20.17",
        Cases: 2,
        Status: "confirmed",
        Date: "2020-03-09T00:00:00Z",
      },
      {
        Country: "Albania",
        CountryCode: "AL",
        Province: "",
        City: "",
        CityCode: "",
        Lat: "41.15",
        Lon: "20.17",
        Cases: 10,
        Status: "confirmed",
        Date: "2020-03-10T00:00:00Z",
      },
      {
        Country: "Albania",
        CountryCode: "AL",
        Province: "",
        City: "",
        CityCode: "",
        Lat: "41.15",
        Lon: "20.17",
        Cases: 12,
        Status: "confirmed",
        Date: "2020-03-11T00:00:00Z",
      },
    ];*/
    let dataWithoutProvinces = [];
    let k = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].Province === "") {
        dataWithoutProvinces[k] = data[i];
        k++;
      }
    }
    for (let i = 0; i < dataWithoutProvinces.length; i++) {
      delete dataWithoutProvinces[i]["CountryCode"];
      delete dataWithoutProvinces[i]["City"];
      delete dataWithoutProvinces[i]["CityCode"];
      delete dataWithoutProvinces[i]["Lat"];
      delete dataWithoutProvinces[i]["Lon"];
      delete dataWithoutProvinces[i]["Province"];
    }
    this.setState({ dataWithoutProvinces });
  }

  render() {
    const { classes } = this.props;
    if (this.state === null) {
      return <Loading />;
    } else if (this.state.dataWithoutProvinces.length <= 0) {
      return (
        <Typography className={classes.noData}>
          This country doesn't have any deaths.
        </Typography>
      );
    } else {
      let dataPoints = null;
      dataPoints = constructDataPoints(this.state);

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
      return (
        <Paper elevation={3} className={classes.chart}>
          <Typography variant="h5" className={classes.title}>
            Deaths in {this.state.dataWithoutProvinces[0].Country}
          </Typography>
          <CanvasJSChart
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        </Paper>
      );
    }
  }
}

export default withStyles(styles)(CountryDeaths);
