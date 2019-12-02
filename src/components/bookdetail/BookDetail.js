import {
  Avatar,
  Button,
  Divider,
  Icon,
  Input,
  List,
  Skeleton,
  Tabs,
  PageHeader
} from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import "react-table/react-table.css";
import { callApiAsPromise } from "../../api";
import { actFetchBookDetail } from "../../data/actions/book";
import * as Action from "../../data/actions/action-type";
import Page from "../page";
const { TabPane } = Tabs;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

export class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      detail: null
    };
  }
  componentDidMount() {
    this.getBookDetailByCriteria();
  }

  getBookDetailByCriteria = () => {
    let id = this.props.match.params.id;
    this.props.getBookDetail(id);
  };

  componentDidUpdate() {
    if (this.props.bookDetail !== null && this.state.detail === null) {
      console.log("aaa");
      this.setState({
        ...this.state,
        detail: this.props.bookDetail.content[0]
      });
    }
  }
  render() {
    const listData = [];
    const { detail } = this.state;

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

    if (detail !== null) {
      return (
        <div>
          {console.log(detail)}
          <Page
            header={
              <PageHeader
                className="w-full border-b"
                onBack={() => null}
                title="Trang Chủ"
                subTitle={detail.book.name}
              />
            }
            content={
              <div className="flex flex-col">
                <div className="flex flex-row p-16">
                  <div className="w-1/5 shadow-xl h-64 w-32">
                    <img
                      className="object-fill h-64 w-64"
                      src={detail.book.thumbnail}
                      alt="banner images"
                    />
                  </div>
                  <Divider type="vertical" className="h-64" />
                  <div className="w-3/5 mx-4 ">
                    <div className="font-extrabold">{detail.book.name}</div>
                    <div>
                      <div className="text-xs">- Category: Lập trình</div>
                      <div className="text-xs">- Code: {detail.book.isbn}</div>
                      <div className="text-xs">- Status: Khả dụng</div>
                      <div className="text-xs">
                        - Author: {detail.author.name}
                      </div>
                      <div className="text-xs">
                        - Publisher: {detail.publisher.note}
                      </div>
                    </div>
                    <Divider type="horizontal" className="w-50" />
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <div className="w-3/6">
                          <span className="w-10/12 text-sm mx-2">
                            Số Lượng:
                          </span>
                          <Input
                            className="w-2/12"
                            size="small"
                            placeholder="0"
                            value={detail.book.amount_book}
                          />
                        </div>
                        <div className="w-3/6 ">
                          <span className="text-sm mx-2">update:</span>
                          <span className="text-xs text-gray-600 mx-2">
                            {detail.book.update_date}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Button
                          type="danger"
                          className="my-4"
                          icon="shopping-cart"
                        >
                          Thêm vào giỏ mượn
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Tabs onChange={this.callback} type="card">
                  <TabPane tab="Content" key="1" className="p-2">
                    {detail.book.long_description}
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

    return <div></div>;
  }
}

const mapStateToProps = state => ({
  ...state.bookDetail
});

const mapDispatchToProps = dispatch => ({
  getBookDetail: id => dispatch(Action.getBookDetail(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
