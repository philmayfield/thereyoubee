import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";
import { clearErrors } from "../../actions/appActions";
import { loginUser, registerUser } from "../../actions/authActions";

class RegLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      password2: ""
    };

    this.inputChange = this.inputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
    this.handleAlreadyAuth();
  }

  componentDidUpdate() {
    this.handleAlreadyAuth();
  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAlreadyAuth() {
    const { auth, history } = this.props;
    if (auth.isAuth) {
      history.push("/map");
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { isRegister, loginUser, registerUser } = this.props;
    const { username, password, password2 } = this.state;

    const myDude = {
      username,
      password,
      password2
    };

    isRegister ? registerUser(myDude) : loginUser(myDude);
  }

  render() {
    const { isRegister, errors } = this.props;
    const title = isRegister ? "Register" : "Login";

    return (
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 mx-auto my-auto">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div className="card-content">
                <span className="card-title">{title}</span>
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
                {isRegister ? (
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="password2"
                    required={true}
                    value={this.state.password2}
                    error={errors.password2}
                    onChange={this.inputChange}
                  />
                ) : null}
                <div className="d-flex justify-content-between">
                  <span>* Required</span>
                  <Button type="submit" icon="person">
                    {title}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <p className="center-align">
            {isRegister ? (
              <Fragment>
                Already have an account? <Link to="/login">Log in now!</Link>
              </Fragment>
            ) : (
              <Fragment>
                Don&rsquo;t have an account?{" "}
                <Link to="/register">Sign up now!</Link>
              </Fragment>
            )}
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

RegLogin.propTypes = {
  isRegister: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default connect(
  mapStateToProps,
  { registerUser, loginUser, clearErrors }
)(withRouter(RegLogin));
