import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

// routes / componenets
import Shell from "./common/Shell";
import MapView from "./map/MapView";
import ListView from "./list/ListView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <Link className="" to="/map">
              Map
            </Link>
            <Link className="" to="/list">
              List
            </Link>
          </nav>
          <h1>There You Bee</h1>
          <main className="container">
            <Route path="/map" component={Shell(MapView)} exact />
            <Route path="/list" component={Shell(ListView)} exact />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
