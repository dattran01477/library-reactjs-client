import { Avatar, Button, Comment, Divider, Form, Input, List, PageHeader, Skeleton, Tabs } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { TraceSpinner } from "react-spinners-kit";
import "react-table/react-table.css";
import * as Action from "../../data/actions/action-type";
import { openMessage } from "../message/Message";
import Page from "../page";
const { TabPane } = Tabs;
const { TextArea } = Input;

export class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      detail: null,
      comment: { reviewContent: "", bookId: "", username: "" },
      isComment: false,
      lsReview: []
    };
  }

  componentWillMount() {
    this.setState({ ...this.state, isLoading: true });
  }

  handleSubmitComment = () => {
    this.props.addComent(
      { ...this.state.comment, username: this.props.auth.username },
      this.state.detail.id,
      this.successSubmitComment
    );
    this.setState({ ...this.state, comment: "", isComment: true });
  };

  successSubmitComment = lsReview => {
    this.setState({ ...this.state, lsReview: lsReview });
  };

  handleChangeComment = e => {
    let commentTmp = { ...this.state.comment, reviewContent: e.target.value };

    this.setState({ ...this.state, comment: commentTmp });
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

  onClickBorrowing = item => {
    let cartItemCurrent = [...this.props.cartItem];
    cartItemCurrent.push(item);
    this.props.addCart(cartItemCurrent);
    openMessage("Thêm vào giỏ mượn thành công!");
  };

  checkExistInCart(item) {
    let cartItem = [...this.props.cartItem];
    for (let i = 0; i < cartItem.length; i++) {
      if (item.id === cartItem[i].id) {
        return true;
      }
    }
    return false;
  }

  getBookDetailByCriteria = () => {
    let id = this.props.match.params.id;
    this.props.getBookDetail(id);
  };

  componentDidUpdate() {
    if (this.props.bookDetail !== null && this.state.detail === null) {
      this.props.getComment(this.props.bookDetail.id, this.successSubmitComment);
      this.setState({
        ...this.state,
        detail: this.props.bookDetail,
        isLoading: false
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
      const reviews = this.state.lsReview;
      return (
        <div>
          <Page
            header={
              <PageHeader
                className="w-full border-b"
                onBack={() => null}
                title="Trang Chủ"
                subTitle={detail.name}
              />
            }
            content={
              <div className="flex flex-col">
                <div className="flex flex-row p-16">
                  <div className=" shadow-xl h-64 w-48">
                    <img
                      className=" h-64 w-48"
                      src={detail.thumbnail}
                      alt="banner images"
                    />
                  </div>
                  <Divider type="vertical" className="h-64" />
                  <div className="w-3/5 mx-4 ">
                    <div className="font-extrabold">{detail.name}</div>
                    <div>
                      <div className="text-xs">- Category: Lập trình</div>
                      <div className="text-xs">- Code: {detail.isbn}</div>
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
                            value={detail.amountBook}
                          />
                        </div>
                        <div className="w-3/6 ">
                          <span className="text-sm mx-2">update:</span>
                          <span className="text-xs text-gray-600 mx-2">
                            {detail.updateDate}
                          </span>
                        </div>
                      </div>
                      <div>
                        <Button
                          type="danger"
                          className="my-4"
                          disabled={this.checkExistInCart(detail)}
                          icon="shopping-cart"
                          onClick={e => this.onClickBorrowing(detail)}
                        >
                          Thêm vào giỏ mượn
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Tabs onChange={this.callback} type="card">
                  <TabPane tab="Nội Dung" key="1" className="p-2">
                    {detail.longDescription}
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
                          value={this.state.comment.reviewContent}
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
                          key={item.id}
                          // actions={
                          //   true && [
                          //     <IconText
                          //       type="star-o"
                          //       text="156"
                          //       key="skeleton-star-o"
                          //     />,
                          //     <IconText
                          //       type="like-o"
                          //       text="156"
                          //       key="skeleton-like-o"
                          //     />,
                          //     <IconText
                          //       type="message"
                          //       text="2"
                          //       key="skeleton-message"
                          //     />
                          //   ]
                          // }
                        >
                          <Skeleton loading={false} active>
                            <List.Item.Meta
                              avatar={
                                <Avatar src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABLFBMVEX/oFX///+067713KpGRlVcXW6b3LTryJuWhoex5sHctJG06MGo4rv436s3Ok7JuZ7/nlD/m0mPgIT/mkfn0q7/olP416b/oln/+fT/1Lax7cD/7+P/yaL136/zw5Ow7sH/2b//t4L/rGv/4s7/wpf/6dn/8+r/z63/pmDw1aye3bb/snb/uor/8ef/xp3/5dJRWG5kZXVQUF41OE6TiX2zppLy+/PB7snxnmBCQlHN3K7UmHFhYnJ6c3qckZOwoJe4kX7On4Pbx6fnoW+lj4msjYHCnIrcnHFiYGf51KP7wojjwqDawo+13LfjvIXX06zY063F4bLysnLN16XYzJbovH7h9uTL8NHW9NvHjm2zg2mkg3SXgXtycn7YkWGkhHiEb259ZF60f16Cf4mWK2/aAAARU0lEQVR4nOWde1sTuxaH03Kx7ELNdMCWQi0tBaetqMBGKBbdgm4BwS2I4A2P5/j9v8NJMp17ksnk0vKc83v2/kOYhvV2rSRrZWYSkDOu6tLqyuJyu9lrtRynAiqO02r1mu3lxZXVpar5Pw8Mtl3dWF1+3KvYtmVZEAkEwv9EP7XtSu/x8uqGSVBThEsr7Z5DwABfBNXptVeWDFlignBjsVmBVipblNOClebihgFrdBNWV9sV28oCF8K07Ep7VXfEaiVcX2lCW47Op7Rhc2Vdp1H6CKsrTSDpvLgrQXNFnyd1ES61LS14HqTV1jXyaCGsLrYUg5MCabcWtThSA+HGEz3RmWC0wBMNg6sy4VIz07SQERI2lYNVkXCtpz08Y4x2b22MhGtNw3wuY1OJUYFwqWmk+1EYLZVYlSastkfgP5/RbkuPq7KEiwbHFyojXBwp4VrLHikflt2S645ShO0RdcCooNUeEeHqiAM0xAhXR0BYfTz6AA1kP8484mQlfOqMy4GuoPPULOHyWHpgBNFaNki43rLGzIdltTJVyFkIV8G4HegKgiwDTgbCR3fBga6sRyYIm3cHECE2tRNWxzyGxgUd0WlDkHCpcrcAEWJFsN4QIxxfGsOWaIIjRLgyzjSGLXtFF+Hi3QREiCIVlQDhWGaJBV+8q0RmjXTC5dF4cCGkyt7Ruxdfv377/qN8+5aLaKencKmEZgGHRBVnb+/oxddviOngdvOZr6mpwX+4hAKIaYSPjAC6YM7e0c+fX//6149fB5sDnymiwbOffEJgpwVqCuGi3j44dBmOwX+VD443p2hUYcBByUlr00oZbviE2qYJNxb3UCD+ONikeotO2D9OcSFInTS4hKsaAN1w3EPBeDAQBfO0Odn/nk4IbO7UzyNcUkxkMNzez28/ft0OMqJ5gJOlrwKEAPISOA5hVSUXxZ578a2Me1p2NB9wsnQkRFjhpOEcQvlqYqHivPh+K+W3KODkM7E/CB0ZwqYkIIrMr78U6fAoigH7/64IIjazE0rmagsL734NFOl8wMnSN5EgxWLnbyzCVUnAowN1PBShU32XUGigcRFZAyqDcF2KDyx81cE32NyaHGovwx9nrMAxCFtSnXDhLz0O9Pj6x6kZTSDYykK4LBWjC99lJr3bTZYD0UAjHKRIjKViKuFTOcAXwoCDwQChIDaEszmI8A17oEsoktGEEKkL/jRCyXW1vQGTiDgLyeUabG1NTW1N9vvov6mwBwdBgLoDTVphERV9/Y1G+FiuE/6guHCAqQjaFhHySz9wUn8r7MDNGB8eaDIRAvhYjFAy396LAt7eIpMREe5VIaiINkMORJ5N/H5LcL73RcvBKYRyuUwwzAxQsA22WFSBggAdxMNz6OJf2VyIBEUI25KEm16oTU2mwoX4Bpto9NyifqKUsoJBI0zeCE8QrklW9SRIaaFGExpgcAckgyn7E6V3mQmBlXicIUEoN9e7U8WmGN/k5O3mlttLue7ezjDfe0rO+3FC2dXfyo9nkaksxYdCF01ldyFllThGWJUsmZy3t1PigIJfQ7b53hOscgklh5nK28LvgWbArPO9T9jmES7JxejC23Lht2gfFFV/6m8pQmAvcQjl6nr4rlwo/Nbtwn65/E7OnCabUHKmcApIZd298Bg1KjGYgviMESGUdOHrMkbUHKV9/K290ODEMOGaXC+svMGAhQOtTuz/xm2+yZqYurLXGIQ9uYH0iLiwUNA5W/QPSJPlIymLYI9OKDmQDoMUmaMdsFB+Lfelh4fTEKHsAunbQsFD1OPF/lbZa/IvuQkj3BMDwg1JwMrLgq/j9JopFa+/dRA0+FKuIwK4QSF8ooGwUJ6a3C7Ja3t7a+qgXNBA+CRJWJVrKkJYfnX/cP7wvrwO5+fR51+VlQkBqCYIpe/2+oTll/NzcxMTcyqaIJ+ff1lWJQzuDPuEknVhQFh+VccG6tBc3XOjNGFQJ3qEklMF8Cf8wpu6Jj6suteorFXBhOERSpZNAC/luy6c1+VBrLn5sspsAUJF1JCwKv/MxcJrYssrnYAI8RVp9bU0IbCqEcIVeUI3pynf10x4v6yQ0xDClQihbD4D8BoUseVQM+EhafWFvA+9vMYllLxd6Ipk3uV5rYATE6QjSmbeQ62HCBWCFIA9g4RZ7pDGNQxToBqkiPClMcKXKoTDMCWEsmuId5twuK5ICNWe7nLeGCN8I7dQM5R7JwqoTfdYC2+NEfIfn02TO+kTQukE/m4TgopHuKH2CCL8u2yIsPy32rOD9saQUPExWZLUmCFUSGmwSAkFVOcKpHfGCN+pGUbmC6DcDd2kxgyhUkoD3I4I1B+UBUeMkcat2dNFvY6MNKqE+NFaoJiyYe2V3+zc7yTs7uz8uTORzjg3ga7rJK7r3N95o5S0YeHEDajOhnjB4LCe9MLc/clSafs4teSYOzzeLpUmk8XX3Fz9UHppxTOtTQglF/MDQKqjOmR5uH+ctrZRPybXTSZiAENOKCLi5X2QqyplRihpozLM7ZTIAu92ihPnDrfJdaUd6nV1VeOqiHBDrRtaJ3TL/+zzLE98E/0/6dedKFq3gQglnwb21KKHoS7CekuNcBURLiuFOjw1THiqZt4yIpR7EtFvgh6k2ggnTtTMe4wI1YZS+IBFWMpEWGIRPlAzr4cI1XI2pg93tjONpdusb0LNhyhvA1XF0onRDycmyPOGpQMuH9ZBidwUZfxWsR8Cuwrkb1i4Yoylbq6yfZBMx+LXdQ62ObmP4lgK7CWgOFkwwxQlJIc7h0J5Ke86xSBF0wVQzrsrbNtVaouhVCs7awUovwcLnQc676uFVX+gvBuHtQjUJnyCWDmtm2Cs10/Vd+OAy0C1diLNOL1T7YCnPR3bqcA2UF2kGTZkM2Z+aT3Qs2khbALF6tBvSTuhJrt6QHG+8Vu6o4SI73+fULGI9nRnCZ3/A0LVpGGoO0uoie8OE2pjTCHsdDrRtKeOfjISwoq2fsgqMQjfH1jvO3WcY6P/65335Cc8RtWiwpO+kYaXtv3h6z1W8E/OZxQrX1+OtvmQQ9j5gyWOE3UR6pvxe8zyYu49k/A9szCsa8omEZ+ulgC7gJLxYV2TVSgv1VNboKYesiOOScj+yENdZjW11IdErCUpjhM5LtTUeXB9qF7je21xnDhB64rvOdfrciGu8fXtV8ZxIvZjeJZAswZ3vtfmQrxOo7zW5gs2uYhzOLO5h4WzGe4qXF3X4EDW2iRfWKO29lDPglT9ob598Ow11VX9iNhL/JkAdU32WHYVSG4SQVdKoIoB6gtRbFEOyL9KQm3QOVFjrJ9o3ZIZthCh1q8Mt3kivT5cr59o/b7Jc19A+XGaRKPQOZ2QYaxPnDq6d2SGbURoYBNdCHqZg7V+0jOwqb31SP1ZDLqwIzPcsKk/0O8+IvIsxpKhjZCRIwUZ6w9MuI/IWtLwTBSn+Yf3OumM9c49jTN8TOSZKN2DaSD4EKdofMY6TuS05dkJC5rkyT1j+3UTQh5k3c1TzRHi/SKB7P5zAvIIMWMSsu7xmSR8SgjXjUZpAEl1n1lCuO4+521qqIkQ4qJp6EnkvU7kN8YIneGT7LqzGk8xQgJ5r3MvhmeQkLw0A1TfzeO0D+bjKAzNG5oOyft5QOk9bo4gOOtO7wsB7k93z4wwkve5Nbz3RBN0EB/SuQDgOb6we2bgIBv/vSfFh2iTgpWz2WlXs2mROu9feab7LBu47BNqXKshLX/oTvvq/sMF/Cd86Qe9iO5WQ+47pFrnCwhbIbOnuZ1xP3xht6W3vnCCd0j1zRcQWs7l2adi2HBOZzyPXFf8dHbpZDt1nmtLO/Sms44aESK61unVRb7RqOVnI6YzOuN87Kp8rdHIX1x9biFKDZjDHb5dwqriaIosgr0Pn4r5Rq2WxypG4nR6+iMF8GP0km6RfLJWa+SLnz70oDLl8DgB9T0VkCHO6dV+DbsuUDROaZ1xP3ZFMfRp3Nj+1WcHKFBG91SQT2ugdXl1UfNcF9JsDCDeGc9jv5+NN4CcWbu4upQ+UjK2L0ZOktC63K8l6Yi6cYRwZ5yPfwFdahuo7f1LWdNyUUKpfbAgvGrQ8ZBmpuMKZsZ/Er8rspqpNa6kQtXfC8sjlHmfG7YuGizDKHEadMZ4F6TEaEiNC5llYnsjRijx6gxsnXPsyifj1OuM8S7oj6MsnWdHDDYW9Akldo445371yfGUdMaHiS6INMNtZ3b6PLNtwd7lwY50WTM3az8lumhxiiKV8rP0VvazDjfBwTMBYcYTH+DnbrpxyTiliT6ORr6m7udscRo6CSIgzLggBS/cv81FTIyn3eH/4jE6/CMXGa1bpxBmy2vg50ZeADEWp7MYeSb+Q87ni96faGRyIn3vy2yLGXC/lhdAjOans8SpM1Fu7jjq/4HafhZCxv6lmZzoxCxgIkad5RJGEHkxGm4+y5EzIRdGCDM4EV42BBFnw4AeYeynIoCNS/HvP7Kjd2QvaPFXguFZg2IF1YndMIpH6CPyYjTSdONM3LjIUSURQvFtaOFVjWoHDTHsK5/QQxQFzNeuxI3bYBKKr2bATzWGJRRE5MXusLcFhPmZbgYPIsJPwrZFN9aPEq6LzvphQoHhZsYjCRHmi0WhUTQzobXOIRR2IryocaxhK0zIVaLJmuiczz8bQXxvugu+PaqElAYvBC1LOd9C+GzVIsUifgmUhbBI+caKYoYlzl1NnDMjWCfGaUjCqY2Q1poYYWTDeTqh4K5R8eKeTHvptosRztAmyoYYYeLQ1eR5T0JVVCWxfDEj5EQxQuq31RBZ06Wcn0c5s0ukpVaCkDgxtScKERapuU5D5MnoShKHQihwJ8pPS0OaFTFeiHCGOjCLJKZ24jwr+tl57dQ4hR+ShEWRMBUipEdDI/3em5U8k0z2/EMaITZMGyGloXRC8fMP00/UCUqLkGY1ElKyh/TiInnmGpMw9WwyeEZZ6sbBpYWQHu61NMLEeWQ8wrRyP1Q8BZoVGExFCIv0DDCtfGId68wgTOmKkdJiVIT84oLeCdmEKV3R2h8DIX9VmN4JOYT8rmhdjIHwgkfI6IQ8wlyT06C1S7HMMGF+l2dQk8nBJuS9amLRSEwTFtmErBOrUwirbESLZplpwjyTELYYo0wKYW6d+RhWhXbn1zRhjVUSwArjWPVUQvYScWsshKziwk7UhMKErNum8HIshIzignaQszAh4ykUeEq7f2+asEF/L9GKL8xkI8w9onmR3FobPSH1Bpv9KIUgjZCKSC2ezBPSyqdUwHRCWnJzdwjZqUwGQkpfpJYW5keaZHGR1gcFCZOrxNTSYgyEidVfWcLEpAFppYV5wviN7pRpIgth7mn00TJq8TQCwkh3gfCpkO1ihLm1SEVMLZ7ME0bKJ+iwCkI5wly1Z4UJaZYZz7zDhFaPk2xLEeZy7VBnHBNhqAvSVkZVCdGs4UWqQ7XMOKH/wAkUmSUkCHNrXjXVGhPhsLiAFcEumJkQ1cSkJ8DemAjde5sWr95VJMTvDENW8WSekJRP0ErNRJUIc2vIjbQ7T6MgxHefrFaWCJUhzOWW7TES2sk7oPoJc2uAWh6OgPAzyOpAOcJc7uOY+uFHGWOlCHPPd8ew5r37XMpWOcJc7nrkhNeSlsoS5nI3cTeaJKzdSNspT5h7fjMywhu5AFUlxIzx5/dMENZU+BQJo0OOGULZAUYXYThWjRCq+U8LIWL8kq8ZIazlvyjzaSFEusbBqpmwtis7P0Slh5AEq15C9fAcShch0vWMNsIZPe4j0kiIHHl9k2e+NStIWMvfXOtyH5FWQiw+ZAohxtNtkHbCnOtKBiabEF2v2XlDmSDEQpS7FEwqIbpq1wwdlilCoufXXxBn+IX9KCH+ze7NF2NwREYJh3p+ff3ly83N7m4RvwrUnckXd3cR2Jdrs2hD/Re0DKCRV5ZIEwAAAABJRU5ErkJggg==" />
                              }
                              title={item.username}
                            />
                            {item.reviewContent}
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
    } else
      return (
        <Page
          header={
            <PageHeader
              className="w-full border-b"
              onBack={() => null}
              title="Trang Chủ"
              subTitle="Chi tiết"
            />
          }
          content={
            <div className="mx-auto w-full flex justify-center content-center flex-wrap h-64">
              <TraceSpinner loading={this.state.isLoading}>
                Đang tải
              </TraceSpinner>
            </div>
          }
        ></Page>
      );
  }
}

const mapStateToProps = state => ({
  ...state.bookDetail,
  ...state.auth,
  ...state.books
});

const mapDispatchToProps = dispatch => ({
  getBookDetail: id => dispatch(Action.getBookDetail(id)),
  addComent: (formComment, bookId, successFunc) =>
    dispatch(Action.addComment(formComment, bookId, successFunc)),
  addCart: item => dispatch(Action.addToCart(item)),
  getComment: (bookId, successFunc) =>
    dispatch(Action.getComment(bookId, successFunc))
});
export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
