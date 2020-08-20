import React, { Component } from "react";
import "./Style.css";
import results from "./results";
import {
  Card,
  Table,
  InputGroup,
  FormControl,
  Button,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

export default class UserList extends Component {
  state = {
    users: [],
    currentPage: 1,
    usersPerPage: 8,
  };

  componentDidMount() {
    this.findAllRandomUser();
  }
  findAllRandomUser() {
    results.get("/users.json").then((response) => {
      console.log(response.data);
      const fetchedResults = [];
      for (let key in response.data) {
        fetchedResults.push({
          ...response.data[key],
          id: key,
        });
      }
      this.setState({ users: fetchedResults });
    });
  }
  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };
  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };
  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.users.length / this.state.usersPerPage
        ),
      });
    }
  };
  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.users.length / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const { users, currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = users.length / usersPerPage;

    return (
      <div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faUsers} /> User List
          </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Address</td>
                  <td>Created</td>
                  <td>Balance</td>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6">No Users Available</td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <Image
                          src={user.picture.medium}
                          roundedCircle
                          width="25"
                          height="25"
                        />{" "}
                        {currentPage * usersPerPage + index - usersPerPage + 1}{" "}
                        -{" "}
                        {user.name.first[0].toUpperCase() +
                          user.name.first.slice(1)}{" "}
                        {user.name.last.toUpperCase()}
                      </td>
                      <td>{user.email}</td>
                      <td>
                        {user.location.city[0].toUpperCase() +
                          user.location.city.slice(1)}
                      </td>
                      <td>{user.registered.date.slice(0, 10)}</td>
                      <td>${user.dob.age}Million</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <div style={{ float: "left" }}>
              Showing Page {currentPage} of {Math.ceil(totalPages)}
            </div>
            <div style={{ float: "right" }}>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <Button
                    type="button"
                    variant="outline-info"
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.firstPage}
                  >
                    <FontAwesomeIcon icon={faFastBackward} /> First
                  </Button>
                  <Button
                    type="button"
                    variant="outline-info"
                    disabled={currentPage === 1 ? true : false}
                    onClick={this.prevPage}
                  >
                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                  </Button>
                </InputGroup.Prepend>
                <FormControl
                  className={"page-num bg-dark"}
                  name="currentPage"
                  value={currentPage}
                  onChange={this.changePage}
                />
                <InputGroup.Append>
                  <Button
                    type="button"
                    variant="outline-info"
                    disabled={
                      currentPage === Math.ceil(totalPages) ? true : false
                    }
                    onClick={this.nextPage}
                  >
                    <FontAwesomeIcon icon={faStepForward} /> Next
                  </Button>
                  <Button
                    type="button"
                    variant="outline-info"
                    disabled={
                      currentPage === Math.ceil(totalPages) ? true : false
                    }
                    onClick={this.lastPage}
                  >
                    <FontAwesomeIcon icon={faFastForward} /> Last
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Card.Footer>
        </Card>
      </div>
    );
  }
}
