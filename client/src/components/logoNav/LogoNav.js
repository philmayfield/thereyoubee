import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { logoutUser } from "../../actions/authActions";
import Button from "../common/Button";
import Icon from "../common/Icon";
// import getImg from "../../common/getImg";
// import ReactSVG from "react-svg";

class LogoNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ show: !this.state.show });
  }

  hideMenu() {
    this.setState({ show: false });
  }

  handleLogout() {
    this.hideMenu();
    this.props.logoutUser();
  }

  render() {
    const { isAuth, showTopNav } = this.props;
    const { show } = this.state;
    return (
      <div className={`${showTopNav ? "logo-nav" : "hide"}`}>
        <Button
          classes={["menu-btn", "btn-flat", "btn-empty"]}
          clickOrTo={this.toggleMenu}
        >
          <Icon
            name={show ? "close" : "menu"}
            classes={["turn", show ? "one-eighty" : "zero"]}
          />
        </Button>
        <CSSTransition in={show} timeout={0} classNames="growFade">
          <nav className="z-depth-3">
            <ul className="m-0">
              <li>
                {isAuth ? (
                  <Link onClick={this.handleLogout} to="/login">
                    <Icon name="account_circle" classes={["mr-2"]} />
                    Logout
                  </Link>
                ) : (
                  <Link onClick={this.hideMenu} to="/login">
                    <Icon name="account_circle" classes={["mr-2"]} />
                    Login
                  </Link>
                )}
              </li>
              <li>
                <Link onClick={this.hideMenu} to="/map">
                  <Icon name="place" classes={["mr-2"]} />
                  Map of Places
                </Link>
              </li>
              <li>
                <Link onClick={this.hideMenu} to="/list">
                  <Icon name="list" classes={["mr-2"]} />
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
  isAuth: PropTypes.bool.isRequired,
  showTopNav: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(LogoNav);
