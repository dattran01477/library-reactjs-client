import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Page from "../page";
import {
  Tabs,
  Card,
  Divider,
  Input,
  Button,
  Skeleton,
  Switch,
  List,
  Avatar,
  Layout,
  Icon
} from "antd";

const { TabPane } = Tabs;
const { Header, Footer, Sider, Content } = Layout;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export default class user extends Component {
  callback = key => {
    
  };

  render() {
    const listData = [];
    for (let i = 0; i < 3; i++) {
      listData.push({
        href: "http://ant.design",
        title: `ant design part ${i}`,
        avatar:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        description:
          "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
      });
    }

    return (
      <div>
        <Page
          header={<div class="font-bold text-xl mb-2">Quản lý đọc giả</div>}
          content={
            <div className="flex flex-col">
              <div className="flex flex-row p-16">
                <div className="w-1/5   shadow-xl h-64 w-64">
                  <img
                    className="object-fill h-64 w-64"
                    src="https://images-na.ssl-images-amazon.com/images/I/51ub94TBqPL.jpg"
                    alt="banner images"
                  />
                </div>
                <Divider type="vertical" className="h-64" />
                <div className="w-3/5 mx-4 ">
                  <div className="font-extrabold">Tôi đi code dạo</div>
                  <div>
                    <div className="text-xs">- Category: Palm</div>
                    <div className="text-xs">- Code: Product 2</div>
                    <div className="text-xs">- Status: Available</div>
                    <div className="text-xs">- Author: ThanhDat</div>
                    <div className="text-xs">- Publisher: KimDong</div>
                  </div>
                  <Divider type="horizontal" className="w-50" />
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="w-3/6">
                        <span className="w-10/12 text-sm mx-2">Số Lượng: </span>
                        <Input
                          className="w-2/12"
                          size="small"
                          placeholder="0"
                        />
                      </div>
                      <div className="w-3/6 ">
                        <span className="text-sm mx-2">update:</span>
                        <span className="text-xs text-gray-600 mx-2">
                          21/11/2019
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button type="primary my-4" icon="shopping-cart">
                        Thêm vào giỏ mượn
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Tabs onChange={this.callback} type="card">
                <TabPane tab="Content" key="1" className="p-2">
                  Hành vi miệt thị HLV Park Hang-seo của trợ lý đội tuyển Thái
                  Lan sau cuộc đấu tại Mỹ Đình tối 19/11 gây ra sự phẫn nộ lớn
                  trong cộng đồng CĐV Việt Nam. Những CĐV Việt Nam nói chung và
                  độc giả Zing.vn nói riêng đều bày tỏ chung sự không hài lòng
                  lẫn bức xúc sau khi chứng kiến cảnh HLV Park Hang-seo bị trợ
                  lý Sasa Todic phía Thái Lan khiêu khích. Đó cũng không phải
                  lần đầu tiên ông Todic cùng đội ngũ bên phía ban huấn luyện
                  Thái Lan có những động thái này với HLV trưởng tuyển Việt Nam.
                  Trong trận đấu lượt đi trên sân Thammasat hồi tháng 9, điều
                  này cũng đã diễn ra. Căng thẳng còn lên cao hơn khi trong
                  tuyên bố hôm 21/11, ông Todic đưa ra lời xin lỗi với tất cả cá
                  nhân và tập thể bên phía tuyển Việt Nam, chỉ trừ HLV Park
                  Hang-seo.
                </TabPane>
                <TabPane tab="Review" key="2" className="p-2">
                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                      <List.Item
                        key={item.title}
                        actions={
                          true && [
                            <IconText
                              type="star-o"
                              text="156"
                              key="skeleton-star-o"
                            />,
                            <IconText
                              type="like-o"
                              text="156"
                              key="skeleton-like-o"
                            />,
                            <IconText
                              type="message"
                              text="2"
                              key="skeleton-message"
                            />
                          ]
                        }
                        extra={
                          true && (
                            <img
                              width={272}
                              alt="logo"
                              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                          )
                        }
                      >
                        <Skeleton loading={false} active avatar>
                          <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                          />
                          {item.content}
                        </Skeleton>
                      </List.Item>
                    )}
                  />
                </TabPane>
                <TabPane tab="More Info" key="3" className="p-2">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
          }
        ></Page>
      </div>
    );
  }
}
