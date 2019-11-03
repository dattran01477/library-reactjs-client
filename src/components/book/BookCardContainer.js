import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { callApiAsPromise } from "../../api";
import { actFetchBooks, actFetchBookID } from "../../data/actions/book";
import { actFetchBooksCarousel } from "../../data/actions/book";
import { ClapSpinner } from "react-spinners-kit";
import BookCard from "./BookCard";
import {
  Link,
  useParams
} from "react-router-dom";
export class BookCardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.getBookByCriteria();
  }
  getBookByCriteria = () => {
    callApiAsPromise("GET", "books", null, null)
      .then(res => {
        this.setState({ isLoading: false });
        this.props.fetchBooksToStore(res.data);
        // this.props.fetchBooksCarouselToStore(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    const { isLoading } = this.state;
    let bookCards = [];
    this.props.bookResults &&
      this.props.bookResults.content.map(item => {
        let x = "/book/"+item.id;

        bookCards.push(
          <Link to={x} key={item.id}><BookCard
          key={item.id}
          name={item.name}
          thumbnail={item.thumbnail}
          active={item.active}
          onClick={() => {
            this.props.fetchBookID(item.id);
            
          }}
          // img={item.smallImageLink}
          // author={item.author || {}}
          // rate={item.starTotal || {}}
          // voters={item.voters || []}
          // people={item.people || []}
        ></BookCard></Link>
          
        );
      });
    return (
      <Row className="justify-content-md-center">
        <ClapSpinner size={30} color="#686769" loading={isLoading} />
        {bookCards}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  fetchBooksToStore: data => dispatch(actFetchBooks(data)),
  fetchBooksCarouselToStore: data => dispatch(actFetchBooksCarousel(data)),
  fetchBookID: idBook => dispatch(actFetchBookID(idBook))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCardContainer);
