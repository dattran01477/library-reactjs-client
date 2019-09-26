import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { callApiAsPromise } from "../../api";
import { actFetchBooksCarousel } from "../../data/actions/book";
import BookCardCarousel from "./BookCardCarousel";
import "./carouselStyle.css";

const backgroundColors = [
  { backgroundColor: "#EC407A" },
  { backgroundColor: "#039BE5" },
  { backgroundColor: "#AB47BC" },
  { backgroundColor: "#FF5252" },
  { backgroundColor: "#00E676" },
  { backgroundColor: "#EC407A" },
  { backgroundColor: "#039BE5" },
  { backgroundColor: "#AB47BC" },
  { backgroundColor: "#FF5252" },
  { backgroundColor: "#00E676" },
  { backgroundColor: "#EC407A" },
  { backgroundColor: "#039BE5" },
  { backgroundColor: "#AB47BC" },
  { backgroundColor: "#FF5252" },
  { backgroundColor: "#00E676" },
  { backgroundColor: "#EC407A" },
  { backgroundColor: "#039BE5" },
  { backgroundColor: "#AB47BC" },
  { backgroundColor: "#FF5252" },
  { backgroundColor: "#00E676" },
  { backgroundColor: "#EC407A" },
  { backgroundColor: "#039BE5" },
  { backgroundColor: "#AB47BC" },
  { backgroundColor: "#FF5252" },
  { backgroundColor: "#00E676" }
];
const darkColors = [
  { color: "#AD1457" },
  { color: "#01579B" },
  { color: "#6A1B9A" },
  { color: "#D50000" },
  { color: "#00C853" },
  { color: "#AD1457" },
  { color: "#01579B" },
  { color: "#6A1B9A" },
  { color: "#D50000" },
  { color: "#00C853" },
  { color: "#AD1457" },
  { color: "#01579B" },
  { color: "#6A1B9A" },
  { color: "#D50000" },
  { color: "#00C853" },
  { color: "#AD1457" },
  { color: "#01579B" },
  { color: "#6A1B9A" },
  { color: "#D50000" },
  { color: "#00C853" },
  { color: "#AD1457" },
  { color: "#01579B" },
  { color: "#6A1B9A" },
  { color: "#D50000" },
  { color: "#00C853" }
];
class BookCardCarouselContainer extends Component {
  getCategoryBook = lsBook => {
    let carouselBooks = [];
    for (let i = 0; i < lsBook.length; i++) {
      const color = backgroundColors[i];
      const dark = darkColors[i];
      carouselBooks.push(
        <div key={i}>
          <BookCardCarousel
            bookInfo={lsBook[i]}
            style={color}
            dark={dark}
          ></BookCardCarousel>
        </div>
      );
    }
    return carouselBooks;
  };

  render() {
    let lsBook =
      (this.props.bookCarouselResults &&
        this.props.bookCarouselResults.content) ||
      [];
    let settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "30px",
      slidesToShow: 2,
      speed: 500
    };
    return (
      <div className="Carousel">
        <Slider {...settings}>{this.getCategoryBook(lsBook)}</Slider>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.books
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookCardCarouselContainer);
