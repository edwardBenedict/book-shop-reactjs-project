import React, { Component } from "react";
import results from "./results";
import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "./MyToast";

export default class Book extends Component {
  state = {
    author: this.initialState,
    coverPhotoURL: this.initialState,
    isbnNumber: this.initialState,
    language: this.initialState,
    price: this.initialState,
    title: this.initialState,
    genre: this.genre,
    show: false,
  };
  initialState = {
    id: "",
    author: "",
    coverPhotoURL: "",
    isbnNumber: "",
    language: "",
    price: "",
    title: "",
    genre: "",
  };

  componentDidMount() {
    const bookId = this.props.match.params.id;
    if (bookId) {
      this.findBookById(bookId);
    }
  }

  findBookById = (bookId) => {
    results
      .get("/books/" + bookId + ".json")
      .then((response) => {
        console.log(response);
        if (response.data != null) {
          this.setState({
            id: bookId,
            title: response.data.title,
            author: response.data.author,
            coverPhotoURL: response.data.coverPhotoURL,
            isbnNumber: response.data.isbnNumber,
            price: response.data.price,
            language: response.data.language,
            genre: response.data.genre,
          });
          console.log("id", this.state.id);
        }
      })
      .catch((error) => {
        console.error("Error - " + error);
      });
  };

  resetBook = () => {
    this.setState(() => this.initialState);
  };
  postDataHandler = (e) => {
    e.preventDefault();
    const Data = {
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      isbnNumber: this.state.isbnNumber,
      language: this.state.language,
      price: this.state.price,
      title: this.state.title,
      genre: this.state.genre,
    };

    results.post("/books.json", Data).then((response) => {
      console.log(response);
      if (response.data != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  updateBook = (event) => {
    event.preventDefault();
    const book = {
      id: this.state.id,
      author: this.state.author,
      coverPhotoURL: this.state.coverPhotoURL,
      isbnNumber: this.state.isbnNumber,
      language: this.state.language,
      price: this.state.price,
      title: this.state.title,
      genre: this.state.genre,
    };

    results.put("/books/" + this.state.id + ".json", book).then((response) => {
      console.log(response);
      if (response.data != null) {
        console.log(response);
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
        setTimeout(() => this.bookList(), 2000);
      } else {
        this.setState({ show: false });
      }
    });
    this.setState(this.initialState);
  };

  bookList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const {
      title,
      author,
      coverPhotoURL,
      isbnNumber,
      price,
      language,
      genre,
    } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Book Updated Succesfully."
                : "Book Saved Succesfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />
            {this.state.id ? "Update Book" : "Add New Book"}
          </Card.Header>
          <Form
            onReset={this.resetBook}
            onSubmit={this.state.id ? this.updateBook : this.postDataHandler}
            id="bookFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Title"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridAuthor">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="author"
                    value={author}
                    onChange={(e) => this.setState({ author: e.target.value })}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Author"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                  <Form.Label>Cover Photo URL</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="coverPhotoURL"
                    value={coverPhotoURL}
                    onChange={(e) =>
                      this.setState({ coverPhotoURL: e.target.value })
                    }
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Cover Photo URL"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridISBNNumber">
                  <Form.Label>ISBN Number</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="isbnNumber"
                    value={isbnNumber}
                    onChange={(e) =>
                      this.setState({ isbnNumber: e.target.value })
                    }
                    className={"bg-dark text-white"}
                    placeholder="Enter Book ISBN Number"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => this.setState({ price: e.target.value })}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Price"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLanguage">
                  <Form.Label>Language</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="language"
                    value={language}
                    onChange={(e) =>
                      this.setState({ language: e.target.value })
                    }
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Language"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridGenre">
                  <Form.Label>Genre</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    name="genre"
                    value={genre}
                    onChange={(e) => this.setState({ genre: e.target.value })}
                    className={"bg-dark text-white"}
                    placeholder="Enter Book Genre"
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} />
                Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={this.bookList.bind()}
              >
                <FontAwesomeIcon icon={faList} />
                Book List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
