import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { logoutUser } from '../../actions/authActions';
import Button from '../common/Button';
import Icon from '../common/Icon';
import AddEditLists from '../lists/AddEditLists';
import getImg from '../../common/getImg';
import ReactSVG from 'react-svg';

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
    const { auth, showTopNav, lists } = this.props;
    const { isAuth, user } = auth;
    const { show } = this.state;

    return (
      <header className={`${showTopNav ? 'logo-nav' : 'hide'}`}>
        <h1 className="sr-only">ThereYouBee</h1>
        <Button
          classes={['menu-btn', 'btn-flat', 'btn-empty']}
          clickOrTo={this.toggleMenu}
        >
          <Icon
            name={show ? 'close' : 'menu'}
            classes={['turn', show ? 'one-eighty' : 'zero']}
          />
        </Button>
        <CSSTransition in={show} timeout={0} classNames="growFade">
          <nav className="z-depth-3">
            <div className="logo">
              <ReactSVG
                src={getImg('logo')}
                className="mx-auto d-flex justify-content-center"
                svgClassName="logo-img"
              />
              <strong>ThereYouBee</strong>
            </div>
            <small className="d-block center-align">
              {user.username ? user.username : 'Nobody'} is logged in
            </small>
            <ul className="mb-0 mt-2">
              <li>
                {isAuth ? (
                  <Link onClick={this.handleLogout} to="/login">
                    <Icon name="account_circle" classes={['mr-2']} />
                    Logout
                  </Link>
                ) : (
                  <Link onClick={this.hideMenu} to="/login">
                    <Icon name="account_circle" classes={['mr-2']} />
                    Login
                  </Link>
                )}
              </li>
              <li>
                <Link to="/map">
                  <Icon name="map" classes={['mr-2']} />
                  Map View
                </Link>
              </li>
              <li>
                <Link to="/list">
                  <Icon name="list" classes={['mr-2']} />
                  List View
                </Link>
              </li>
              <li />
              {isAuth && (
                <li>
                  <AddEditLists
                    lists={lists}
                    showBtnIcon={true}
                    hideMenu={this.hideMenu}
                  />
                </li>
              )}
            </ul>
          </nav>
        </CSSTransition>
      </header>
    );
  }
}

LogoNav.propTypes = {
  lists: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  showTopNav: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(LogoNav);
