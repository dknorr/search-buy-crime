import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "./App.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGtub3JyMDEiLCJhIjoiY2podDZwdXpqMGFtMjNwcnY2cjl4Y3lwZyJ9.JRFAVX8yW5-lQ0fKlaYi5w"
});

class MapBoxComp extends React.Component {
  render() {
    const { centerLong, centerLat, value, address, crimeLocs } = this.props;

    let crimes = crimeLocs.map(crime => {
      return (
        <Marker coordinates={crime.geometry.coordinates}>
          <img
            src={
              "https://www.freeiconspng.com/uploads/robber-crime-thief-flat-icon-0.png"
            }
            width="18"
          />
        </Marker>
      );
    });

    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{ height: "50vh", width: "30vw" }}
        center={[centerLong, centerLat]}
        zoom={[16]}
      >
        <Marker coordinates={[centerLong, centerLat]}>
          <img src={"http://maps.google.com/mapfiles/ms/icons/red.png"} />
        </Marker>
        {crimes}
      </Map>
    );
  }
}

export default MapBoxComp;
