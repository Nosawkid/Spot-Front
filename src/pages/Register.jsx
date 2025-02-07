import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUpload,
  FaBriefcase,
  FaInfoCircle,
} from "react-icons/fa";
import commonServices from "../services/user";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    profession: "",
    age: 0,
    gender: "",
  });
  const [professions, setProfessions] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (name === "age") {
      setFormData({
        ...formData,
        [name]: Number(value), // Ensure age is stored as a number
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("role", formData.role);
    formDataToSend.append("profession", formData.profession);
    formDataToSend.append("profilePicture", formData.profilePicture);
    formDataToSend.append("age", formData.age); // Add age
    formDataToSend.append("gender", formData.gender); // Add gender

    try {
      await commonServices.registerUser(formDataToSend);
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "",
        profession: "",
        profilePicture: null,
        age: 0,
        gender: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const data = await commonServices.getProfessions();
        setProfessions(data);
      } catch (error) {
        console.error("Error fetching professions:", error);
      }
    };

    fetchProfessions();
  }, []);

  return (
    <Container className="d-flex  justify-content-center align-items-center min-vh-100 bg-light">
      <Card
        className="p-4 shadow-lg"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <Card.Body className="text-center">
          {/* Avatar */}
          <div className="d-flex justify-content-center mb-3">
            <div
              className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
              style={{ width: "80px", height: "80px" }}
            >
              <FaUser size={40} className="text-white" />
            </div>
          </div>
          {/* Title */}
          <Card.Title as="h4" className="mb-3">
            Create an Account
          </Card.Title>
          {/* Registration Form */}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="username">
                  <Form.Label>
                    <FaUser className="text-black me-2" /> Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="email">
                  <Form.Label>
                    <FaEnvelope className="text-black me-2" /> Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="password">
                  <Form.Label>
                    <FaLock className="text-black me-2" /> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="role">
                  <Form.Label>
                    <FaUser className="text-black me-2" /> Role
                  </Form.Label>
                  <Form.Select onChange={handleChange} name="role">
                    <option value="">Choose your role</option>
                    <option value="artist">Artist</option>
                    <option value="filmmaker">Filmmaker</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <Form.Select name="gender" onChange={handleChange}>
                    <option value="">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="bio">
                  <Form.Label>
                    <FaInfoCircle className="text-black me-2" /> Bio
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Tell us about yourself"
                    onChange={handleChange}
                    name="bio"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="profession">
                  <Form.Label>
                    <FaBriefcase className="text-black me-2" /> Profession
                  </Form.Label>
                  <Form.Select
                    onChange={handleChange}
                    aria-label="Default select example"
                    name="profession"
                    required
                  >
                    <option value="">Select a profession</option>{" "}
                    {/* Default placeholder */}
                    {professions.map((data) => (
                      <option key={data._id} value={data._id}>
                        {data.professionTitle}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="profilePicture">
                  <Form.Label>
                    <FaUpload className="text-black me-2" /> Upload Profile
                    Picture
                  </Form.Label>
                  <Form.Control
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12}>
                <Button variant="primary" type="submit" className="w-100 py-2">
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
