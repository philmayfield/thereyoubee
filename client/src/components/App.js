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

// actions
import { getAllPlaces } from "../actions/placeActions";

// routes / componenets
import IsAuth from "../components/common/IsAuth";
import ToastContainer from "./toast/ToastContainer";
import LogoNav from "../components/logoNav/LogoNav";
import Loading from "./common/Loading";
import MapView from "./map/MapView";
import ListView from "./list/ListView";
import Login from "./login/Login";
import Register from "./register/Register";

// helpers
import { notEmpty } from "../common/empty";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTopNav: true
    };

    this.setShowTopNav = this.setShowTopNav.bind(this);
  }

  componentDidMount() {
    // this.props.getAllPlaces();
  }

  setShowTopNav(val = true) {
    this.setState({ showTopNav: val });
  }

  render() {
    const { app, auth, places, currentPlace, currentList } = this.props;
    const { showTopNav } = this.state;
    const { isAuth } = auth;
    const placesToRender = places.filter(place => !place.deleteFlag);
    const isLoading = notEmpty(app.loadingArr);
    const hasCurrentList = notEmpty(currentList);
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
              <LogoNav
                isAuth={isAuth}
                showTopNav={showTopNav}
                currentList={currentList}
                hasCurrentList={hasCurrentList}
              />
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
                      <Route
                        exact
                        path="/register"
                        render={() =>
                          isAuth ? (
                            <RedirectWrap action={history.action}>
                              <Redirect to="/map" />
                            </RedirectWrap>
                          ) : (
                            <Register />
                          )
                        }
                      />
                      <Route
                        exact
                        path="/map"
                        render={() => (
                          <MapView
                            isAuth={isAuth}
                            isLoading={isLoading}
                            places={placesToRender}
                            currentPlace={currentPlace}
                            showTopNav={showTopNav}
                            setShowTopNav={this.setShowTopNav}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/list"
                        render={() => (
                          <ListView
                            isAuth={isAuth}
                            isLoading={isLoading}
                            places={placesToRender}
                          />
                        )}
                      />
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
  places: PropTypes.array.isRequired,
  app: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  currentPlace: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired,
  getAllPlaces: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  app: state.app,
  auth: state.auth,
  places: state.places,
  currentPlace: state.currentPlace,
  currentList: state.currentList
});

export default connect(
  mapStateToProps,
  { getAllPlaces }
)(App);
