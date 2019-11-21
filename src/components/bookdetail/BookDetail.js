import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { callApiAsPromise } from "../../api";
import { actFetchBookDetail } from "../../data/actions/book";

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
    let id = this.props.match.params.id;
    let x = "books/" + id;
    callApiAsPromise("GET", x, null, null)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.fetchBookDetailTest(res.data);
        // this.props.fetchBooksCarouselToStore(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    let id = this.props.match.params.id;
    return (
     );
  }
}

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
      dispatch(actFetchBookDetail(ownProps.data));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
