import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveList, deleteList, setList } from "../../actions/listActions";
import Icon from "../common/Icon";

class AddEditLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow(e) {
    e.preventDefault();
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    const { deleteList, saveList, setList } = this.props;

    return (
      <Fragment>
        <a href="#" onClick={this.toggleShow}>
          <Icon name="low_priority" classes={["mr-2"]} />
          Change List
        </a>
        {show ? (
          <section className="changer">
            <div>Im the changer!</div>
          </section>
        ) : null}
      </Fragment>
    );
  }
}

AddEditLists.propTypes = {
  deleteList: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired
};

export default connect(
  null,
  { saveList, deleteList, setList }
)(AddEditLists);
