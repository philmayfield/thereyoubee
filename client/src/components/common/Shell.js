import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

const Shell = Page => {
  const wrap = props => (
    <div className="page">
      <CSSTransitionGroup
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
        transitionAppearTimeout={300}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionName={"slide"}
      >
        <Page {...props} key={props.match.path} />
      </CSSTransitionGroup>
    </div>
  );
  wrap.propTypes = {
    match: PropTypes.object
  };
  return wrap;
};

export default Shell;
