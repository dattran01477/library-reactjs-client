import { Carousel, Tabs } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";
import Page from "../page";
import BookCard from "./BookCard";
import BookItem from "./BookItem";
import { dataBook } from "./data";
import { openMessage } from "../message/Message";
import { Pagination } from "antd";
import { NUMBER_OBJECT_PAGE } from "../../share/constants";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

const { TabPane } = Tabs;
const Books = ({ data }) => {
  let bookCards = [];
  data &&
    data.map(item => {
      bookCards.push(
        <BookCard
          key={item.id}
          bookId={item.id}
          name={item.name}
          img={item.thumbnail}
          description={item.longDescription || "Không có mô tả"}
        ></BookCard>
      );
    });

  return bookCards;
};

export class BookCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      books: [],
      criteria: {
        limit: 5,
        skip: 0
      }
    };
  }

  componentWillMount() {
    // this.setState({ ...this.state, books: this.props.data });
  }

  isBorrowedBook = Bookid => {
    for (let i = 0; i < this.props.auth.borrowings.length; i++) {
      for (let j = 0; j < this.props.auth.borrowings[i].book_id.length; j++) {
        if (this.props.auth.borrowings[i].book_id[j] == Bookid) {
          return true;
        }
      }
    }
    return false;
  };

  componentDidMount() {
    this.getBook();
  }

  getBook = () => {
    this.props.getBooks(this.props.searchCriteria);
    this.setState({ ...this.state, criteria: this.props.searchCriteria });
  };

  onClickBorrowing = item => {
    let cartItemCurrent = [...this.props.cartItem];
    cartItemCurrent.push(item);
    this.props.addToCart(cartItemCurrent);
    openMessage("Thêm vào giỏ mượn thành công!");
  };

  checkExistInCart(item, cartItem) {
    for (let i = 0; i < cartItem.length; i++) {
      if (item._id === cartItem[i]._id) {
        return true;
      }
    }
    return false;
  }

  onChangePage = page => {
    this.props.setCriteria({
      limit: NUMBER_OBJECT_PAGE,
      skip: (page - 1) * NUMBER_OBJECT_PAGE
    });
  };

  componentDidUpdate() {
    if (
      this.props.searchCriteria.skip !== this.state.criteria.skip ||
      this.props.searchCriteria.limit !== this.state.criteria.limit
    ) {
      this.getBook();
    }
  }

  render() {
    let books = this.props.data.content;

    const { cartItem } = this.props;

    return (
      <Page
        header={
          <div class="mb-2 justify-center">
            <Carousel autoplay>
              <div className="w-full">
                <img
                  className="w-full h-full"
                  src="http://mikeloomis.co/wp-content/uploads/2015/06/Slider-1-BOOKS.jpg"
                  alt="anh1"
                />
              </div>
              <div className="w-full">
                <img
                  className="w-full"
                  src="http://mikeloomis.co/wp-content/uploads/2015/06/Slider-1-BOOKS.jpg"
                  alt="anh1"
                />
              </div>
              <div className="w-full">
                <img
                  className="w-full"
                  src="http://mikeloomis.co/wp-content/uploads/2015/06/Slider-1-BOOKS.jpg"
                  alt="anh1"
                />
              </div>
              <div className="w-full">
                <img
                  className="w-full"
                  src="http://mikeloomis.co/wp-content/uploads/2015/06/Slider-1-BOOKS.jpg"
                  alt="anh1"
                />
              </div>
            </Carousel>
          </div>
        }
        content={
          <Tabs className="p-2">
            <TabPane tab="Sách Mới Nhất" key="1">
              <div className="flex md:flex-row flex-wrap p-2">
                {books &&
                  books.map(
                    item =>
                      this.isBorrowedBook(item._id) === false && (
                        <BookItem
                          totalBorrowings={5}
                          totalBooks={item.amount_book}
                          title={item.name}
                          content={item.short_description}
                          thumnail={item.thumbnail}
                          item={item}
                          disableBorrowing={this.checkExistInCart(
                            item,
                            cartItem
                          )}
                          onClickBorrowing={this.onClickBorrowing}
                        />
                      )
                  )}
              </div>
              <Pagination
                className="float-right"
                defaultCurrent={1}
                total={100}
                onChange={page => this.onChangePage(page)}
              />
            </TabPane>
            <TabPane tab="Sách Hay Cho Bạn" key="2">
              Content of tab 2
            </TabPane>
            <TabPane tab="Sách Tình Yêu" key="3">
              Content of tab 3
            </TabPane>
          </Tabs>
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
  getBooks: searchCriteria => dispatch(Action.getBooks(searchCriteria)),
  addToCart: cart => dispatch(Action.addToCart(cart)),
  setCriteria: criteria => dispatch(Action.changeCriteria(criteria))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer);
