import Books from "../../components/book/BookCardContainer";
import Book from "../../components/book/BookCard";
import { BookDetail } from "../../components/bookdetail/BookDetail";
var routes = [
  {
    path: "/books",
    name: "Books",
    icon: "ni ni-bullet-list-67 text-red",
    component: Books,
    layout: "",
  },
  {
    path:"/book/:id",
    name:"Books detail",
    icon:"ni ni-bullet-list-67 text-red",
    component: BookDetail,
    layout:""
  }
];

export default routes;
