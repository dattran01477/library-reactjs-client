import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Page from "../page";

const columns = [
  {
    Header: "Name",
    accessor: "name",
    className:"justify-center" // Cái này sẽ là đại diện cho giá trị của thuộc tính của phần tử ở cột này. Với thuộc tính đơn giản thì chỉ cần truyền vào key của đối tượng trong data.
  },
  {
    Header: "Age",
    accessor: "age",
    className:"justify-center",
    Cell: props => <span className="number">{props.value}</span> // Tùy biến component Cell.
  },
  {
    id: "friendName", // Khi accessor không phải là 1 chuỗi thì phải cung cấp id để đại diện cho thuộc tính cột.
    Header: "Friend Name",
    className:"justify-center",
    accessor: d => d.friend.name // Tùy biến giá trị đại diện cho giá trị của thuộc tính của phần tử ở cột này.
  },
  {
    Header: props => <span>Friend Age</span>, 
    className:"justify-center",// Tùy biến component Header
    accessor: "friend.age" // Khi 1 thuộc tính của dữ liệu có kiểu là 1 đối tượng, chúng ta cũng có thể cung cấp đường dẫn đến thuộc tính cần lấy giá trị.
  }
];
const data = [
  {
    name: "Nguyen Van A",
    age: 26,
    friend: {
      name: "Do Van C",
      age: 23
    }
  },
  {
    name: "Dao Thi B",
    age: 22,
    friend: {
      name: "Ngo Trung V",
      age: 24
    }
  },
  {
    name: "Tran Duc C",
    age: 25,
    friend: {
      name: "Ngo Thanh E",
      age: 25
    }
  },
  {
    name: "Le Tien N",
    age: 27,
    friend: {
      name: "Cao Cong G",
      age: 24
    }
  },
  {
    name: "Pham Hoang M",
    age: 26,
    friend: {
      name: "Lai Hai D",
      age: 25
    }
  },
  {
    name: "Duong Van L",
    age: 23,
    friend: {
      name: "Le Hoang M",
      age: 23
    }
  }
];
export default class user extends Component {
  render() {
    return (
      <div>
        <Page
          header={<div class="font-bold text-xl mb-2">Quản lý đọc giả</div>}
          content={
            <div className="justify-center p-10">
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={5}
                className="rounded-lg"
              />
            </div>
          }
        ></Page>
      </div>
    );
  }
}
