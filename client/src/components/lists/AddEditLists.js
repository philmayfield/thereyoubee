import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  saveList,
  deleteList,
  setList,
  resetCurrentList
} from "../../actions/listActions";
import { isEmpty } from "../../common/empty";
import Icon from "../common/Icon";
import Modal from "../common/Modal";
import Button from "../common/Button";
import ListItem from "./ListItem";

class AddEditLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };

    this.toggleShow = this.toggleShow.bind(this);
    this.handleSetList = this.handleSetList.bind(this);
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  handleSetList(list) {
    return () => this.props.setList(list);
  }

  render() {
    const { show } = this.state;
    const {
      deleteList,
      saveList,
      lists,
      resetCurrentList,
      currentList
    } = this.props;
    const listOfLists = lists.map(list => (
      <ListItem
        key={list._id}
        list={list}
        setList={this.handleSetList(list)}
        isCurrent={list._id === currentList._id}
      />
    ));
    // add an all lists option
    listOfLists.unshift(
      <ListItem
        key="all_lists"
        list={{ name: "All Lists" }}
        setList={resetCurrentList}
        isCurrent={isEmpty(currentList)}
      />
    );

    return (
      <Fragment>
        <button onClick={this.toggleShow} className="btn-empty btn-link">
          <Icon name="low_priority" classes={["mr-2"]} />
          Change List
        </button>
        {show ? (
          <Modal
            toggle={this.toggleShow}
            // actions={[
            //   {
            //     label: "whatevs",
            //     btnClasses: ["blue"],
            //     action: this.whatevs,
            //     toggle: true
            //   }
            // ]}
          >
            <h4>Your Place Lists</h4>

            <h5>Select a specific list to use</h5>
            <ul className="collection m-0">{listOfLists}</ul>
          </Modal>
        ) : null}
      </Fragment>
    );
  }
}

AddEditLists.propTypes = {
  lists: PropTypes.array.isRequired,
  deleteList: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired,
  resetCurrentList: PropTypes.func.isRequired,
  currentList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists,
  currentList: state.currentList
});

export default connect(
  mapStateToProps,
  { saveList, deleteList, setList, resetCurrentList }
)(AddEditLists);
