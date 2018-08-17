import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Input from "../common/Input";
import Button from "../common/Button";
import { clearErrors } from "../../actions/appActions";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.inputChange = this.inputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  inputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, password, password2 } = this.state;

    const myNewDude = {
      username,
      password,
      password2
    };

    this.props.registerUser(myNewDude);
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="register-view d-flex">
        <div className="col-11 col-sm-8 col-md-6 col-lg-5 mx-auto my-auto">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div className="card-content">
                <span className="card-title">Register</span>
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
                <Input
                  label="Confirm Password"
                  type="password"
                  name="password2"
                  required={true}
                  value={this.state.password2}
                  error={errors.password2}
                  onChange={this.inputChange}
                />
                <div className="d-flex justify-content-between">
                  <span>* Required</span>
                  <Button type="submit" icon="person">
                    Register
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <p className="center-align">
            Already have an account? <Link to="/login">Log in now!</Link>
          </p>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(Register);
