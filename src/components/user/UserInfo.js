import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  PageHeader,
  Table,
  Tabs,
  Tag
} from "antd";
import React, { Component } from "react";
import Barcode from "react-barcode";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import * as Action from "../../data/actions/action-type";
import Page from "../page";
import { dataUser } from "./data";
import * as Constant from "../../share/constants";
const { TabPane } = Tabs;

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(dataUser),
      showDetail: false,
      borrowings: null,
      isEdit: false,
      form: { name: "", phone: "", email: "" }
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
          return <Tag color="green">Đã mượn</Tag>;
        }
        if (item === Constant.BORROW_STATUS.waitting) {
          return <Tag color="gold">Đang chờ</Tag>;
        }
        if (item === Constant.BORROW_STATUS.cancel) {
          return <Tag color="red">Hủy</Tag>;
        }
        if (item === "Returned") {
          return <Tag color="blue">Đã trả</Tag>;
        }
      }
    },
    {
      title: "hành động",
      dataIndex: "id",
      key: "id",
      render: item => (
        <Button onClick={e => this.handleView(item)} icon="eye">
          Xem chi tiết
        </Button>
      )
    }
  ];

  BookBorrowingDetail = ({ lsBookCartItems }) => {
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

  handleView = id => {
    this.setState({ ...this.state, showDetail: true });
    this.props.getBorrowingDetail(id);
  };

  saveInfo = () => {
    this.props.saveInfoUser(this.state.form, this.props.auth.user._id);
    this.setState({ ...this.state, isEdit: false });
  };

  closeBorrowPopup = () => {
    this.setState({ ...this.state, showDetail: false });
  };

  handleEditUser = () => {
    this.setState({ ...this.state, isEdit: !this.state.isEdit });
  };

  onChange = e => {
    let form = { ...this.state.form };
    form[e.target.name] = e.target.value;
    this.setState({ ...this.state, form: form });
  };

  render() {
    const data = this.props.auth;
    console.log(data);

    return (
      <Page
        header={
          <PageHeader
            className="w-full"
            onBack={() => null}
            title="Trang Chủ"
            subTitle="thông tin tài khoản"
          />
        }
        content={
          <div className="flex flex-row ">
            <div className="w-4/12 m-2">
              <div class="max-w-sm rounded overflow-hidden shadow-lg p-4">
                <div class="font-normal text-base mb-2">{data.name}</div>
                <div className="flex flex-row">
                  {(data.status === Constant.USER_STATUS.active && (
                    <>
                      <Icon
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                      <div className="text-xs text-green-500"> active </div>
                    </>
                  )) || (
                    <>
                      <Icon type="check-circle" />
                      <div className="text-xs"> disactive </div>
                    </>
                  )}
                </div>

                <div className="w-full flex justify-center">
                  <img
                    className="w-32 h-32"
                    src={data.avatarThumnail}
                    alt="Sunset in the mountains"
                  />
                </div>

                <div className="text-center mt-2">
                  <Button type="danger">{data.role}</Button>
                  <p class="text-gray-700 text-base text-xs ">
                    Ngày tham gia: {data.createDate}
                  </p>
                  <Divider className="w-full" />
                  <div class="p-2">
                    <div className="flex flex-row ">
                      <span className="mx-2">
                        <Icon type="credit-card" />
                      </span>
                      <p className="font-medium">
                        Số lần mượn: {data.borrowings.length}
                      </p>
                    </div>
                    <div className="flex flex-row ">
                      <span className="mx-2">
                        <Icon type="file-exclamation" />
                      </span>
                      <p className="font-medium">
                        Số phiếu phạt: {data.penalizes.length}
                      </p>
                    </div>
                    <div className="flex flex-row ">
                      <span className="mx-2">
                        <Icon type="read" />
                      </span>
                      <p className="font-medium">Bài đăng: 45</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-8/12 m-2">
              <div class="w-full rounded overflow-hidden shadow-lg p-4">
                <div className="flex flex-col">
                  <div className="flex flex-row my-2">
                    <div className="w-6/12">
                      <span className="border-b-2">Thông tin chung</span>
                    </div>
                    <div className="w-6/12 ">
                      {!this.state.isEdit && (
                        <Button
                          className="float-right"
                          onClick={this.handleEditUser}
                        >
                          Chỉnh sửa thông tin
                        </Button>
                      )}
                      {this.state.isEdit && (
                        <Button className="float-right" onClick={this.saveInfo}>
                          Lưu thông tin
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* view info */}
                  {!this.state.isEdit && (
                    <div className="flex flex-row">
                      <div className="w-8/12">
                        <div className="flex flex-row">
                          <p className="w-2/5 font-semibold">Họ và tên: </p>
                          <p className="w-3/5">
                            {data.lastName + " " + data.firstName}
                          </p>
                        </div>
                        <div className="flex flex-row">
                          <p className="w-2/5 font-semibold">
                            Mã số thẻ mượn:{" "}
                          </p>
                          <p className="w-3/5">{data.registerCode}</p>
                        </div>
                        <div className="flex flex-row">
                          <p className="w-2/5 font-semibold">Đơn vị: </p>
                          <p className="w-3/5">Khoa công nghệ thông tin</p>
                        </div>
                        <div className="flex flex-row">
                          <p className="w-2/5 font-semibold">Số điện thoại </p>
                          <p className="w-3/5">{data.phoneNumber}</p>
                        </div>
                        <div className="flex flex-row">
                          <p className="w-2/5 font-semibold">Email: </p>
                          <p className="w-3/5">{data.email}</p>
                        </div>
                      </div>
                      <div className="w-4/12">
                        <div className="flex flex-row">
                          <span className="mx-2">
                            <Icon type="facebook" />
                          </span>
                          <span>
                            <p className="w-3/5">{data.fbAccount}</p>
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="mx-2">
                            <Icon type="instagram" />
                          </span>
                          <span>
                            <p className="w-3/5">{data.instaAccount}</p>
                          </span>
                        </div>
                        <div className="flex flex-row">
                          <span className="mx-2">
                            <Icon type="twitter" />
                          </span>
                          <span>
                            <p className="w-3/5">{data.linkedAccount}</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* edit */}
                  {this.state.isEdit && (
                    <div className="flex flex-row my-2">
                      <div className="w-8/12">
                        <div className="flex flex-row">
                          <p className="w-2/5 font-semibold">Họ và tên: </p>
                          <div className="w-3/5">
                            <Input
                              value={
                                this.state.form.name.length > 0
                                  ? this.state.form.name
                                  : data.name
                              }
                              name="name"
                              onChange={this.onChange}
                            ></Input>
                          </div>
                        </div>
                        <div className="flex flex-row my-2">
                          <p className="w-2/5 font-semibold">Số điện thoại </p>
                          <div className="w-3/5">
                            <Input
                              value={
                                this.state.form.phone.length > 0
                                  ? this.state.form.phone
                                  : data.phoneNumber
                              }
                              name="phone"
                              type="number"
                              onChange={this.onChange}
                            ></Input>
                          </div>
                        </div>
                        <div className="flex flex-row my-2">
                          <p className="w-2/5 font-semibold">Email: </p>
                          <div className="w-3/5">
                            <Input
                              value={
                                this.state.form.email.length > 0
                                  ? this.state.form.email
                                  : data.email
                              }
                              name="email"
                              onChange={this.onChange}
                            ></Input>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="my-4">
                    <Tabs defaultActiveKey="1" onChange={e => null}>
                      <TabPane tab="Danh sách phiếu mượn" key="1">
                        <Table
                          dataSource={data.borrowings}
                          columns={this.columnsBorrowingCard}
                        />
                      </TabPane>
                      <TabPane tab="Danh sách phiếu phạt" key="2">
                        <Table
                          dataSource={data.penalizes}
                          columns={this.columnsBorrowingCard}
                        />
                      </TabPane>
                    </Tabs>
                    <Modal show={this.state.showDetail}>
                      <Modal.Header closeButton>
                        <Modal.Title>Chi Tiết Nhận Sách</Modal.Title>
                      </Modal.Header>
                      {(this.props.borrowDetail && (
                        <Modal.Body>
                          <div className="flex flex-col shadow-lg border mx-auto p-4">
                            {/* start detail book */}
                            <div className="flex flex-col">
                              <div className="w-12/12">
                                <this.BookBorrowingDetail
                                  lsBookCartItems={
                                    this.props.borrowDetail.bookIds
                                  }
                                />
                              </div>
                            </div>
                            {/* end detail book */}
                            {/* start bar code */}
                            <div className="mx-auto">
                              <Barcode
                                width={1}
                                height={50}
                                value={this.props.borrowDetail.Id}
                              />
                            </div>
                            {/* end bar code */}
                            {/* start info */}
                            <div className="flex flex-col">
                              <div>Loại phiếu mượn: Mượn giáo trình</div>
                              <div>
                                Ngày nhận sách:
                                {this.props.borrowDetail.createDate}
                              </div>
                              <div>Địa chỉ: DH SPKT</div>
                              <div>
                                Tình trạng: {this.props.borrowDetail.status}
                              </div>
                              <div>
                                Thời gian có giá trị: trước khi kết thúc học kỳ
                                2 tuần
                              </div>

                              <span className="text-xs">
                                *Sau thời gian có giá trị nếu bạn không tời
                                nhâận sách thì phiếu này không còn giá trị
                              </span>
                            </div>
                            {/* end info */}
                          </div>
                        </Modal.Body>
                      )) ||
                        "không có dữ liệu"}

                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={event => this.closeBorrowPopup()}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      ></Page>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.borrowing
});

const mapDispatchToProps = dispatch => ({
  getBorrowingDetail: borrowingDetailID =>
    dispatch(Action.getBorrowingDetail(borrowingDetailID)),
  saveInfoUser: (form, userId) => dispatch(Action.updateProfile(form, userId)),
  getUserInfo: () => dispatch(Action.getUserInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
