import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import PropTypes from "prop-types";
import thunk from "redux-thunk";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk, reduxPromise];

const Root = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return <Provider store={store}>{children}</Provider>;
};

Root.propTypes = {
  children: PropTypes.object,
  initialState: PropTypes.object
};

export default Root;
