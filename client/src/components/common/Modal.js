import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";

const modalRoot = document.getElementById("modal-root");

// Modal Props
// -----------------
// toggle: (function) - show / hide the modal
// onClose: (function) - callback when the modal is closed
// actions: (array) [ - array of actions that get turned into buttons in the footer of the modal
//   {
//     label: (string), - label for button
//     show: (bool), - whether or not to show the button
//     btnClasses: (array), - classes for the button
//     action: (function), - action for the button
//     toggle: (bool) - optionally close the array with the action
//   }
// ]

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.animationTime = 333;
    this.el = document.createElement("div");

    this.handleRemove = this.handleRemove.bind(this);
    this.withRemove = this.withRemove.bind(this);
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    modalRoot.classList.add("open");
    this.setState({ show: true });
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    modalRoot.classList.remove("open");
  }

  handleRemove() {
    const { onClose } = this.props;
    this.setState({ show: false });
    setTimeout(() => {
      this.props.toggle();
      if (typeof onClose === "function") onClose();
    }, this.animationTime);
  }

  withRemove(fn) {
    return () => {
      fn();
      this.handleRemove();
    };
  }

  render() {
    const { show } = this.state;
    const { actions = [] } = this.props;
    const actionButtons = actions.map(
      ({ show = true, label, toggle = false, action, btnClasses = [] }) => (
        <Button
          key={label}
          clickOrTo={toggle ? this.withRemove(action) : action}
          classes={[show ? "" : "d-none", ...btnClasses, "ml-2"]}
        >
          {label}
        </Button>
      )
    );

    return ReactDOM.createPortal(
      <Fragment>
        <CSSTransition in={show} timeout={0} classNames="growFadeModal">
          <div className={`modal ${show ? "open" : ""}`}>
            <div className="modal-content">{this.props.children}</div>
            <div className="modal-footer">
              <Button
                clickOrTo={this.handleRemove}
                classes={["btn-flat", "red-text", "ml-2"]}
              >
                Close
              </Button>
              {actionButtons}
            </div>
          </div>
        </CSSTransition>
        <CSSTransition in={show} timeout={0} classNames="fadeHalf">
          <div onClick={this.handleRemove} className="modal-overlay" />
        </CSSTransition>
      </Fragment>,
      this.el
    );
  }
}

Modal.propTypes = {
  actions: PropTypes.array,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired
};

export default Modal;
