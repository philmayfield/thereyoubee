import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Icon from "./Icon";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFab: false
    };
    this.renderFab = this.renderFab.bind(this);
    this.handleFabToggle = this.handleFabToggle.bind(this);
  }

  handleFabToggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showFab: !this.state.showFab });
  }

  renderFab(className, icon) {
    const delayAmt = this.props.children.length;
    const { showFab } = this.state;

    return (
      <div className={`fab`}>
        <button
          type="button"
          className={className}
          onClick={this.handleFabToggle}
        >
          {
            <Icon
              name={showFab ? "close" : icon}
              classes={["turn", showFab ? "one-eighty" : "zero"]}
            />
          }
        </button>
        <ul className={showFab ? "" : "no-click"}>
          {React.Children.map(
            this.props.children,
            (child, i) =>
              child && (
                <CSSTransition in={showFab} timeout={0} classNames="growFade">
                  <li style={{ transitionDelay: `${(delayAmt - i) * 50}ms` }}>
                    {child}
                  </li>
                </CSSTransition>
              )
          )}
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
      value = null,
      fab = false,
      pulse = false,
      type = "button",
      classes = []
    } = this.props;
    const className = `btn ${classes.join(" ")} ${pulse ? "pulse" : ""}`;

    if (fab) {
      return this.renderFab(className, icon);
    } else {
      return type === "link" ? (
        <Link className={className} to={clickOrTo}>
          {icon ? <Icon name={icon} classes={[iconSide]} /> : ""}
          {children}
        </Link>
      ) : (
        <button
          type={type}
          className={className}
          onClick={clickOrTo}
          value={value}
        >
          {icon ? <Icon name={icon} classes={[iconSide]} /> : ""}
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
  clickOrTo: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ])
};

export default Button;
