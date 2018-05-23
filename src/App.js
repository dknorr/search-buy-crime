import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

//Need to pass function through props to children so they can edit state
//Need to store latitude, longitude, and price, once address received from childen
//make API call to Zillow here to get that
//Then use that info and query crime API, store locations of crimes
//Pass the house location, price, and crime locations to map and statistics children. Plot on map.

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Search Buy Crime</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
