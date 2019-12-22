import React, { Component } from "react";
import Page from "../page";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const columns = [
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

class RegisterReturnbook extends Component {
  render() {
    return (
      <Page
        header={
          <div className="h-32 bg-gray-800 text-center">
            <p className="text-3xl font-semibold text-white">
              Chào Mừng Bạn Đến Với Quy Trình Trả Sách Mới Của Thư Viện
            </p>
          </div>
        }
        content={
          <Tabs tabPosition="left" className="h-full">
            <TabPane tab="Phiếu Mượn Đến Hạn" key="1">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Phiếu Mượn Gần Đây" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Phiếu Mượn Quá Hạn" key="3">
              Content of Tab 3
            </TabPane>
          </Tabs>
        }
      />
    );
  }
}

export default RegisterReturnbook;
