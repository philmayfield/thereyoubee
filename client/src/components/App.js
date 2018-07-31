import React, { Component } from "react";
import LocationSearchInput from "./LocationSearchInput";
import AddCurrentPlace from "./AddCurrentPlace";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    console.log("constructicon");
  }

  render() {
    return (
      <div>
        <h1>App Component</h1>
        <LocationSearchInput />
        <AddCurrentPlace />
      </div>
    );
  }
}

export default App;
