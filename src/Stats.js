import React, { Component } from "react";
import "./App.css";
import "./App.js";

export default class Stats extends Component {
  render() {
    return (
      <div>
        <h2> Property Info </h2>
        <p>
          <b>Address:</b> {this.props.address} <br />
          <b>City, State:</b> {this.props.citystate} <br />
          <b>Zestimate ($):</b> {this.props.estimate}
        </p>
        <h2> Crime Statistics </h2>
        <p>
          <b>Number of Crimes in 200m Radius:</b> {this.props.numCrimes} <br />
          <b>Types of Crimes:</b> {this.props.crimeTypes}
        </p>
      </div>
    );
  }
}
