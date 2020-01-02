import { PageHeader } from "antd";
import React, { Component } from "react";
import Page from "../page";

class Contact extends Component {
  render() {
    return (
      <Page
        header={
          <PageHeader
            className="w-full"
            onBack={() => null}
            title="Trang Chủ"
            subTitle="Liên Lạc"
          />
        }
        content={
            <div></div>
        }
      ></Page>
    );
  }
}

export default Contact;
