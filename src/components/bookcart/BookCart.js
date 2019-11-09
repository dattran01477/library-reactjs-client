import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import {
  DELTempCartItem,
  fetchBooksObjectCart,
  resetBooksObjectCart,
  resetTempCartItem
} from "../../data/actions/cart";
import {
  Link,
  useParams
} from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let stompClient = null;

function onConnected() {
  // Subscribe to the Public Topic
  stompClient.subscribe("/topic/borrowing-list", onMessageReceived);
}

function onError(error) {
  console.log("loi roi " + error);
}

function onMessageReceived(data) {
  console.log(data);
}

export class BookCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bookCartLocal: [],
      stompClient: null
    };
  }

  onclickSendData = data => {
    this.state.stompClient.send(
      "/apps/borrowing.add",
      {},
      JSON.stringify(data)
    );
  };

  componentDidMount() {
    var socket = new SockJS("http://localhost:8080/app/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    this.setState({...this.state , stompClient:stompClient});
  }

  componentWillMount() {
    //get BookCartTemp
    let bookCart = this.props.bookCart;
    this.props.resetBooksObjectCart();
    bookCart.map(id => {
      this.getBookByCriteria(id);
    })
    //get BookCartSubmitted

  }

  getBookCartSubmited(userId) {
    // let x = "books/" + id;
    // callApiAsPromise("GET", x, null, null)
    //   .then(res => {
    //     this.setState({ isLoading: false });
    //     this.props.fetchBooksObjectCart(res.data);
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });
  }

  initBookCartObject(id) {
    this.props.resetBooksObjectCart();
    let temp = this.props.bookCart;
    temp.remove(id);
    console.log("Hello" + temp);
    temp.map(idBook => {
      this.getBookByCriteria(idBook);
    });
  }
  getBookByCriteria = id => {
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
  };
  handleSubmit = (user, bookId, editorId, e) => {
    //code use post api to send borrowingcard
    let dateString = new Date().toISOString().split("T")[0];
    console.log(dateString);
    bookId.map(id => {
      let body = {
        bookId: id,
        userId: user,
        type:"borrow",
        status: "waitting",
        borrowDate:new Date(),
        editorId: editorId
      }
      const headers = {
        'Content-Type': 'application/json'
      }
      this.onclickSendData(body);
      // callApiAsPromise("POST", "borrowing-card/", null, JSON.stringify(body))
      //   .then(res => {
      //   })
      //   .catch(err => {
      //     alert(err);
      //   });
    })
    alert("Successful !!!");
    // reset cart
    this.props.resetBookCart();
    this.props.resetBooksObjectCart();
  }
  render() {
    const { isLoading } = this.state;
    let bookCart = this.props.bookCartObject;
    let bookItems = [];
    bookCart.map(item => {
      if (item.hasOwnProperty("id"))
        bookItems.push(
          <tr className="row-table">
            <td>{item.name}</td>
            <td>{item.numberPages}</td>
            <td>
              <Button onClick={e => this.handleDelButton(item.id, e)}>
                Xóa
              </Button>
            </td>
          </tr>
        );
    });
    const divStyle = {
      height: "auto"
    };
    if (bookItems.length < 1) {
      return (
        <div className="jumbotron">
          <h2>Chưa thêm sách để mượn.</h2>
          <Link to="/books">Quay lại mục sách</Link>
        </div>
      )
    }
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
            <tbody>{bookItems}</tbody>
          </table>
          <div className="float-right">
            <Button onClick={(e) => { this.handleSubmit("Quan", this.props.bookCart, "Dat", e) }}>Xác nhận</Button>
          </div>
        </div>
        <Button
          onClick={e => {
            this.handleSubmit("Quan", this.props.bookCart, "Dat", e);
          }}
        >
          Xác nhận
        </Button>
      </div>
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
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBooksObjectCart: data => {
      dispatch(fetchBooksObjectCart(data));
    },
    resetBooksObjectCart: () => {
      dispatch(resetBooksObjectCart());
    },
    delBooksCartById: (data) => {
      dispatch(DELTempCartItem(data))
    },
    resetBookCart: () => {
      dispatch(resetTempCartItem())
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCart);
