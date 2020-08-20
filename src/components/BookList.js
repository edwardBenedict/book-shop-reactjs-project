import React, { Component } from "react";
import "./Style.css";
import results from "./results";
import { Card, Table, Image, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MyToast from "./MyToast";

export default class BookList extends Component {
  state = {
    books: [],
  };
  componentDidMount() {
    this.findAllBooks();
  }
  findAllBooks() {
    results.get("/books.json").then((response) => {
      console.log(response.data);
      const fetchedResults = [];
      for (let key in response.data) {
        fetchedResults.push({
          ...response.data[key],
          id: key,
        });
      }
      this.setState({ books: fetchedResults });
    });
  }
  deleteBook = (bookId) => {
    results.delete("/books/" + bookId + ".json").then((response) => {
      if (response.data != null) {
        /*IF ICINE GIRMIYOR */
        alert("Book Deleted Succesfully");
        this.setState({
          books: this.state.books.filter((book) => book.id !== bookId),
        });
      }
      this.setState({ show: true });
      setTimeout(() => this.setState({ show: false }), 3000);
      this.setState({
        books: this.state.books.filter((book) => book.id !== bookId),
      });
    });
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Book Deleted Succesfully."}
            type={"danger"}
          />
        </div>

        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Book List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN Number</th>
                  <th>Price</th>
                  <th>Language</th>
                  <th>Genre</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">Books Available</td>
                  </tr>
                ) : (
                  this.state.books.map((book) => (
                    <tr key={book.id}>
                      <td>
                        <Image
                          src={book.coverPhotoURL}
                          roundedCircle
                          width="25"
                          height="25"
                        />
                        {book.title}
                      </td>
                      <td>{book.author}</td>
                      <td>{book.isbnNumber}</td>
                      <td>{book.price}</td>
                      <td>{book.language}</td>
                      <td>{book.genre}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={"edit/" + book.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>
                          {""}

                          <Button
                            size=""
                            variant="outline-danger"
                            onClick={this.deleteBook.bind(this, book.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
