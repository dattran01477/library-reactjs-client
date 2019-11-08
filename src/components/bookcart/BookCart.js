import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBooks } from "../../data/actions/book";
import { actFetchBooksCarousel } from "../../data/actions/book";
import { ClapSpinner } from "react-spinners-kit";
import {
  Link,
  useParams
} from "react-router-dom";
import { validate } from "@babel/types";
import { AddTempCart, GetTempCart, fetchBooksObjectCart, resetBooksObjectCart, DELTempCartItem } from "../../data/actions/cart";
export class BookCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookCartLocal: []
    };
  }

  componentWillMount() {
    let bookCart = this.props.bookCart;
    this.props.resetBooksObjectCart();
    bookCart.map(id => {
      this.getBookByCriteria(id);
    })
  }


  initBookCartObject(id) {
    this.props.resetBooksObjectCart();
    let temp = this.props.bookCart;
    temp.remove(id);
    console.log("Hello" + temp);
    temp.map(idBook => {
      this.getBookByCriteria(idBook);
    })
  }
  getBookByCriteria = (id) => {
    let x = "books/" + id;
    callApiAsPromise("GET", x, null, null)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.fetchBooksObjectCart(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };

  handleDelButton = (id, e) => {
    e.preventDefault();
    this.props.delBooksCartById(id);
    this.initBookCartObject(id);

  }
  handleSubmit = (user, bookId, editorId, e) => {
    bookId.map(id => {
      let body = {
        bookId: id,
        editorId: editorId,
        status: "waitting",
        userId: user
      }
      console.log(body);
      callApiAsPromise("POST", "borrowing-card/", null, JSON.stringify(body))
        .then(res => {
        })
        .catch(err => {
          alert(err);
        });
    })
  }
  render() {
    const { isLoading } = this.state;
    let bookCart = this.props.bookCartObject;
    let bookItems = [];
    bookCart.map(item => {
      if (item.hasOwnProperty('id'))
        bookItems.push(
          <tr className="row-table">
            <td>{item.name}</td>
            <td>{item.numberPages}</td>
            <td><Button onClick={(e) => this.handleDelButton(item.id, e)}>Xóa</Button></td>
          </tr>
        )
    })
    const divStyle = {
      height: 'auto',
    };
    console.log(bookItems)
    return (
      <div>
        <h1>Thông tin mượn sách</h1>
        <hr />

        <div className="jumbotron" style={divStyle}>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th> Tên sách</th>
                <th>Số trang</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {bookItems}
            </tbody>
          </table>
        </div>
        <Button onClick={(e) => { this.handleSubmit("Quan", this.props.bookCart, "Dat", e) }}>Xác nhận</Button>
      </div >
    );
  }
}

// const mapStateToProps = state => ({
//   bookResults: state.bookResults
// });
const mapStateToProps = (state, ownProps) => {
  return {
    bookCart: state.tempCart,
    bookCartObject: state.tempCartObject
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBooksObjectCart: (data) => {
      dispatch(fetchBooksObjectCart(data))
    },
    resetBooksObjectCart: () => {
      dispatch(resetBooksObjectCart())
    },
    delBooksCartById: (data) => {
      dispatch(DELTempCartItem(data))
    }
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(BookCart);
