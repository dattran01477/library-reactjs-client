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
      books: []
    };
  }

  componentWillMount() {
    // this.setState({ ...this.state, books: this.props.data });
  }

  componentDidMount() {
    this.props.getBooks(null);
  }

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
                  books.map(item => (
                    <BookItem
                      totalBorrowings={5}
                      totalBooks={item.amount_book}
                      title={item.name}
                      content={item.short_description}
                      thumnail={item.thumbnail}
                      item={item}
                      disableBorrowing={this.checkExistInCart(item, cartItem)}
                      onClickBorrowing={this.onClickBorrowing}
                    />
                  ))}
              </div>
              <Pagination
                className="float-right"
                defaultCurrent={6}
                total={1000}
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
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  getBooks: searchCriteria => dispatch(Action.getBooks()),
  addToCart: cart => dispatch(Action.addToCart(cart))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer);
