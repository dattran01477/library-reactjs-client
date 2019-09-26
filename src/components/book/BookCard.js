import React, { Component } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import BookCover from "./items/BookCover";
import BookInfo from "./items/BookInfo";
import "./items/bookStyle.css";
import Likes from "./items/Likes";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  isLiked = () => {
    this.setState({ liked: !this.state.liked });
  };

  render() {
    let like = null;
    if (this.state.liked) {
      like = (
        <FaHeart
          className="icon"
          onClick={() => {
            this.isLiked();
          }}
        ></FaHeart>
      );
    } else {
      like = (
        <FaHeartBroken
          className="icon"
          onClick={() => {
            this.isLiked();
          }}
        ></FaHeartBroken>
      );
    }
    return (
      <div className="Book">
        <BookCover img={this.props.img}></BookCover>
        <BookInfo
          name={this.props.name}
          author={this.props.author}
          rate={this.props.rate}
          voters={this.props.voters}
        ></BookInfo>
        {like}
        <Likes people={this.props.people}></Likes>
      </div>
    );
  }
}

export default Book;
