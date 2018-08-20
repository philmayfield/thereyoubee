import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveList, deleteList, setList } from "../../actions/listActions";
import Icon from "../common/Icon";
import ListItem from "./ListItem";

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
    const { deleteList, saveList, setList, lists } = this.props;
    const listOfLists = lists.map(list => (
      <ListItem key={list._id} list={list} />
    ));

    return (
      <Fragment>
        <button onClick={this.toggleShow} className="btn-empty btn-link">
          <Icon name="low_priority" classes={["mr-2"]} />
          Change List
        </button>
        {show ? <section className="changer">{listOfLists}</section> : null}
      </Fragment>
    );
  }
}

AddEditLists.propTypes = {
  lists: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(
  mapStateToProps,
  { saveList, deleteList, setList }
)(AddEditLists);
