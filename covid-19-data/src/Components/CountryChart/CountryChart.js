import CanvasJSReact from "./canvasjs.react";
import Loading from "../Loading";
import Typography from "@material-ui/core/Typography";
var React = require("react");
var Component = React.Component;
var CanvasJS = CanvasJSReact.CanvasJS;
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

class CountryChart extends Component {
  constructor(props) {
    super(props);
    this.state = null;
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    // console.log("invoked");

    let slug = this.props.props.location.pathname;
    slug = slug.slice(9, slug.length);
    let url = `https://api.covid19api.com/dayone/country/${slug}/status/confirmed`;
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
    if (this.state === null) {
      return <Loading />;
    } else if (this.state.dataWithoutProvinces.length <= 0) {
      return <Typography>This country doesn't have any cases yet</Typography>;
    } else {
      let dataPoints = null;
      dataPoints = constructDataPoints(this.state);

      const options = {
        animationEnabled: true,
        title: {
          text: `Cases in ${this.state.dataWithoutProvinces[0].Country}`,
        },
        axisX: {
          valueFormatString: "DD MMM",
        },
        axisY: {
          title: "Cases",
          prefix: "",
          includeZero: false,
        },
        data: [
          {
            yValueFormatString: "#,###",
            xValueFormatString: "",
            type: "spline",
            dataPoints: dataPoints,
          },
        ],
      };
      return (
        <div>
          <CanvasJSChart
            options={options}
            /* onRef={ref => this.chart = ref} */
          />
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
      );
    }
  }
}

export default CountryChart;
