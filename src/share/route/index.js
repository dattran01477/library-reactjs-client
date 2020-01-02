import Books from "../../components/book/BookCardContainer";
import BookDetail from "../../components/bookdetail/BookDetail";
import BookCart from "../../components/cart/CartDetail";
import Contact from "../../components/page_library/Contact";
import RuleLibrary from "../../components/page_library/RuleLibrary";
import TeamContribute from "../../components/page_library/TeamContribute";
import RegisterReturnbook from "../../components/register-return-book";
import User from "../../components/user/UserContainer";
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
    path: "/app/return-book",
    name: "returnbook",
    icon: "ni ni-bullet-list-67 text-red",
    component: RegisterReturnbook,
    layout: ""
  },
  {
    path: "/app/contact",
    name: "returnbook",
    icon: "ni ni-bullet-list-67 text-red",
    component: Contact,
    layout: ""
  },
  {
    path: "/app/team",
    name: "returnbook",
    icon: "ni ni-bullet-list-67 text-red",
    component: TeamContribute,
    layout: ""
  },
  {
    path: "/app/rule",
    name: "returnbook",
    icon: "ni ni-bullet-list-67 text-red",
    component: RuleLibrary,
    layout: ""
  }
];

export default routes;
