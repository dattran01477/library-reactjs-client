import { Button, Rate } from "antd";
import React, { Component } from "react";
import injectSheet from "react-jss";
import { withRouter } from "react-router";
import styled from "styled-components";
const styles = {
  bookItem: {
    "&:hover": {
      
    }
  }
};

const WrapperBook = styled.div`
  &:hover {
  
  }
`;
const WrapperButton = styled.div`
  display: flex;
  ${WrapperBook}:hover & {
    display: flex;
    z-index: 1;
  }
`;

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
      <WrapperBook>
        <div
          className={
            (classes.bookItem,
            "shadow-xl hover:shadow-2xl max-w-xs w-64 max-h-full h-auto m-4 rounded-lg border p-1")
          }
          onClick={event => this.gotoBookDetail(this.props.item.id)}
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
                    <Rate style={{ fontSize: 14 }} value={3} />
                  </div>
                </div>
              </div>
              <div className="w-7/12 p-2">
                <div className="text-left">
                  <div className="h-48">
                    <div>
                      <p className="text-sm font-bold">{this.props.title.substring(0, 20)}...</p>
                    </div>
                    <div className="text-xs font-thin text-gray-500">
                      Số lượng: {this.props.totalBooks}
                    </div>
                    <div className="text-xs font-thin text-gray-500">
                      Số lược mượn: {this.props.totalBorrowings}
                    </div>
                    <div className="my-2 text-sm text-gray-900">
                      {this.props.content &&
                        this.props.content.substring(0, 60)}
                      ...
                    </div>
                  </div>
                  <div className="h-5">
                    <WrapperButton >
                      <Button
                        className="w-full mb-2 z-50 "
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
                    </WrapperButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperBook>
    );
  }
}

export default withRouter(injectSheet(styles)(BookItem));
