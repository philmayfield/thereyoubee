import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import Icon from "../common/Icon";

class ClickablePoint extends Component {
  constructor(props) {
    super(props);
    this.animationTime = 250; // css animation time in ms
    this.state = {
      show: props.show || false,
      transitionIn: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (this.state.show) {
      this.setState({ transitionIn: true });
    }
  }

  handleClick() {
    const { show, transitionIn } = this.state;
    if (show) {
      // currently visible, wait for transition out
      this.setState({ transitionIn: false });

      setTimeout(() => {
        this.setState({ show: !this.state.show });
      }, this.animationTime);
    } else {
      // currently hidden, show immediately
      this.setState({
        show: !show,
        transitionIn: !transitionIn
      });
    }
  }

  render() {
    const { show, transitionIn } = this.state;
    return (
      <div onClick={this.handleClick} className="map-point">
        <Icon
          name="place"
          classes={["map-point__icon", "place-icon"]}
          color={show ? "deep-orange" : ""}
        />
        <CSSTransition in={transitionIn} timeout={0} classNames="growFade">
          <span className={`map-point__text z-depth-1 ${show ? "" : "hide"}`}>
            {this.props.text}
          </span>
        </CSSTransition>
      </div>
    );
  }
}

ClickablePoint.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string
};

export default ClickablePoint;
