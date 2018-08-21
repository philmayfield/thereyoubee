import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  saveList,
  deleteList,
  setList,
  resetCurrentList,
  flagList
} from "../../actions/listActions";
import { getAllPlaces } from "../../actions/placeActions";
import { isEmpty } from "../../common/empty";
import Icon from "../common/Icon";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import ListItem from "./ListItem";

class AddEditLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listname: "",
      showModal: false,
      showAdd: false,
      hasChange: false
    };

    this.toggleShowModal = this.toggleShowModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.toggleAddForm = this.toggleAddForm.bind(this);
    this.handleSetList = this.handleSetList.bind(this);
    this.handleEditList = this.handleEditList.bind(this);
    this.handleDeleteList = this.handleDeleteList.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidUpdate(prevProps) {
    const pNum = this.props.lists.length;
    const ppNum = prevProps.lists.length;

    // added a new list, hide the form
    if (pNum && ppNum && pNum > ppNum) {
      this.toggleAddForm(false);
    }
  }

  toggleShowModal() {
    this.resetForm();
    this.setState({ showModal: !this.state.showModal });
  }

  handleCloseModal() {
    const { getAllPlaces, currentList = {} } = this.props;
    if (this.state.hasChange) {
      getAllPlaces(currentList._id);
    }
  }

  toggleAddForm(val) {
    this.resetForm();
    this.setState({
      showAdd: typeof val === "boolean" ? val : !this.state.showAdd
    });
  }

  handleSetList(list) {
    return e => {
      e.stopPropagation();
      this.setState({ hasChange: true });
      this.props.setList(list);
    };
  }

  handleEditList(list) {
    return e => {
      e.stopPropagation();
      this.toggleAddForm(true);
      this.setState({ listname: list.name });
    };
  }

  handleDeleteList(list) {
    const { currentList, resetCurrentList, flagList } = this.props;
    return e => {
      e.stopPropagation();
      flagList(list);
      this.setState({ hasChange: true });
      if (list._id === currentList._id) {
        resetCurrentList();
      }
    };
  }

  inputChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAddListSubmit(e) {
    e.preventDefault();
    this.props.saveList({ name: this.state.listname });
  }

  resetForm() {
    this.setState({ listname: "" });
  }

  render() {
    const { showModal, showAdd } = this.state;
    const { lists, resetCurrentList, currentList, errors } = this.props;
    const listOfLists = lists.map(list => (
      <ListItem
        key={list._id}
        allList={false}
        list={list}
        setList={this.handleSetList(list)}
        editList={this.handleEditList(list)}
        deleteList={this.handleDeleteList(list)}
        isCurrent={list._id === currentList._id}
      />
    ));
    // add an all lists option
    listOfLists.unshift(
      <ListItem
        key="all_lists"
        allList={true}
        list={{ name: "All Lists" }}
        setList={resetCurrentList}
        editList={null}
        isCurrent={isEmpty(currentList)}
      />
    );

    return (
      <Fragment>
        <button onClick={this.toggleShowModal} className="btn-empty btn-link">
          <Icon name="low_priority" classes={["mr-2"]} />
          Change List
        </button>
        {showModal ? (
          <Modal
            toggle={this.toggleShowModal}
            onClose={this.handleCloseModal}
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

            <div className="d-flex flex-wrap justify-content-between align-items-end">
              <h5>Select a specific list to use</h5>
              <Button
                clickOrTo={this.toggleAddForm}
                classes={["btn-flat"]}
                icon={showAdd ? "arrow_back" : "add_circle"}
              >
                {showAdd ? "Nevermind" : "Add a new list"}
              </Button>
            </div>
            {showAdd ? (
              <form onSubmit={this.handleAddListSubmit.bind(this)}>
                <Input
                  label="Your lists name"
                  name="listname"
                  required={true}
                  value={this.state.listname}
                  autoFocus={true}
                  error={errors.listname}
                  onChange={this.inputChange}
                />
                <div className="right-align">
                  <Button type="submit" icon="check">
                    Save List
                  </Button>
                </div>
              </form>
            ) : (
              <ul className="collection mb-0">{listOfLists}</ul>
            )}
          </Modal>
        ) : null}
      </Fragment>
    );
  }
}

AddEditLists.propTypes = {
  lists: PropTypes.array.isRequired,
  getAllPlaces: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  saveList: PropTypes.func.isRequired,
  setList: PropTypes.func.isRequired,
  resetCurrentList: PropTypes.func.isRequired,
  flagList: PropTypes.func.isRequired,
  currentList: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  currentList: state.currentList
});

export default connect(
  mapStateToProps,
  { saveList, deleteList, setList, resetCurrentList, flagList, getAllPlaces }
)(AddEditLists);
