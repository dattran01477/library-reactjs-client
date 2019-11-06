import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBookDetail } from "../../data/actions/book";
import store from './../../index'

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
    let x="books/"+id
    callApiAsPromise("GET", x, null, null)
      .then(res => {
        this.setState({ isLoading: false });
        console.log(res.data);
        store.dispatch(actFetchBookDetail(res.data));
        // this.props.fetchBookDetailTest(res.data);
        // this.props.fetchBooksCarouselToStore(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    console.log(typeof this.props.bookDetail);
    return (
      <div>
        aaaaaaaaaa
    </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("i am in");
  return {bookDetail:state.bookDetail};
}

const mapDispatchToProps = dispatch => ({
   fetchBookDetailTest: data => dispatch(actFetchBookDetail(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(BookDetail);
