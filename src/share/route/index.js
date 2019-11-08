
import Book from "../../components/book/BookCard";
import BookDetail from "../../components/bookdetail/BookDetail";
import BookCart from "../../components/bookcart/BookCart";
import  BookCardContainer  from "../../components/book/BookCardContainer";
var routes = [
  {
    path: "/books",
    name: "Books",
    icon: "ni ni-bullet-list-67 text-red",
    component: BookCardContainer,
    layout: "",
  },
  {
    path:"/book/:id",
    name:"Books detail",
    icon:"ni ni-bullet-list-67 text-red",
    component: BookDetail,
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
