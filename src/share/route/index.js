import Books from "../../components/book/BookCardContainer";
import BookDetail from "../../components/bookdetail/BookDetail"
import BookCart from "../../components/bookcart/BookCart"
var routes = [
  {
    path: "/books",
    name: "Kệ sách",
    icon: "ni ni-bullet-list-67 text-red",
    component: Books,
    layout: ""
  },
  {
    path: "/user",
    name: "Quản lý đọc giả",
    icon: "ni ni-bullet-list-67 text-red",
    component: Users,
    layout: ""
  },
  {
    path: "/book/:id",
    name: "Quản lý mượn trả",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookDetail,
    layout: ""
  },
  {
    path: "/user",
    name: "Quản lý sách",
    icon: "ni ni-bullet-list-67 text-red",
    component: Books,
    layout: ""
  },
  {
    path:"/book/:id",
    name:"Books detail",
    icon:"ni ni-bullet-list-67 text-red",
    component: BookDetail,
    layout:""
  }
  ,
  {
    path:"/book-cart",
    name:"Cart",
    icon:"ni ni-bullet-list-67 text-red",
    component: BookCart,
    layout:""
  }
  // ,
  // {
  //   path:"/book-cart",
  //   name:"Cart",
  //   icon:"ni ni-bullet-list-67 text-red",
  //   component: BookCart,
  //   layout:""
  // }
];

export default routes;
