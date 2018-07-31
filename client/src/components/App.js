import React, { Component } from "react";
import LocationSearchInput from "./locationSearch/LocationSearchInput";
import AddCurrentPlace from "./currentPlace/AddCurrentPlace";
import Map from "./map/Map";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <h1>App Component</h1>
        <LocationSearchInput />
        <AddCurrentPlace />
        <Map />
      </div>
    );
  }
}

export default App;
