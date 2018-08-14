import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFab: false
    };
    this.renderFab = this.renderFab.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({ showFab: !this.state.showFab });
  }

  renderFab(className, icon) {
    const delayAmt = this.props.children.length;

    return (
      <div className={`fab`}>
        <button type="button" className={className} onClick={this.handleToggle}>
          {
            <i
              className={`material-icons turn ${
                this.state.showFab ? "one-eighty" : "zero"
              }`}
            >
              {this.state.showFab ? "close" : icon}
            </i>
          }
        </button>
        <ul>
          {React.Children.map(this.props.children, (child, i) => (
            <CSSTransition
              in={this.state.showFab}
              timeout={0}
              classNames="growFade"
            >
              <li style={{ transitionDelay: `${(delayAmt - i) * 50}ms` }}>
                {child}
              </li>
            </CSSTransition>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const {
      children,
      clickOrTo,
      icon,
      iconSide = "left",
      confirmItem = null,
      value = null,
      fab = false,
      pulse = false,
      type = "button",
      classes = []
    } = this.props;
    const className = `btn ${classes.join(" ")} ${pulse ? "pulse" : ""}`;

    if (fab) {
      // do something
      return this.renderFab(className, icon);
    } else {
      return type === "link" ? (
        <Link className={className} to={clickOrTo}>
          {icon ? <i className={`material-icons ${iconSide}`}>{icon}</i> : ""}
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={className}
          onClick={clickOrTo}
          value={value}
          data-confirm-item={confirmItem}
        >
          {icon ? <i className={`material-icons ${iconSide}`}>{icon}</i> : ""}
          {fab ? "" : children}
        </button>
      );
    }
  }
}

Button.propTypes = {
  value: PropTypes.any,
  classes: PropTypes.array,
  fab: PropTypes.bool,
  pulse: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.string,
  iconSide: PropTypes.string,
  confirmItem: PropTypes.string,
  clickOrTo: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])
};

export default Button;
