import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.animationTime = 250;
    this.el = document.createElement("div");

    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    this.setState({ show: true });
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  handleRemove() {
    this.setState({ show: false });
    setTimeout(() => {
      this.props.toggle();
    }, this.animationTime);
  }

  render() {
    const { show } = this.state;

    return ReactDOM.createPortal(
      <Fragment>
        <CSSTransition in={show} timeout={0} classNames="growFade">
          <div className={`modal ${show ? "open" : ""}`}>
            <div className="modal-content">{this.props.children}</div>
            <div className="modal-footer">
              <Button clickOrTo={this.handleRemove}>Close</Button>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={show} timeout={0} classNames="fadeHalf">
          <div className="modal-overlay" />
        </CSSTransition>
      </Fragment>,
      this.el
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired
};

export default Modal;
