import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { deleteToast } from "../../actions/toastActions";

class Toast extends Component {
  constructor(props) {
    super(props);
    this.animationTime = 250; // css animation time in ms
    this.state = {
      show: false
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { toast } = this.props;

    this.setState({ show: true });

    // hide component with enough time to show animation
    if (!toast.showClose) {
      const time = toast.time || 3000;
      const timeout = time - this.animationTime; // css animation length

      setTimeout(() => {
        this.setState({ show: false });
      }, timeout);
    }
  }

  handleDelete() {
    const { id } = this.props.toast;

    this.setState({ show: false });

    setTimeout(() => {
      this.props.deleteToast(id);
    }, this.animationTime);
  }

  render() {
    const { toast } = this.props;
    return (
      <CSSTransition in={this.state.show} timeout={0} classNames="growFade">
        <div className="toast">
          {!!toast.icon && <i className="material-icons left">{toast.icon}</i>}
          {toast.value}
          {!!toast.showClose && (
            <button
              onClick={this.handleDelete}
              className="btn-flat toast-action"
            >
              Close
            </button>
          )}
        </div>
      </CSSTransition>
    );
  }
}

Toast.propTypes = {
  toast: PropTypes.object.isRequired,
  deleteToast: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteToast }
)(Toast);
