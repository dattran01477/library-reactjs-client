import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBooks } from "../../data/actions/book";
import { actFetchBooksCarousel } from "../../data/actions/book";
import BookCard from "./BookCard";

export class BookCardContainer extends Component {
  componentDidMount() {
    this.getBookByCriteria();
  }
  getBookByCriteria = () => {
    callApiAsPromise("GET", "books", null, null)
      .then(res => {
        this.props.fetchBooksToStore(res.data);
        this.props.fetchBooksCarouselToStore(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    let bookCards = [];
    this.props.bookResults &&
      this.props.bookResults.content.map(item => {
        bookCards.push(
          <BookCard
            key={item.id}
            name={item.name}
            img={item.smallImageLink}
            author={item.author || {}}
            rate={item.starTotal || {}}
            voters={item.voters || []}
            people={item.people || []}
          ></BookCard>
        );
      });
    return <Row className="justify-content-md-center">{bookCards}</Row>;
  }
}

const mapStateToProps = state => ({
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  fetchBooksToStore: data => dispatch(actFetchBooks(data)),
  fetchBooksCarouselToStore: data => dispatch(actFetchBooksCarousel(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCardContainer);
