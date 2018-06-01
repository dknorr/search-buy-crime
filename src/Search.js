import React, { Component } from "react";
import "./App.css";
import "./App.js";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
//var parseString = require("xml2js").parseString;
export default class ContractForm extends Component {
  render() {
    const { addy, cityState, updateParent, search } = this.props;
    return (
      <div onSubmit={this.handleSubmit}>
        <h3> Property Search </h3>
        <TextField
          label="Street Address"
          onChange={e => updateParent("curAddy", e.target.value)}
          value={addy}
        />
        <div />
        <TextField
          label="City, State"
          onChange={e => updateParent("curCityState", e.target.value)}
          value={cityState}
        />
        <div /> <br />
        <Button onClick={search} variant="raised">
          {" "}
          Search{" "}
        </Button>
      </div>
    );
  }
}
