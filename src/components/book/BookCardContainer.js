import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBooks, actFetchBooksCarousel } from "../../data/actions/book";
import Page from "../page";
import BookCard from "./BookCard";

export class BookCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  getBookByCriteria = () => {
    callApiAsPromise("GET", "books", null, null)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.fetchBooksToStore(res.data);
        this.props.fetchBooksCarouselToStore(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const { isLoading } = this.state;
    let bookCards = [];
    this.props.bookResults &&
      this.props.bookResults.content.map(item => {
        bookCards.push(
          <div className>
            <BookCard
              key={item.id}
              name={item.name}
              img={item.smallImageLink}
              author={item.author || {}}
              rate={item.starTotal || {}}
              voters={item.voters || []}
              people={item.people || []}
            ></BookCard>
          </div>
        );
      });
    return (
      <Page
        header={<div class="font-bold text-xl mb-2">Tủ sách của bạn</div>}
        content={
          <div className="flex md:flex-row flex-wrap">
            {bookCards}
          </div>
        }
      ></Page>
    );
  }
}

const mapStateToProps = state => ({
  ...state.books,
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  fetchBooksToStore: data => dispatch(actFetchBooks(data)),
  fetchBooksCarouselToStore: data => dispatch(actFetchBooksCarousel(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer);
