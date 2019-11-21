import Books from "../../components/book/BookCardContainer";
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
    path: "/user",
    name: "Quản lý mượn trả",
    icon: "ni ni-bullet-list-67 text-red",
    component: Books,
    layout: ""
  },
  {
    path: "/user",
    name: "Quản lý sách",
    icon: "ni ni-bullet-list-67 text-red",
    component: Books,
    layout: ""
  }

];

export default routes;
