import { Button } from "antd";
import React, { Component } from "react";
import injectSheet from "react-jss";
import { withRouter } from "react-router";
const styles = {
  bookItem: {
    "&:hover": {
      boxShadow: " 29px 26px 51px 0px rgba(0,0,0,0.75) "
    }
  }
};

class BookItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props.classes
    };
  }

  gotoBookDetail = id => {
    this.props.history.push(`/app/book/${id}`);
  };

  render() {
    const { classes } = this.state;
    return (
      <div
        className={
          (classes.bookItem,
          "shadow-xl hover:shadow-2xl max-w-xs w-64 max-h-full h-auto m-4 rounded-lg border p-1")
        }
        onClick={event => this.gotoBookDetail(this.props.item._id)}
      >
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="w-5/12">
              <div className="h-40">
                <img
                  className="rounded-lg"
                  src={this.props.thumnail}
                  alt="me"
                />
              </div>
              <div className="h-24">
                <div className="text-md font-thin">
                  <p>Đánh Giá</p>
                </div>
                <Button
                  className="w-full my-2"
                  type="danger"
                  icon="plus-circle"
                  onClick={event => {
                    event.stopPropagation();
                    this.props.onClickBorrowing(this.props.item);
                  }}
                  disabled={this.props.disableBorrowing}
                >
                  Mượn
                </Button>
              </div>
            </div>
            <div className="w-7/12 p-2">
              <div className="text-left">
                <div>
                  <p className="text-base font-bold">{this.props.title}</p>
                </div>
                <div className="text-xs font-thin">
                  Số lượng: {this.props.totalBooks}
                </div>
                <div className="text-xs font-thin">
                  Số lược mượn: {this.props.totalBorrowings}
                </div>
                <div className="my-2">
                  {this.props.content && this.props.content.substring(0, 50)}
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(injectSheet(styles)(BookItem));
