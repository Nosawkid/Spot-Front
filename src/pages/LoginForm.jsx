import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import IMG from "../assets/bg.jpg";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";
import { loginUserAction } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { setToken } from "../reducers/tokenReducer";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUserAction(email, password));
    if (!res.token) {
      console.log("Error");
    } else {
      dispatch(setToken(res.token));
      window.localStorage.setItem("user", JSON.stringify(res));
      if (res.role === "filmmaker") {
        return navigate("/filmmaker/home");
      } else if (res.role === "artist") {
        return navigate("/artist/home");
      }
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#e8f0fe",
        backgroundImage: IMG,
      }}
    >
      <Card
        style={{
          width: "400px",
          padding: "30px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          {/* Title */}
          <h2 className="text-center mb-4">Welcome Back!</h2>

          {/* Form */}
          <Form onSubmit={handleSubmit}>
            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <EnvelopeFill />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <LockFill />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Form.Group>

            {/* Login Button */}
            <Button type="submit" variant="primary" className="w-100 py-2">
              Login
            </Button>
          </Form>

          {/* Sign Up Link */}
          <Row className="text-center mt-3">
            <Col>
              <small>
                Don&apos;t have an account? <a href="/register">Sign Up</a>
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginForm;
