import { Carousel, Tabs } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { actFetchBooks } from "../../data/actions/book";
import Page from "../page";
import BookCard from "./BookCard";
import * as Action from "../../data/actions/action-type";

const { TabPane } = Tabs;
const Books = ({ data }) => {
  console.log(data);
  let bookCards=[];
  data&&data.map(item => {
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
    console.log("1")
    this.props.getBooks(null);
  }

  componentDidMount() {
    console.log("2");
    this.setState({ books: this.props.data.content });
  }

  

  render() {
    let { books } = this.state;

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
        <div className="flex md:flex-row flex-wrap"><Books data={books}/></div>
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
  getBooks: searchCriteria => dispatch(Action.getBooks())
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer);
