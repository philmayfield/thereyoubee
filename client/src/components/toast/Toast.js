import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { deleteToast } from "../../actions/toastActions";
import { notEmpty } from "../../common/empty";
import Icon from "../common/Icon";

class Toast extends Component {
  constructor(props) {
    super(props);
    this.animationTime = 250; // css animation time in ms
    this.hasUndo = notEmpty(props.toast.undoInaction);
    this.timeout = null;
    this.state = {
      show: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleUndoInaction = this.handleUndoInaction.bind(this);
  }

  componentDidMount() {
    const { toast } = this.props;

    this.setState({ show: true });

    // hide component with enough time to show animation
    if (!toast.showClose) {
      const time = toast.time || 3000;
      const timeout = time - this.animationTime; // css animation length

      this.timeout = setTimeout(() => {
        this.timeout = null;
        if (this.hasUndo) {
          this.handleUndoInaction();
        }
        this.handleDelete();
      }, timeout);
    }
  }

  componentWillUnmount() {
    this.timeout = null;
  }

  handleDelete() {
    const { id } = this.props.toast;

    this.setState({ show: false });

    setTimeout(() => {
      this.props.deleteToast(id);
    }, this.animationTime);
  }

  handleUndo() {
    // undo some action from the toast
    // immediately clear the timeout
    clearTimeout(this.timeout);
    this.timeout = null;

    // dispatch the action to undo whatever it was
    this.props.undoActionDispatch();

    // delete the toast
    this.handleDelete();
  }

  handleUndoInaction() {
    // if undo is not clicked dispatch some action
    this.props.undoInactionDispatch();
  }

  render() {
    const { toast } = this.props;
    const { iconColor = "white" } = toast;
    return (
      <CSSTransition in={this.state.show} timeout={0} classNames="growFade">
        <div className="toast with-height">
          {!!toast.icon && (
            <Icon name={toast.icon} classes={["left"]} color={iconColor} />
          )}
          {toast.value}
          {!!toast.showClose && (
            <button
              onClick={this.handleDelete}
              className="btn-flat toast-action"
            >
              Close
            </button>
          )}
          {!!this.hasUndo && (
            <button onClick={this.handleUndo} className="btn-flat toast-action">
              Undo
            </button>
          )}
        </div>
      </CSSTransition>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    deleteToast() {
      dispatch(deleteToast(props.toast.id));
    },
    undoActionDispatch() {
      const { undoObj, undoAction } = props.toast;
      dispatch(undoAction(undoObj));
    },
    undoInactionDispatch() {
      const { undoObj, undoInaction } = props.toast;
      dispatch(undoInaction(undoObj));
    }
  };
};

Toast.propTypes = {
  toast: PropTypes.object.isRequired,
  deleteToast: PropTypes.func.isRequired,
  undoActionDispatch: PropTypes.func,
  undoInactionDispatch: PropTypes.func
};

export default connect(
  null,
  mapDispatchToProps
)(Toast);
