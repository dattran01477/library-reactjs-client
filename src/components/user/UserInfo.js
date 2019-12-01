import React, { Component } from "react";
import Page from "../page";
import { PageHeader, Icon, Button, Divider, Tabs, Table } from "antd";
import { dataUser } from "./data";
const { TabPane } = Tabs;

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

const columnsBorrowingCard = [
  {
    title: "Ngày Tạo",
    dataIndex: "create_date",
    key: "create_date"
  },
  {
    title: "Ngày Chỉnh Sửa",
    dataIndex: "update_date",
    key: "update_date"
  },
  {
    title: "Lý do vi phạm",
    dataIndex: "reason",
    key: "reason"
  }
];

const columnsPenalizesCard = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(dataUser)
    };
  }
  render() {
    const { data } = this.state;
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
          <div className="flex flex-row">
            <div className="w-4/12 m-2">
              <div class="max-w-sm rounded overflow-hidden shadow-lg p-4">
                <div class="font-normal text-base mb-2">{data.user.name}</div>
                <div className="flex flex-row">
                  {(data.user.status === "Active" && (
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
                    src="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
                    alt="Sunset in the mountains"
                  />
                </div>

                <div className="text-center mt-2">
                  <Button type="danger">{data.user.role}</Button>
                  <p class="text-gray-700 text-base text-xs ">
                    Ngày tham gia: {data.user.create_date}
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
                      <Button className="float-right">
                        Chỉnh sửa thông tin
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-8/12">
                      <div className="flex flex-row">
                        <p className="w-2/5 font-semibold">Họ và tên: </p>
                        <p className="w-3/5">{data.user.name}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="w-2/5 font-semibold">Mã số thẻ mượn: </p>
                        <p className="w-3/5">{data.user.register_code}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="w-2/5 font-semibold">Đơn vị: </p>
                        <p className="w-3/5">Khoa công nghệ thông tin</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="w-2/5 font-semibold">Số điện thoại </p>
                        <p className="w-3/5">{data.user.phone}</p>
                      </div>
                      <div className="flex flex-row">
                        <p className="w-2/5 font-semibold">Email: </p>
                        <p className="w-3/5">{data.user.email}</p>
                      </div>
                    </div>
                    <div className="w-4/12">
                      <div className="flex flex-row">
                        <span className="mx-2">
                          <Icon type="facebook" />
                        </span>
                        <a>
                          <p className="w-3/5">dat.feed09</p>
                        </a>
                      </div>
                      <div className="flex flex-row">
                        <span className="mx-2">
                          <Icon type="instagram" />
                        </span>
                        <a>
                          <p className="w-3/5">dattran01477</p>
                        </a>
                      </div>
                      <div className="flex flex-row">
                        <span className="mx-2">
                          <Icon type="twitter" />
                        </span>
                        <a>
                          <p className="w-3/5">dat.feed0703</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="my-4">
                    <Tabs defaultActiveKey="1" onChange={e => null}>
                      <TabPane tab="Danh sách phiếu phạt" key="1">
                        <Table
                          dataSource={data.penalizes}
                          columns={columnsBorrowingCard}
                        />
                      </TabPane>
                      <TabPane tab="Danh sách phiếu mượn" key="2">
                        <Table
                          dataSource={data.borrowings}
                          columns={columnsBorrowingCard}
                        />
                      </TabPane>
                    </Tabs>
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

export default UserInfo;
