import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

// routes / componenets
import IsAuth from "../components/common/IsAuth";
import ToastContainer from "./toast/ToastContainer";
import LogoNav from "../components/logoNav/LogoNav";
import Loading from "./common/Loading";
import MapView from "./map/MapView";
import ListView from "./list/ListView";
import Login from "./login/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isAuth } = this.props.auth;
    const RedirectWrap = ({ action, children }) =>
      action === "REPLACE" ? null : children;

    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <div className={`App ${location.pathname.replace("/", "")}`}>
              <IsAuth />
              <Loading />
              <ToastContainer test={false} />
              <LogoNav isAuth={isAuth} />
              <main>
                <TransitionGroup component={null}>
                  <CSSTransition
                    key={location.key}
                    timeout={500}
                    classNames="slide"
                  >
                    <Switch location={location}>
                      <Route
                        exact
                        path="/"
                        render={() =>
                          isAuth ? (
                            <RedirectWrap action={history.action}>
                              <Redirect to="/map" />
                            </RedirectWrap>
                          ) : (
                            <RedirectWrap action={history.action}>
                              <Redirect to="/login" />
                            </RedirectWrap>
                          )
                        }
                      />
                      <Route
                        exact
                        path="/login"
                        render={() =>
                          isAuth ? (
                            <RedirectWrap action={history.action}>
                              <Redirect to="/map" />
                            </RedirectWrap>
                          ) : (
                            <Login />
                          )
                        }
                      />
                      <Route exact path="/map" component={MapView} />
                      <Route exact path="/list" component={ListView} />
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

App.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(App);
