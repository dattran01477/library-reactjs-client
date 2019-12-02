import React, { Component, useState, useEffect } from "react";
import Page from "../page";
import {
  PageHeader,
  Icon,
  Button,
  Divider,
  Tabs,
  Table,
  Avatar,
  Steps
} from "antd";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";
import uuidv4 from "uuid/v4";
import Barcode from "react-barcode";
import auth from "../auth";
import { Modal } from "react-bootstrap";

const { Step } = Steps;

const borrowItemDefault = {
  id: "5dda0199c954720018518236",
  book_id: [],
  user_id: "5dda0199c954720018518236",
  type: "borrow",
  status: "active",
  editor_id: "5dda0199c954720018518236",
  receiveDate: "5/12/2019",
  status: "chấp thuận"
};

class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steptCurrent: 1,
      showPopUp: false
    };
  }

  closeBorrowPopup = () => {
    this.setState({ showPopUp: false });
    this.props.createBorrowing(null);
  };

  handleDeleteCart = id => {
    let cartItem = [...this.props.cartItem];
    cartItem = cartItem.filter(item => {
      if (item._id !== id) {
        return item;
      }
    });
    this.props.addCart(cartItem);
  };

  handleCreateBorrowing = () => {
    const cartItem = [...this.props.cartItem];
    let cartDefault = { ...borrowItemDefault };
    cartItem.map(item => {
      cartDefault.book_id.push(item.id);
    });

    this.setState({ showPopUp: true });
    this.props.createBorrowing(cartDefault);
  };

  BookCartDetailBodyLeft = ({ lsBookCartItems, handleDeleteCart }) => {
    function BookCartRow({ item }) {
      return (
        <div className="shadow-md hover:shadow-2xl border rounded flex flex-row m-2 p-2">
          <div className="w-9/12 flex flex-row">
            <div>
              <Avatar shape="square" size="large" src={item.thumbnail} />
            </div>
            <Divider type="vertical" className="h-full" />
            <div>{item.name}</div>
          </div>
          <div className="w-3/12">
            <Button
              className="float-right"
              icon="delete"
              onClick={event => handleDeleteCart(item._id)}
            />
          </div>
        </div>
      );
    }
    return (
      (lsBookCartItems.length > 0 &&
        lsBookCartItems.map(item => (
          <BookCartRow key={item._id} item={item} />
        ))) ||
      "Không có sách mượn"
    );
  };
  BookCartDetailBodyRight = ({ lsBookCartItems, user }) => {
    return (
      <div className="shadow-md border rounded flex flex-col m-2 p-2 w-full">
        <div>Xác Nhận phiếu mượn</div>
        <Divider type="horizontal" />
        <div>
          <div className="flex flex-row m-2">
            <span className="font-light w-5/12">Họ Tên Sinh Viên:</span>
            <p className="w-7/12 text-sm font-medium">Trần Thành Đạt</p>
          </div>
          <div className="flex flex-row m-2">
            <span className="font-light w-5/12">Số Lượng Sách:</span>
            <p className="w-7/12 text-sm font-medium">
              {lsBookCartItems.length}
            </p>
          </div>
          <div className="flex flex-row m-2">
            <span className="font-light w-5/12">Thời Gian Mượn Tối Đa:</span>
            <p className="w-7/12 text-sm font-medium">
              2 Tháng kể từ ngày mượn
            </p>
          </div>
          <div className="flex flex-row m-2">
            <span className="font-light w-5/12">Địa Điểm Nhận Sách:</span>
            <p className="w-7/12 text-sm font-medium">Thư Viện DH SPKT</p>
          </div>
        </div>
        <Button
          className="rounded-full border-blue-400"
          onClick={e => this.handleCreateBorrowing()}
        >
          Xác Nhận
        </Button>
      </div>
    );
  };

  render() {
    const step = this.props.borrowItem != null ? 2 : 1;

    return (
      <Page
        header={
          <PageHeader
            className="w-full"
            onBack={() => null}
            title="Quay lại"
            subTitle="Chi tiết mượn sách"
          />
        }
        content={
          <div className="flex flex-col justify-center">
            <div className="px-2">
              <Steps current={step}>
                <Step title="Chọn Sách" />
                <Step title="Xác Nhận Thông Tin" />
                <Step title="Mượn Thành Công" />
              </Steps>
            </div>

            {step == 1 && (
              <div className="flex flex-row">
                <div className="w-8/12">
                  <this.BookCartDetailBodyLeft
                    lsBookCartItems={this.props.cartItem}
                    handleDeleteCart={this.handleDeleteCart}
                  />
                </div>
                <div className="w-4/12">
                  <this.BookCartDetailBodyRight
                    lsBookCartItems={this.props.cartItem}
                  />
                </div>
              </div>
            )}

            {step == 2 && (
              <Modal show={this.state.showPopUp}>
                <Modal.Header closeButton>
                  <Modal.Title>Chi Tiết Nhận Sách</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="flex flex-col shadow-lg border mx-auto p-4">
                    <div className="mx-auto">
                      <Barcode
                        width={1}
                        height={50}
                        value={this.props.borrowItem.id}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div>Loại phiếu mượn: Mượn giáo trình</div>
                      <div>
                        Ngày nhận sách: {this.props.borrowItem.receiveDate}
                      </div>
                      <div>Địa chỉ: DH SPKT</div>
                      <div>Tình trạng:</div>
                      <div>Thời gian có giá trị: </div>

                      <span className="text-xs">
                        *Sau thời gian có giá trị nếu bạn không tời nhâận sách
                        thì phiếu này không còn giá trị
                      </span>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={event => this.closeBorrowPopup()}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}

            <div>
              <span>
                * Lưu ý: Vui lòng đọc đầy đủ nội quy thư viện trước khi mượn
                sách để tránh xảy ra trường hợp bị phạt
              </span>
            </div>
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.books,
  ...state.borrowing
});

const mapDispatchToProps = dispatch => ({
  addCart: item => dispatch(Action.addToCart(item)),
  createBorrowing: item => dispatch(Action.saveBorrowing(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
