import React, { Component } from "react";
import { callApiAsPromise } from "../../api";
import { connect } from "react-redux";
import { actFetchBooks } from "../../data/actions/book";

class BookShelf extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    callApiAsPromise("GET", "categories", null, null)
      .then(res => this.props.fetchListBook(res.data.content))
      .catch(err => alert(err));
  }

  render() {
    //example code redux if you dont undersand, you can call me "DAT"
    return (
      <div>
        {this.props.bookResults &&
          this.props.bookResults.map(item => {
            return item.name;
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  fetchListBook: data => dispatch(actFetchBooks(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookShelf);
