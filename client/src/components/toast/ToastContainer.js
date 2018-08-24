import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Toast from "./Toast";

import { addToast } from "../../actions/toastActions";

class ToastContainer extends Component {
  render() {
    const toasts = this.props.toast.map(toast => (
      <Toast key={toast.id} toast={toast} show={true} />
    ));

    return !!toasts.length && <div id="toast-container">{toasts}</div>;
  }
}

ToastContainer.propTypes = {
  toast: PropTypes.array,
  addToast: PropTypes.func
};

const mapStateToProps = state => ({
  toast: state.toast
});

export default connect(
  mapStateToProps,
  { addToast }
)(ToastContainer);
