import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBooks, actFetchBooksCarousel } from "../../data/actions/book";
import Page from "../page";
import BookCard from "./BookCard";
import { Link, useParams } from "react-router-dom";
import { validate } from "@babel/types";
import { AddTempCart } from "../../data/actions/cart";
import { Carousel } from "antd";
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
    console.log("hello");
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
    console.log(this.props.bookResults);
    let json = this.props.bookResults;
    json.map(item => {
      if (item.hasOwnProperty("_id")) {
        let x = "/book/" + item._id;
        bookCards.push(
          <Link to={x} key={item._id}>
            <BookCard
              key={item._id}
              bookId={item._id}
              name={item.name}
              img={item.thumbnail}
              description={item.long_description || "Không có mô tả"}
            ></BookCard>
          </Link>
        );
      }
    });
    return (
      <>
        <Page
          content={
            <div>
              <Carousel autoplay>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel>
              <div className="flex md:flex-row flex-wrap">{bookCards}</div>
            </div>
          }
        ></Page>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { bookResults: state.books.bookResults };
};

const mapDispatchToProps = dispatch => ({
  fetchBooksToStore: data => dispatch(actFetchBooks(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer);
