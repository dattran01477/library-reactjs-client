import React, { Component } from "react";
import Page from "../page";
import { Button, Tabs, Tag, Table, PageHeader } from "antd";
import * as Constant from "../../share/constants";
import * as Action from "../../data/actions/action-type";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const { TabPane } = Tabs;

class RegisterReturnbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        expiredBorrowingCards: [],
        nearlyExpiredBorrowingCards: [],
        newBorrowingCards: []
      },
      registerId: ""
    };
  }
  columnsBorrowingCard = [
    {
      title: "Ngày mượn",
      dataIndex: "createDate",
      key: "createDate"
    },
    {
      title: "Số sách mượn",
      dataIndex: "bookIds",
      key: "bookIds",
      render: item => item.length
    },
    {
      title: "Trạng thái hiện tại",
      dataIndex: "status",
      key: "status",
      render: item => {
        if (item === Constant.BORROW_STATUS.active) {
          return <Tag color="green">Đã Mượn</Tag>;
        }
        if (item === Constant.BORROW_STATUS.waitting) {
          return <Tag color="gold">Đang Chờ</Tag>;
        }
        if (item === Constant.BORROW_STATUS.cancel) {
          return <Tag color="red">Hủy</Tag>;
        }
        if (item === Constant.BORROW_STATUS.returned) {
          return <Tag color="blue">Đã Trả</Tag>;
        }
        if (item === Constant.BORROW_STATUS.waitting_return) {
          return <Tag color="blue">Chờ Trả Sách</Tag>;
        }
      }
    },
    {
      title: "hành động",
      dataIndex: "id",
      key: "id",
      render: item => (
        <div>
          <Button
            onClick={e => this.confirmRegisterReturnBook(item)}
            icon="container"
            className="mx-2"
          >
            Trả Sách
          </Button>
          <Button
            onClick={e => this.confirmRegisterReturnBook(item)}
            icon="eye"
            className="mx-2"
          >
            Xem Chi Tiết
          </Button>
        </div>
      )
    }
  ];

  confirmRegisterReturnBook = id => {
    this.setState({ ...this.state, showDetail: true, registerId: id });
  };

  processRegisterReturnBook = id => {
    Action.registerReturnBook(this.registerReturnBookSucess, id);
  };

  componentDidMount() {
    Action.getBorrowingTabs(this.getTabsSucess);
  }

  getTabsSucess = data => {
    this.setState({ ...this.state, tabs: data });
  };

  registerReturnBookSucess = data => {
    Action.getBorrowingTabs(this.getTabsSucess);
  };

  closeBorrowPopup = () => {
    this.setState({ ...this.state, showDetail: false });
  };

  render() {
    return (
      <Page
        header={
          <PageHeader
            className="w-full"
            onBack={() => null}
            title="Trang Chủ"
            subTitle="Đăng Ký Trả Sách"
          />
        }
        content={
          <div>
            <Tabs tabPosition="left" className="h-full">
              <TabPane tab="Phiếu Mượn Đến Hạn" key="1">
                <Table
                  dataSource={this.state.tabs.nearlyExpiredBorrowingCards}
                  columns={this.columnsBorrowingCard}
                />
              </TabPane>
              <TabPane tab="Phiếu Mượn Gần Đây" key="2">
                <Table
                  dataSource={this.state.tabs.newBorrowingCards}
                  columns={this.columnsBorrowingCard}
                />
              </TabPane>
              <TabPane tab="Phiếu Mượn Quá Hạn" key="3">
                <Table
                  dataSource={this.state.tabs.expiredBorrowingCards}
                  columns={this.columnsBorrowingCard}
                />
              </TabPane>
            </Tabs>

            <Modal show={this.state.showDetail}>
              <Modal.Header closeButton>
                <Modal.Title>Xác Nhận Trả Sách</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <span className="text-xs">
                  *Sau khi chấp nhận trả sách, vui lòng mang sách đến đúng thời
                  gian, để biết thêm thông tin vui lòng đọc tại đây
                </span>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className="ml-auto"
                  variant="primary"
                  onClick={event =>
                    this.processRegisterReturnBook(this.state.registerId)
                  }
                >
                  Đồng Ý
                </Button>
                <Button
                  className="mr-auto"
                  variant="secondary"
                  onClick={event => this.closeBorrowPopup()}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.borrowing
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterReturnbook);
