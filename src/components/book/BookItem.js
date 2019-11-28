import React, { Component } from "react";
import { Button } from 'antd';

const content =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
class BookItem extends Component {
  render() {
    return (
      <div className="shadow-xl hover:shadow-2xl max-w-xs w-64 max-h-full h-auto m-4 rounded-lg">
        <div className="flex flex-col">
          <div className="flex flex-row justify-center">
            <div className="w-5/12">
              <img
              className="rounded-lg"
                src="https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9788/4175/9788417511982.jpg"
                alt="me"
              />
              <div className="text-md font-thin">
                <a>4 đánh giá</a>
              </div>
              <Button className="w-full my-2" type="danger"  icon="plus-circle" >Mượn</Button>
            </div>
            <div className="w-7/12 p-2">
              <div className="text-left">
                <div>
                  <p className="text-base font-bold">Tôi là chính tôi</p>
                </div>
                <div className="text-xs font-thin">Số lượng: 8</div>
                <div className="text-xs font-thin">Số lược mượn: 20</div>
                <div className="my-2">{content.substring(0, 100)}...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookItem;
