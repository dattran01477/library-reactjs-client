import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBooks, actFetchBooksCarousel } from "../../data/actions/book";
import Page from "../page";
import BookCard from "./BookCard";
import {
  Link,
  useParams
} from "react-router-dom";
import { validate } from "@babel/types";
import { AddTempCart } from "../../data/actions/cart";
export class BookCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.getBookByCriteria();
  }
  
  getBookByCriteria = () => {
    console.log("hello")
    callApiAsPromise("GET", "books", null, null)
      .then(res => {
        console.log(res.data);
        this.setState({ isLoading: false });
        this.props.fetchBooksToStore(res.data.content);
        // this.props.fetchBooksCarouselToStore(res.data);
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
        let x = "/book/" + item._id;
        bookCards.push(
          
          <Link to={x} key={item._id}>
            <BookCard
              key={item._id}
              name={item.name}
              img={item.thumbnail}
              description={item.long_description || "Không có mô tả"}
            ></BookCard>
            </Link>
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
  fetchBooksToStore: data => dispatch(actFetchBooks(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer);
