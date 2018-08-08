import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    const time = this.props.toast.time || 3000;
    const timeout = time - 250; // css animation length

    this.setState({ show: true });

    // hide component with enough time to show animation
    setTimeout(() => {
      this.setState({ show: false });
    }, timeout);
  }

  render() {
    const { toast } = this.props;
    return (
      <CSSTransition in={this.state.show} timeout={0} classNames="growFade">
        <div className="toast">
          {!!toast.icon && <i className="material-icons left">{toast.icon}</i>}
          {toast.value}
        </div>
      </CSSTransition>
    );
  }
}

Toast.propTypes = {
  toast: PropTypes.object.isRequired
};

export default Toast;
