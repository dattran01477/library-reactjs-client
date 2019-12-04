import { Avatar, Button, Divider, PageHeader, Steps } from "antd";
import React, { Component } from "react";
import Barcode from "react-barcode";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";
import Page from "../page";
import { CART_NAME } from "../../share/constants";
import uuid from "uuid/v1";

const { Step } = Steps;

const borrowingCard = {
  book_id: [],
  user_id: "",
  type: "borrow",
  borrow_date: "active",
  create_date: "",
  update_date: "",
  user_id: "",
  status: ""
};

class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steptCurrent: 1,
      showPopUp: false,
      borrowing: borrowingCard
    };
  }

  componentDidMount() {
    this.updateBorowing();
  }

  updateBorowing = () => {
    let borrowingTmp = { ...this.state.borrowing };
    borrowingTmp.user_id = this.props.auth.user._id;
    this.props.cartItem.map(item => {
      borrowingTmp.book_id.push(item._id);
    });
    borrowingTmp.status = "Active";
    borrowingTmp.type = "Mượn Giáo Trính";
    this.setState({ ...this.state, borrowing: borrowingTmp });
  };

  closeBorrowPopup = () => {
    this.setState({ showPopUp: false });
    this.props.createBorrowing(null);
    this.props.history.push("/app/books")
  };

  handleDeleteCart = id => {
    let cartItem = [...this.props.cartItem];
    cartItem = cartItem.filter(item => {
      if (item._id !== id) {
        return item;
      }
    });
    this.props.addCart(cartItem);
    this.updateBorowing();
  };

  handleCreateBorrowing = () => {
    const cartItem = [...this.props.cartItem];
    let borrowingTmp = { ...this.state.borrowing };
    this.setState({ showPopUp: true });
    cartItem.map(item => {
      borrowingTmp.book_id.push(item._id);
    });
    this.props.createBorrowing(borrowingTmp);
  };

  componentDidUpdate() {
    console.log(this.props.borrowItem);
  }

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
            <p className="w-7/12 text-sm font-medium">
              {this.props.auth.user.name}
            </p>
          </div>
          <div className="flex flex-row m-2">
            <span className="font-light w-5/12">Số Lượng Sách:</span>
            <p className="w-7/12 text-sm font-medium">
              {lsBookCartItems.length}
            </p>
          </div>
          <div className="flex flex-row m-2">
            <span className="font-light w-5/12">Địa Điểm Nhận Sách:</span>
            <p className="w-7/12 text-sm font-medium">Thư Viện Đại Học SPKT</p>
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
                        value={this.props.borrowItem._id}
                      />
                    </div>
                    <div className="flex flex-col">
                      <div>Loại phiếu mượn: Mượn giáo trình</div>
                      <div>
                        Ngày nhận sách:
                        {this.props.borrowItem.create_date}
                      </div>
                      <div>Địa chỉ: DH SPKT</div>
                      <div>Tình trạng:</div>
                      <div>Thời gian có giá trị: trước khi kết thúc học kỳ 2 tuần</div>

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
  ...state.borrowing,
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  addCart: item => dispatch(Action.addToCart(item)),
  createBorrowing: item => dispatch(Action.saveBorrowing(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
