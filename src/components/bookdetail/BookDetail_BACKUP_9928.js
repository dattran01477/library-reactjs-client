import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
<<<<<<< HEAD
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import {  
  useParams
} from "react-router-dom";
import { callApiAsPromise } from "../../api";
import { actFetchBookDetail } from "../../data/actions/book";
=======
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBookDetail } from "../../data/actions/book";
import store from './../../index'
>>>>>>> origin/quan-borrow-book

export class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.getBookDetailByCriteria();
  }
  getBookDetailByCriteria = () => {
    let id = this.props.match.params.id
<<<<<<< HEAD
    let x="books/"+id
=======
    let x="books/"+id;
>>>>>>> origin/quan-borrow-book
    callApiAsPromise("GET", x, null, null)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.fetchBookDetailTest(res.data);
<<<<<<< HEAD
        // this.props.fetchBooksCarouselToStore(res.data);
=======
>>>>>>> origin/quan-borrow-book
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    let id = this.props.match.params.id
<<<<<<< HEAD
    console.log(id);
    return (
      <div>
      {this.props.bookDetail}
=======
    let book = this.props.bookDetail;
    
    return (
      <div>
        <img alt="anh sach" src ={book.thumbnail}/>
        <br/>
        {book.name}
        <br/>
        Số trang: {book.numberPages}
        <br/>
        Mô tả: {book.shortDescription}
        
>>>>>>> origin/quan-borrow-book
    </div>
    );
  }
}

<<<<<<< HEAD
// const mapStateToProps = (state, ownProps) => {
//   return {
//     bookDetail: state.bookDetail
//   }
// }

const mapStateToProps = state => ({
  ...state.books
});
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   fetchBookDetail: data => dispatch(actFetchBookDetail(data))
// });

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("chay dispatch");
  return {
    fetchBookDetailTest: () => {
      dispatch(actFetchBookDetail(ownProps.data))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
=======
const mapStateToProps = state => {
  return {bookDetail:state.bookDetail};
}

const mapDispatchToProps = dispatch => ({
   fetchBookDetailTest: data => dispatch(actFetchBookDetail(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(BookDetail);
>>>>>>> origin/quan-borrow-book
