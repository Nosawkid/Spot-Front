import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="px-3">
      <Container>
        <Navbar.Brand as={Link} to={"/"} style={{ fontWeight: "700" }}>
          SpotLightHub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#faq">FAQ &#39; s</Nav.Link>
          </Nav>
          <Button as={Link} to={"/register"} variant="dark" className="ms-3">
            Sign Up
          </Button>
          <Button
            as={Link}
            to={"/login"}
            variant="outline-dark"
            className="ms-2"
          >
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
