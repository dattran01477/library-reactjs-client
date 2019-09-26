import React from "react";
import "./App.css";
import BookCardContainer from "./components/book/BookCardContainer";
import BookCardCarouselContainer from "./components/carousel/BookCardCarouselContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    <Container>
      <BookCardCarouselContainer />
      <BookCardContainer />
    </Container>
  );
}

export default App;
