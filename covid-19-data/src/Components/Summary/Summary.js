import React from "react";
import styles from "./Styles.js";
import { withStyles } from "@material-ui/styles";
import Loading from "../Loading";
import GeneralGlobally from "../GeneralGlobally";
import CountriesSummary from "../CountriesSummary/CountriesSummary";
import Typography from "@material-ui/core/Typography";
import { Route } from "react-router-dom";
import LoadEveryChart from "../LoadEveryChart/LoadEveryChart";
import Header from "../Header/Header";
import SortByContinents from "../SortByContinents/SortByContinents";

function timeSinceLastUpdate(dateFromState) {
  let date = dateFromState + "";
  date = new Date(date);
  date = date + "";
  let day = date.slice(0, 15);
  let heure = date.slice(16, date.length);

  let time = `on ${day} at ${heure}`;
  return time;
}

function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sortTable = this.sortTable.bind(this);
    this.showByContinents = this.showByContinents.bind(this);
  }

  async componentDidMount() {
    let url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();
    for (let i = 0; i < data.Countries.length; i++) {
      delete data.Countries[i]["CountryCode"];
      delete data.Countries[i]["Date"];
      delete data.Countries[i]["Premium"];
    }
    let asc = {
      NewConfirmed: true,
      TotalConfirmed: true,
      NewDeaths: true,
      TotalDeaths: true,
      NewRecovered: true,
      TotalRecovered: true,
      Country: true,
    };
    let dataToShow = data.Countries;
    this.setState({ data, asc, dataToShow });
  }

  sortTable(index) {
    let dataToShowToTable = this.state.dataToShow;
    // console.log(dataToShowToTable) //This is bizzare...
    let sortBy;
    switch (index) {
      case 2:
        sortBy = "NewConfirmed";
        break;
      case 3:
        sortBy = "TotalConfirmed";
        break;
      case 4:
        sortBy = "NewDeaths";
        break;
      case 5:
        sortBy = "TotalDeaths";
        break;
      case 6:
        sortBy = "NewRecovered";
        break;
      case 7:
        sortBy = "TotalRecovered";
        break;
      default:
        sortBy = "Country";
        break;
    }

    let ascOrDesc = !this.state.asc[sortBy];
    let howToSort = "asc";
    if (ascOrDesc === false) {
      howToSort = "desc";
    }

    dataToShowToTable.sort(compareValues(sortBy, howToSort));
    //!!!THIS DOES NOT WORK PROPERLY!!!
    this.setState((prevState) => ({
      asc: {
        ...prevState.asc,
        [sortBy]: ascOrDesc,
      },
      data: {
        ...prevState.data,
      },
      dataToShow: dataToShowToTable,
    }));
  }

  showByContinents(index) {
    let countriesToShow;
    switch (index) {
      case "Oceania":
        countriesToShow = [
          "australia",
          "new-zealand",
          "papua-new-guinea",
          "fiji",
        ];
        break;
      case "North America":
        countriesToShow = [
          "antigua-and-barbuda",
          "bahamas",
          "barbados",
          "belize",
          "canada",
          "costa-rica",
          "cuba",
          "dominica",
          "dominican-republic",
          "el-salvador",
          "grenada",
          "guatemala",
          "haiti",
          "honduras",
          "jamaica",
          "mexico",
          "nicaragua",
          "panama",
          "saint-kitts-and-nevis",
          "saint-lucia",
          "saint-vincent-and-the-grenadines",
          "trinidad-and-tobago",
          "united-states",
        ];
        break;
      case "Asia":
        countriesToShow = [
          "afghanistan",
          "armenia",
          "azerbaijan",
          "bahrain",
          "bangladesh",
          "bhutan",
          "brunei",
          "cambodia",
          "china",
          "georgia",
          "india",
          "indonesia",
          "iran",
          "iraq",
          "israel",
          "japan",
          "jordan",
          "kazakhstan",
          "kuwait",
          "kyrgyzstan",
          "lao-pdr",
          "lebanon",
          "macao-sar-china",
          "malaysia",
          "maldives",
          "mongolia",
          "myanmar",
          "nepal",
          "oman",
          "pakistan",
          "palestine",
          "philippines",
          "qatar",
          "korea-south",
          "saudi-arabia",
          "singapore",
          "sri-lanka",
          "syria",
          "taiwan",
          "tajikistan",
          "thailand",
          "timor-leste",
          "turkey",
          "united-arab-emirates",
          "uzbekistan",
          "vietnam",
          "yemen",
        ];
        break;
      case "Africa":
        countriesToShow = [
          "algeria",
          "angola",
          "benin",
          "botswana",
          "burkina-faso",
          "burundi",
          "cape-verde",
          "cameroon",
          "central-african-republic",
          "chad",
          "comoros",
          "congo-brazzaville",
          "congo-kinshasa",
          "djibouti",
          "egypt",
          "equatorial-guinea",
          "eritrea",
          "swaziland",
          "ethiopia",
          "gabon",
          "gambia",
          "ghana",
          "guinea",
          "guinea-bissau",
          "cote-divoire",
          "kenya",
          "lesotho",
          "liberia",
          "libya",
          "madagascar",
          "malawi",
          "mali",
          "mauritania",
          "mauritius",
          "morocco",
          "mozambique",
          "namibia",
          "niger",
          "nigeria",
          "rwanda",
          "réunion",
          "sao-tome-and-principe",
          "senegal",
          "seychelles",
          "sierra-leone",
          "somalia",
          "south-africa",
          "south-sudan",
          "sudan",
          "tanzania",
          "togo",
          "tunisia",
          "uganda",
          "western-sahara",
          "zambia",
          "zimbabwe",
        ];
        break;
      case "Europe":
        countriesToShow = [
          "albania",
          "andorra",
          "austria",
          "belarus",
          "belgium",
          "bosnia-and-herzegovina",
          "bulgaria",
          "croatia",
          "cyprus",
          "czech-republic",
          "denmark",
          "estonia",
          "finland",
          "france",
          "germany",
          "greece",
          "hungary",
          "iceland",
          "ireland",
          "italy",
          "latvia",
          "liechtenstein",
          "lithuania",
          "luxembourg",
          "malta",
          "moldova",
          "monaco",
          "montenegro",
          "netherlands",
          "macedonia",
          "norway",
          "poland",
          "portugal",
          "romania",
          "russia",
          "san-marino",
          "serbia",
          "slovakia",
          "slovenia",
          "spain",
          "sweden",
          "switzerland",
          "united-kingdom",
          "ukraine",
          "holy-see-vatican-city-state",
          "kosovo",
        ];
        break;
      case "South America":
        countriesToShow = [
          "argentina",
          "bolivia",
          "brazil",
          "chile",
          "colombia",
          "ecuador",
          "guyana",
          "paraguay",
          "peru",
          "uruguay",
          "suriname",
          "venezuela",
        ];
        break;
      default:
        countriesToShow = this.state.data.Countries;
        break;
    }

    let dataOfCountriesToShow = [];
    if (index !== "All") {
      let j, i;
      let k = 0;
      for (i = 0; i < this.state.data.Countries.length; i++) {
        for (j = 0; j < countriesToShow.length; j++) {
          if (this.state.data.Countries[i].Slug === countriesToShow[j]) {
            dataOfCountriesToShow[k] = this.state.data.Countries[i];
            k++;
            break;
          }
        }
      }
    } else {
      dataOfCountriesToShow = countriesToShow;
    }

    this.setState((prevState) => ({
      asc: {
        ...prevState.asc,
      },
      data: {
        ...prevState.data,
      },
      dataToShow: dataOfCountriesToShow,
    }));
  }

  render() {
    const state = this.state;
    const { classes } = this.props;
    let time;
    if (state) {
      time = timeSinceLastUpdate(state.data.Date);
    }
    return state === null ? (
      <div>
        <Header />
        <div className={classes.summaryBody}>
          <Loading />
        </div>
      </div>
    ) : (
      <div>
        <Header />
        <div className={classes.summaryBody}>
          <Route
            exact
            path="/Covid-19-Data"
            render={() => (
              <div>
                <GeneralGlobally Globals={state.data.Global} />
                <SortByContinents showByContinents={this.showByContinents} />
                <CountriesSummary
                  sortTable={this.sortTable}
                  CountriesSummary={state.dataToShow}
                />
              </div>
            )}
          />

          <Route
            exact
            path="/Covid-19-Data/country:countryName"
            render={(params) => <LoadEveryChart props={params} />}
          />

          <div className={classes.lastUpdate}>
            <Typography>Last update {time} </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Summary);
