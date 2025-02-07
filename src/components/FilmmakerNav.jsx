import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../reducers/userReducer";

const FilmmakerNav = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    dispatch(removeUser);
    nav("/");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">SpotLightHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/filmmaker/create"}>
              Create Project
            </Nav.Link>
            <Nav.Link as={Link} to="/filmmaker/view">
              View Projects
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="me-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Button onClick={logout} variant="danger" className="ms-3">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FilmmakerNav;
