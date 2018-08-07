import React, { Component } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import PropTypes from "prop-types";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import setAuthToken from "../../common/setAuthToken";

class IsAuth extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // set auth token header
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwt_decode(token);

      // set current user and isAuth
      this.props.setCurrentUser(decoded);

      // check for expired token
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        // log out user
        this.props.logoutUser();
      }
    }
  }

  render() {
    return null;
  }
}

IsAuth.propTypes = {
  // history: PropTypes.object,
  setCurrentUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { setCurrentUser, logoutUser }
)(IsAuth);
