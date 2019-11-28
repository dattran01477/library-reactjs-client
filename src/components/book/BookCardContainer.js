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
    this.props.getBooks(null);
    // this.setState({ ...this.state, books: this.props.data });
    this.setState({ ...this.state, books: dataBook });
  }

  onClickBorrowing = item => {
    let cartItemCurrent = [...this.props.cartItem];
    cartItemCurrent.push(item);
    this.props.addToCart(cartItemCurrent);
    openMessage("Thêm vào giỏ mượn thành công!");
  };

  checkExistInCart(item, cartItem) {
    for (let i = 0; i < cartItem.length; i++) {
      if (item.id === cartItem[i].id) {
        return true;
      }
    }
    return false;
  }

  render() {
    let { books } = this.state;
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
          <Tabs>
            <TabPane tab="Sách Mới Nhất" key="1">
              <div className="flex md:flex-row flex-wrap p-2">
                {books &&
                  books.map(item => (
                    <BookItem
                      totalBorrowings={item.totalBorrowings}
                      totalBooks={item.totalBooks}
                      title={item.title}
                      content={item.content}
                      thumnail={item.thumnail}
                      item={item}
                      disableBorrowing={this.checkExistInCart(item, cartItem)}
                      onClickBorrowing={this.onClickBorrowing}
                    />
                  ))}
              </div>
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
