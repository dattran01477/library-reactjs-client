import {
  Avatar,
  Button,
  Comment,
  Divider,
  Form,
  Icon,
  Input,
  List,
  PageHeader,
  Skeleton,
  Tabs
} from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import "react-table/react-table.css";
import * as Action from "../../data/actions/action-type";
import Page from "../page";
const { TabPane } = Tabs;
const { TextArea } = Input;

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
      detail: null,
      comment: "",
      isComment: false
    };
  }

  handleSubmitComment = () => {
    this.props.addComent(
      {
        book_detail_id: this.state.detail._id,
        user: this.props.auth.user._id,
        comment: this.state.comment
      },
      this.state.detail.book._id
    );
    this.setState({ ...this.state, comment: "", isComment: true });
  };

  handleChangeComment = e => {
    this.setState({ ...this.state, comment: e.target.value });
  };

  Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Bình Luận
        </Button>
      </Form.Item>
    </div>
  );

  componentDidMount() {
    this.getBookDetailByCriteria();
  }

  getBookDetailByCriteria = () => {
    let id = this.props.match.params.id;
    this.props.getBookDetail(id);
  };

  componentDidUpdate() {
    console.log(this.props.bookDetail);
    if (this.props.bookDetail !== null && this.state.detail === null) {
      this.setState({
        ...this.state,
        detail: this.props.bookDetail.content[0]
      });
    }
    if (this.state.detail !== null) {
      if (
        this.props.bookDetail.content[0].reviews.length !==
        this.state.detail.reviews.length
      ) {
        this.setState({
          ...this.state,
          detail: this.props.bookDetail.content[0],
          isComment: false
        });
      }
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
      const reviews = detail.reviews;
      return (
        <div>
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
                  <div className=" shadow-xl h-64 w-48">
                    <img
                      className=" h-64 w-48"
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
                  <TabPane tab="Nội Dung" key="1" className="p-2">
                    {detail.book.long_description}
                  </TabPane>
                  <TabPane tab="Đánh Giá" key="2" className="p-2">
                    <Comment
                      avatar={
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <this.Editor
                          onChange={this.handleChangeComment}
                          onSubmit={this.handleSubmitComment}
                          value={this.state.comment}
                        />
                      }
                    />
                    <List
                      className="p-4"
                      itemLayout="vertical"
                      size="large"
                      dataSource={reviews}
                      renderItem={item => (
                        <List.Item
                          key={item._id}
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
                        >
                          <Skeleton loading={false} active avatar>
                            <List.Item.Meta
                              avatar={<Avatar src={item.user.avater} />}
                              title={item.user.name}
                              description={item.comment}
                            />
                            {item.comment}
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                  </TabPane>
                  <TabPane tab="Thông Tin Thêm" key="3" className="p-2">
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
  ...state.bookDetail,
  ...state.auth
});

const mapDispatchToProps = dispatch => ({
  getBookDetail: id => dispatch(Action.getBookDetail(id)),
  addComent: (formComment, bookId) =>
    dispatch(Action.addComment(formComment, bookId))
});
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
