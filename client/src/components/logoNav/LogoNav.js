import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

class LogoNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ show: !this.state.show });
  }

  hideMenu() {
    this.setState({ show: false });
  }

  render() {
    const { isAuth } = this.props;
    return (
      <div className="logo-nav">
        {/* TODO: make this a button */}
        <div onClick={this.toggleMenu} className="logo">
          B
        </div>
        <CSSTransition in={this.state.show} timeout={0} classNames="growFade">
          <nav className="z-depth-3">
            <ul className="m-0">
              <li>
                {isAuth ? (
                  <Link onClick={this.hideMenu} to="/login">
                    Logout
                  </Link>
                ) : (
                  <Link onClick={this.hideMenu} to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li>
                <Link onClick={this.hideMenu} to="/map">
                  Map of Places
                </Link>
              </li>
              <li>
                <Link onClick={this.hideMenu} to="/list">
                  List of Places
                </Link>
              </li>
            </ul>
          </nav>
        </CSSTransition>
      </div>
    );
  }
}

LogoNav.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default LogoNav;
