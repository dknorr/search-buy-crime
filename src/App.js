import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//Need to pass function through props to children so they can edit state
//Need to store latitude, longitude, and price, once address received from childen
//make API call to Zillow here to get that
//Then use that info and query crime API, store locations of crimes
//Pass the house location, price, and crime locations to map and statistics children. Plot on map.

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      housePrice = 0,
      houseCoords =[],
      crimeCoords =[]
    };
  }
  updateHousePrice(price) {
    let housePrice = this.state.housePrice;
    housePrice += price;
    this.setState({
      housePrice: housePrice
    });
  }
  updateHouseCoords(latlong) {
    //assuming latlong is an array of coords, might have to change if they are
    //separate variables
    let houseCoords = this.state.houseCoords;
    houseCoords.push(latlong);
    this.setState({
      houseCoords: houseCoords
    });
  }
  updateCrimeCoords(latlong) {
    //also asssuming coords come in an array
    let crimeCoords = this.state.crimeCoords;
    crimeCoords.push(latlong);
    this.setState({
      crimeCoords: crimeCoords
    });
  }

  //would consider merging both searchbar components into one component
  //so don't need to pass functions through props twice
  render() {
    return (
      <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Search Buy Crime</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      <SearchBars
          updatePrice={price => this.updateHousePrice(price)}
      />
      </div>
    );
  }
}

export default App;
