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
    let x="books/"+id;
    callApiAsPromise("GET", x, null, null)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.fetchBookDetailTest(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    let id = this.props.match.params.id
    return (
      <div>
        aaaaaaaaaa
    </div>
    );
  }
}

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
