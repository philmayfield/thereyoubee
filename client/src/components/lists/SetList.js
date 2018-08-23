import React, { Component } from "react";
import { connect } from "react-redux";
import { filterPlaces, savePlace } from "../../actions/placeActions";
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import ListItem from "./ListItem";

class SetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingListId: props.startingList._id || null,
      selectedListId: props.startingList._id || null
    };

    this.handleSetList = this.handleSetList.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleSetList(list) {
    return () => {
      this.setState({ selectedListId: list._id });
    };
  }

  async handleCloseModal() {
    const { item, savePlace, filterPlaces, currentList } = this.props;
    const { startingListId, selectedListId } = this.state;

    // only save if starting and selected ids are out of sync, meaning a change has been made
    if (startingListId !== selectedListId) {
      // save new obj where only the list_id has been changed
      await savePlace({ ...item, list_id: selectedListId });
      if (currentList._id) filterPlaces(currentList._id);
    }
  }

  render() {
    const { toggle, showModal, item, lists } = this.props;
    const { selectedListId, startingListId } = this.state;
    const listOfLists =
      showModal &&
      lists.map(list => (
        <ListItem
          key={list._id}
          list={list}
          setList={this.handleSetList(list)}
          isCurrent={list._id === selectedListId}
        />
      ));

    return showModal ? (
      <Modal toggle={toggle} onClose={this.handleCloseModal}>
        <h1>Set list for {item.suggestion}</h1>
        <p>
          {startingListId
            ? "You can change the list associated with this place by clicking one below."
            : "This place does not have a list associated with it, choose one below."}
        </p>
        <ul className="collection mb-0">{listOfLists}</ul>
      </Modal>
    ) : null;
  }
}

SetList.propTypes = {
  lists: PropTypes.array.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  filterPlaces: PropTypes.func.isRequired,
  savePlace: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  startingList: PropTypes.object.isRequired,
  currentList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  lists: state.lists,
  currentList: state.currentList
});

export default connect(
  mapStateToProps,
  { filterPlaces, savePlace }
)(SetList);
