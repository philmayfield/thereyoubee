import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indicator: {
        offsetLeft: 0,
        offsetWidth: 0
      },
      currentLoc: props.location.pathname.replace('/', '') || ''
    };

    this.setIndicator = this.setIndicator.bind(this);
  }

  componentDidMount() {
    this.setIndicator(this.state.currentLoc);
  }

  componentDidUpdate() {
    const { currentLoc } = this.state;
    const pathname = this.props.location.pathname.replace('/', '');

    if (currentLoc !== pathname) {
      this.setState({ currentLoc: pathname });
      this.setIndicator(pathname);
    }
  }

  setIndicator(location) {
    const node = document.getElementById(`bottom-nav-${location}`);
    let offsetLeft, offsetWidth;
    if (node) {
      offsetLeft = node.offsetLeft;
      offsetWidth = node.offsetWidth;
    } else {
      offsetLeft = '50%';
      offsetWidth = 0;
    }

    this.setState({ indicator: { offsetLeft, offsetWidth } });
  }

  render() {
    const { indicator } = this.state;

    return (
      <nav className="bottom-nav vw100 z-depth-3">
        <div className="bottom-nav__header justify-content-center align-items-end">
          <h6 className="bottom-nav__header-content m-0">
            <strong>App Navigation</strong>
          </h6>
        </div>
        <ul className="tabs mx-auto">
          <li className="tab">
            <NavLink
              id="bottom-nav-map"
              className="bottom-nav__link"
              activeClassName="active"
              to="/map"
            >
              Map View
            </NavLink>
          </li>
          <li className="tab">
            <NavLink
              id="bottom-nav-list"
              className="bottom-nav__link"
              activeClassName="active"
              to="/list"
            >
              List View
            </NavLink>
          </li>
          <li
            className="indicator"
            style={{ left: indicator.offsetLeft, width: indicator.offsetWidth }}
          />
        </ul>
      </nav>
    );
  }
}

BottomNav.propTypes = {
  location: PropTypes.object.isRequired
};

export default withRouter(BottomNav);
