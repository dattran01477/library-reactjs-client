import { Avatar, Button, Divider, PageHeader, Popconfirm, Steps } from "antd";
import React, { Component } from "react";
import Barcode from "react-barcode";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";
import * as Constant from "../../share/constants";
import Page from "../page";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const { Step } = Steps;

const borrowingCard = {
  bookIds: [],
  userId: "",
  type: "borrow",
  borrowDate: new Date(),
  status: ""
};

let stompClient = null;

function onConnected() {
  // // Subscribe to the Public Topic
  // stompClient.subscribe("/topic/borrowing-list", onMessageReceived);
}

function onError(error) {
  console.log("loi roi " + error);
}

function onMessageReceived(data) {
  console.log(data);
}

class CartDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steptCurrent: 1,
      showPopUp: false,
      borrowing: borrowingCard,
      stompClient: null
    };
  }

  onclickSendData = () => {
    stompClient.send("/apps/borrowing.add", {}, JSON.stringify({}));
  };

  componentDidMount() {
    this.updateBorowing();
    var socket = new SockJS(`${Constant.BASE_API}/ws`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    this.setState({ ...this.state, stompClient: stompClient });
  }

  componentDidUpdate() {
    if (this.state.borrowing.length === 0) {
      this.props.history.push("/app/books");
    }
  }

  updateBorowing = () => {
    let borrowingTmp = { ...this.state.borrowing };
    borrowingTmp.userId = this.props.auth.id;
    this.props.cartItem.map(item => borrowingTmp.bookIds.push(item));
    borrowingTmp.status = Constant.BORROW_STATUS.waitting;
    this.setState({ ...this.state, borrowing: borrowingTmp });
  };

  closeBorrowPopup = () => {
    this.setState({ showPopUp: false, steptCurrent: 1 });
    this.props.createBorrowing(null);
    this.props.history.push("/app/books");
  };

  handleDeleteCart = id => {
    let cartItem = [...this.props.cartItem];
    cartItem = cartItem.filter(item => {
      if (item.id !== id) {
        return item;
      }
      return null;
    });
    this.props.addCart(cartItem);
    this.updateBorowing();
  };

  handleCreateBorrowing = () => {
    let borrowingTmp = { ...this.state.borrowing };
    this.props.createBorrowing(borrowingTmp, this.createBorrowingSuccess);
  };

  createBorrowingSuccess = () => {
    this.setState({ showPopUp: true });
    this.props.addCart([]);
    this.props.refreshUserInfo(this.errorRefresh);
    this.onclickSendData();
  };

  errorRefresh = code => {};

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
            <Popconfirm
              placement="top"
              title="Xóa Sách Khỏi Giỏ Mượn."
              onConfirm={e => handleDeleteCart(item.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button className="float-right" icon="delete" />
            </Popconfirm>
          </div>
        </div>
      );
    }
    return (
      (lsBookCartItems.length > 0 &&
        lsBookCartItems.map(item => (
          <BookCartRow key={item.id} item={item} />
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
              {this.props.auth.username}
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

            {step === 1 && (
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

            {step === 2 && (
              <Modal show={true}>
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
                        Ngày nhận sách:
                        {this.props.borrowItem.borrowDate}
                      </div>
                      <div>Địa chỉ: DH SPKT</div>
                      <div>
                        Tình trạng:
                        {this.props.borrowItem.status}
                      </div>
                      <div>
                        Thời gian có giá trị: trước khi kết thúc học kỳ 2 tuần
                      </div>

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
  createBorrowing: (item, successFunc) =>
    dispatch(Action.saveBorrowing(item, successFunc)),
  refreshUserInfo: error => dispatch(Action.exchangeAuthWithServer(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
