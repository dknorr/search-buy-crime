import React, { Component } from "react";
import Search from "./Search.js";
import Stats from "./Stats.js";
import MapBoxComp from "./MapBoxComp.js";
import axios from "axios";
import "./App.css";
var parseString = require("xml2js").parseString;
class App extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.state = {
      numCrimes: 0,
      crimesQuery: [],
      zestimate: "",
      longitude: 0,
      latitude: 0,
      curAddy: "",
      curCityState: "",
      query: "",
      crimeType: []
    };
  }
  updateFields = (field, newValue) => {
    this.setState({
      // the bracket syntax says to take the field variable, look inside, and that
      // string will be the field we use
      [field]: newValue
    });
  };
  search = () => {
    let comp = this;
    const request =
      "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1gfa7vo06iz_9fxlx&address=" +
      this.state.curAddy.split(" ").join("+") +
      "&citystatezip=" +
      this.state.curCityState.split(", ").join("%2C+");
    //Zillow API Call
    axios
      .get(request)
      .then(response => {
        parseString(response.data, function(err, result) {
          //console.log(result.SearchResults.searchresults)
          let latitude =
            result["SearchResults:searchresults"].response["0"].results["0"]
              .result["0"].address["0"].latitude["0"];
          let longitude =
            result["SearchResults:searchresults"].response["0"].results["0"]
              .result["0"].address["0"].longitude["0"];
          let zestimate =
            result["SearchResults:searchresults"].response["0"].results["0"]
              .result["0"].zestimate["0"].amount["0"]._;
          comp.setState({
            latitude: String(latitude),
            longitude: String(longitude),
            zestimate: zestimate
          });
          const requestCrime =
            "http://opendata.mybluemix.net/crimes?lat=" +
            comp.state.latitude +
            "&lon=" +
            comp.state.longitude +
            "&radius=200";
          axios.get(requestCrime).then(request => {
            let filteredArray = request.data.features.filter(
              el =>
                el.properties.desc !== "SUICIDE" ||
                el.properties.desc !== "MEDICAL" ||
                el.properties.desc !== "MENTAL PATIENT"
            );
            let finalArray = filteredArray.filter(
              el => el.geometry.coordinates["0"] !== 0
            );
            let crimeTypes = finalArray.map(crime => {
              return crime.properties.offense_description;
            });
            let uniqueTypes = [...new Set(crimeTypes)];
            comp.setState({
              crimesQuery: finalArray,
              numCrimes: finalArray.length,
              crimeType: uniqueTypes
            });
            console.log(comp.state.crimeType);
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Search Buy Crime</h1>
          </header>
        </div>
        <div className="Components">
          <div className="Search">
            <Search updateParent={this.updateFields} search={this.search} />
          </div>
          <div className="Results">
            <div className="Map">
              <MapBoxComp
                centerLong={this.state.longitude}
                centerLat={this.state.latitude}
                value={this.state.zestimate}
                address={this.state.curAddy}
                crimeLocs={this.state.crimesQuery}
              />
            </div>
            <div className="Stats">
              <Stats
                address={this.state.curAddy}
                citystate={this.state.curCityState}
                estimate={this.state.zestimate}
                numCrimes={this.state.numCrimes}
                crimeTypes={this.state.crimeType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
