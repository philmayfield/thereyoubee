import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { clearErrors } from "../../actions/appActions";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.inputChange = this.inputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password } = this.state;

    const myDude = {
      username,
      password
    };

    this.props.loginUser(myDude);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.handleAlreadyAuth();
  }

  componentDidUpdate() {
    this.handleAlreadyAuth();
  }

  handleAlreadyAuth() {
    if (this.props.auth.isAuth) {
      this.props.history.push("/map");
    }
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="login-view d-flex">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 mx-auto my-auto">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div className="card-content">
                <span className="card-title">Login</span>
                <Input
                  label="Username"
                  name="username"
                  required={true}
                  value={this.state.username}
                  error={errors.username}
                  onChange={this.inputChange}
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  required={true}
                  value={this.state.password}
                  error={errors.password}
                  onChange={this.inputChange}
                />
                <div className="d-flex justify-content-between">
                  <span>* Required</span>
                  <Button type="submit" icon="person">
                    Log in
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <p className="center-align">
            Don&rsquo;t have an account?{" "}
            <Link to="/register">Sign up now!</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(withRouter(Login));
