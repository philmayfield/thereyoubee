import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// routes / componenets
import MapView from "./map/MapView";
import ListView from "./list/ListView";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
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
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    timeout={500}
                    classNames="slide"
                  >
                    <Switch location={location}>
                      <Route path="/map" component={MapView} exact />
                      <Route path="/list" component={ListView} exact />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </main>
            </div>
          )}
        />
      </Router>
    );
  }
}

export default App;
