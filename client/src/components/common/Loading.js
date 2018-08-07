import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appIn: false,
      appOut: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { loadingArr } = this.props.app;
    const ppLoadingArr = prevProps.app.loadingArr;

    if (ppLoadingArr.length && !loadingArr.length) {
      // going from loading to not loading
      this.setState({ appOut: true });
      setTimeout(() => {
        this.setState({
          isLoading: false,
          appIn: false,
          appOut: false
        });
      }, 500);
    } else if (loadingArr.length && !prevState.isLoading) {
      // going from not loading to loading
      this.setState({
        isLoading: true
      });
      setTimeout(() => this.setState({ appIn: true }), 0);
      // setTimeout(() => this.setState({ appIn: false }), 500);
    }
  }

  render() {
    const { isLoading, appIn, appOut } = this.state;
    const classes = `app-loading ${isLoading ? "d-flex" : "d-none"} ${
      appOut ? "app-loading-out" : ""
    } ${appIn ? "app-loading-in" : ""}`;
    return (
      <div className={classes}>
        <div className="progress">
          <div className="indeterminate" />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  app: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps)(Loading);
