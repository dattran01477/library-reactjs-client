import { Button, Carousel, Input, Pagination, Select } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { TraceSpinner } from "react-spinners-kit";
import * as Action from "../../data/actions/action-type";
import * as Constant from "../../share/constants";
import { NUMBER_OBJECT_PAGE } from "../../share/constants";
import { openMessage } from "../message/Message";
import Page from "../page";
import BookItem from "./BookItem";

const { Option } = Select;
const { Search } = Input;

const criteriaDefault = {
  pageIndex: 0,
  pageSize: 25,
  query: "",
  isLoading: false,
  categoryId: null,
  authorId: null,
  languageId: null
};

export class BookCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      books: [],
      criteria: criteriaDefault,
      selectData: {
        categories: [],
        authors: [],
        languages: []
      }
    };
  }

  componentWillMount() {
    this.setState({ ...this.state, isLoading: true });
  }

  isBorrowingBook = Bookid => {
    console.log(Bookid);
    console.log(this.props.auth);
    for (let i = 0; i < this.props.auth.borrowings.length; i++) {
      if (
        this.props.auth.borrowings[i].status !== Constant.BORROW_STATUS.returned
      ) {
        for (let j = 0; j < this.props.auth.borrowings[i].bookIds.length; j++) {
          if (this.props.auth.borrowings[i].bookIds[j].id === Bookid) {
            return true;
          }
        }
      }
    }
    return false;
  };

  componentDidMount() {
    this.props.getBooks(this.state.criteria);
    Action.getCategories(this.successSelectData);
    Action.getAuthors(this.successSelectData);
    Action.getLanguage(this.successSelectData);
  }

  onSearch = () => {
    this.props.getBooks(this.state.criteria);
  };

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

  onChangePage = page => {
    this.props.setCriteria({
      limit: NUMBER_OBJECT_PAGE,
      skip: (page - 1) * NUMBER_OBJECT_PAGE
    });
  };

  successSelectData = (data, selectName) => {
    let selectData = { ...this.state.selectData };
    selectData[selectName] = data.content;
    this.setState({ ...this.state, selectData: selectData });
  };

  onChangeCriteria = (name, value) => {
    let criteria = this.state.criteria;
    criteria[name] = value;

    this.props.getBooks(criteria);
    this.setState({ ...this.state, criteria: criteria });
  };

  onChangeCriteriaFillter = (name, value) => {
    let criteria = this.state.criteria;
    criteria[name] = value;

    this.setState({ ...this.state, criteria: criteria });
  };

  componentDidUpdate() {
    if (this.isLoading && this.this.props.data.content) {
      this.setState({ ...this.state, isLoading: true });
    }
  }

  clearFilter = () => {
    this.props.getBooks(criteriaDefault);
    this.setState({ ...this.state, criteria: criteriaDefault });
  };

  render() {
    let books = this.props.data.content;
    let { categories, authors, languages } = this.state.selectData;

    const { cartItem } = this.props;

    return (
      <Page
        header={
          <div class="mb-2 justify-center">
            <Carousel autoplay>
              <div className="w-full">
                <img className="w-full" src="/books4.png" alt="anh1" />
              </div>
              <div className="w-full">
                <img className="w-full" src="/books.png" alt="anh1" />
              </div>
            </Carousel>
          </div>
        }
        content={
          <div className="pb-4">
            {/* panel filter */}
            <div className="flex flex-col border-b-2  border-black p-4">
              <div className="font-bold text-gray-700  border-gray-700  border-b-2  mb-4">
                Bộ Lọc Tìm Kiếm
              </div>
              <div className="flex flex-row content-center">
                <div className="mx-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Danh Mục
                    </label>
                    <Select
                      defaultValue={this.state.criteria.categoryId}
                      style={{ width: 120 }}
                      name="categoryId"
                      onChange={val =>
                        this.onChangeCriteriaFillter("categoryId", val)
                      }
                    >
                      {categories.map(item => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="mx-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Tác Giả
                    </label>
                    <Select
                      defaultValue={this.state.criteria.authorId}
                      style={{ width: 120 }}
                      name="authorId"
                      onChange={val =>
                        this.onChangeCriteriaFillter("authorId", val)
                      }
                    >
                      {authors.map(item => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="mx-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Ngôn Ngữ
                    </label>
                    <Select
                      defaultValue={this.state.criteria.languageId}
                      style={{ width: 120 }}
                      name="languageId"
                      onChange={val =>
                        this.onChangeCriteriaFillter("languageId", val)
                      }
                    >
                      {languages.map(item => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <Search
                  placeholder="Tên sách"
                  onChange={value =>
                    this.onChangeCriteriaFillter("query", value.target.value)
                  }
                  className="w-auto h-8 mt-4"
                  name="query"
                />

                <div className="mx-4">
                  <Button
                    className="mt-4"
                    type="primary"
                    icon="search"
                    onClick={this.onSearch}
                  >
                    Tìm Kiếm
                  </Button>
                </div>
                <div className="mx-4">
                  <Button
                    className="mt-4"
                    type="primary"
                    icon="delete"
                    onClick={this.clearFilter}
                  >
                    Xóa Fillter
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex md:flex-row flex-wrap p-2 h-full">
              {(books &&
                books.map(
                  item =>
                    this.isBorrowingBook(item.id) === false && (
                      <BookItem
                        totalBorrowings={item.amountBorrowing}
                        totalBooks={item.amountBook}
                        title={item.name}
                        content={item.shortDescription}
                        thumnail={item.thumbnail}
                        item={item}
                        disableBorrowing={this.checkExistInCart(item, cartItem)}
                        onClickBorrowing={this.onClickBorrowing}
                      />
                    )
                )) || (
                <div className="mx-auto justify-center">
                  <TraceSpinner loading={this.state.isLoading}>
                    Đang tải
                  </TraceSpinner>
                </div>
              )}
            </div>
            {this.props.data && (
              <Pagination
                className="float-right"
                defaultCurrent={1}
                total={this.props.data.totalPages * 10}
                onChange={page => this.onChangeCriteria("pageIndex", page - 1)}
              />
            )}
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
  getBooks: searchCriteria => dispatch(Action.getBooks(searchCriteria)),
  addToCart: cart => dispatch(Action.addToCart(cart)),
  setCriteria: criteria => dispatch(Action.changeCriteria(criteria))
});

export default connect(mapStateToProps, mapDispatchToProps)(BookCardContainer);
