import Books from "../../components/book/BookCardContainer";
import BookDetail from "../../components/bookdetail/BookDetail";
import BookCart from "../../components/cart/CartDetail";
import IntroduceTeam from "../../components/contribute";
import User from "../../components/user/UserContainer";
import RegisterReturnbook from "../../components/register-return-book";
var routes = [
  {
    path: "/app/books",
    name: "Kệ sách",
    icon: "ni ni-bullet-list-67 text-red",
    component: Books,
    layout: ""
  },
  {
    path: "/app/userinfo",
    name: "Thông tin user",
    icon: "ni ni-bullet-list-67 text-red",
    component: User,
    layout: ""
  },
  {
    path: "/app/book/:id",
    name: "Chi tiết sách",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookDetail,
    layout: ""
  },
  {
    path: "/app/book-cart",
    name: "Cart",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookCart,
    layout: ""
  },
  {
    path: "/app/contribute",
    name: "contribute",
    icon: "ni ni-bullet-list-67 text-red",
    component: IntroduceTeam,
    layout: ""
  },
  {
    path: "/app/return-book",
    name: "returnbook",
    icon: "ni ni-bullet-list-67 text-red",
    component: RegisterReturnbook,
    layout: ""
  }
];

export default routes;
