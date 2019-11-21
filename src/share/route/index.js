import Books from "../../components/book/BookCardContainer";
import BookDetail from "../../components/bookdetail/BookDetail"
import BookCart from "../../components/bookcart/BookCart"
import Users from "../../components/bookdetail/BookDetailContainer";
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
    name: "Chi tiết sách",
    icon: "ni ni-bullet-list-67 text-red",
    component: Users,
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
