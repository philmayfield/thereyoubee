import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";

const modalRoot = document.getElementById("modal-root");

// Modal Props
// -----------------
// toggle: (bool) - show / hide the modal
// actions: (array) [ - array of actions that get turned into buttons in the footer of the modal
//   {
//     label: (string), - label for button
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
    this.animationTime = 250;
    this.el = document.createElement("div");

    this.handleRemove = this.handleRemove.bind(this);
    this.withRemove = this.withRemove.bind(this);
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    this.setState({ show: true });
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  handleRemove() {
    const { onClose } = this.props;
    this.setState({ show: false });
    if (typeof onClose === "function") onClose();
    setTimeout(() => {
      this.props.toggle();
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
    const actionButtons = actions.map(action => (
      <Button
        key={action.label}
        clickOrTo={
          action.toggle ? this.withRemove(action.action) : action.action
        }
        classes={[...action.btnClasses, "ml-2"]}
      >
        {action.label}
      </Button>
    ));

    return ReactDOM.createPortal(
      <Fragment>
        <CSSTransition in={show} timeout={0} classNames="growFade">
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