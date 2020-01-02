import React, { Component } from "react";
import Page from "../page";
import { PageHeader } from "antd";

class RuleLibrary extends Component {
  render() {
    return (
      <Page
        header={
          <PageHeader
            className="w-full"
            onBack={() => null}
            title="Trang Chủ"
            subTitle="Nội Quy Thư Viện"
          />
        }
        content={
          <div className="p-8">
            <p className="text-sm italic">
              Theo Nghị định 31/2001 NĐ-CP của Chính phủ về xử phạt vi phạm hành
              chính trong lĩnh vực Văn hóa – Thông tin.
            </p>
            <p className="text-base font-bold  text-orange-500">
              QUY ĐỊNH VỀ BẢO VỆ TÀI LIỆU TRONG THƯ VIỆN
            </p>
            <div>
              <ul>
                <li style={{ textAlign: "left" }}>
                  1. Phạt cảnh cáo hoặc phạt từ 50.000đ đến 200.000đ đối với
                  hành vi làm hư hại, chiếm dụng tài liệu, sách báo và vật mang
                  tin khác có giá trị dưới 200.000đ trong các thư viện.&nbsp;
                </li>
                <li style={{ textAlign: "left" }}>
                  2. Phạt tiền từ 500.000đ đến 2.000.000đ đối với hành vi làm hư
                  hại, chiếm dụng sách báo có giá trị trên 200.000đ đến
                  1.000.000đ trong các thư viện.
                </li>
                <li style={{ textAlign: "left" }}>
                  3. Phạt tiền từ 2.000.000đ đến 5.000.000đ đối với một trong
                  các hành vi sau:&nbsp;
                  <ul>
                    <li style={{ textAlign: "left" }}>
                      <span style={{ color: "rgb(44, 130, 201)" }}>
                        Làm hư hại hoặc chiếm dụng tài liệu, sách báo có giá trị
                        từ 1.000.000đ trở lên trong các thư viện.
                      </span>
                      <span style={{ color: "rgb(247, 218, 100)" }}>
                        &nbsp;
                      </span>
                    </li>
                    <li style={{ textAlign: "left" }}>
                      <span style={{ color: "rgb(44, 130, 201)" }}>
                        Sử dụng trái phép tài liệu lưu giữ trong Thư viện thuộc
                        loại sử dụng hạn chế.{" "}
                      </span>
                    </li>
                  </ul>
                </li>
                <li style={{ textAlign: "left" }}>
                  4. Phạt tiền từ 20.000.000đ đến 50.000.000đ đối với hàh vi làm
                  hư hại nặng, hủy hoại tài liệu trong thư viện.{" "}
                  <span style={{ fontSize: "14px" }}>
                    <br />
                    <br />
                  </span>
                </li>
                <li style={{ textAlign: "left" }}>
                  <span style={{ fontSize: "14px" }}>
                    <strong>
                      * Ngoài việc phạt tiền, người vi phạm còn bị buộc bồi
                      thường thiệt hại theo quy định của pháp luật.
                    </strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        }
      ></Page>
    );
  }
}

export default RuleLibrary;
