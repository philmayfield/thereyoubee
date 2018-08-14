import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Toast from "./Toast";

import { addToast } from "../../actions/toastActions";

class ToastContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: props.test || false
    };
    this.toasty = this.toasty.bind(this);
  }

  toasty() {
    this.props.addToast({
      value: `Test Toast!`,
      icon: "thumb_up",
      // showClose: true,
      // time: 5 * 60000
      time: 3000
    });
  }

  render() {
    const { test } = this.state;
    const toasts = this.props.toast.map(toast => (
      <Toast key={toast.id} toast={toast} show={true} />
    ));

    // TODO: refactor out test stuff
    if (test) {
      return (
        <div id="toast-container">
          <button onClick={this.toasty}>Addem</button>
          {toasts}
        </div>
      );
    } else {
      return !!toasts.length && <div id="toast-container">{toasts}</div>;
    }
  }
}

ToastContainer.propTypes = {
  toast: PropTypes.array,
  test: PropTypes.bool,
  addToast: PropTypes.func
};

const mapStateToProps = state => ({
  toast: state.toast
});

export default connect(
  mapStateToProps,
  { addToast }
)(ToastContainer);
