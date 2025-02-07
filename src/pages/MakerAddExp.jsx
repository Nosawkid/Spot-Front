import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MakerAddExp = () => {
  const navigate = useNavigate();
  const [expTitle, setExpTitle] = useState("");
  const [expDesc, setExpDesc] = useState("");
  const [expLink, setExpLink] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expTitle || !expDesc) {
      alert("Title and Description are required!");
      return;
    }

    const newExperience = { expTitle, expDesc, expLink };

    try {
      const response = await axios.put(
        `/api/filmmaker/add-exp/${user.id}`,
        newExperience
      );

      dispatch({ type: "UPDATE_USER", payload: response.data });

      setExpTitle("");
      setExpDesc("");
      setExpLink("");
      navigate("/filmmaker/home");
    } catch (error) {
      console.error("Error adding experience", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3>Add Experience</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Experience Title</Form.Label>
          <Form.Control
            type="text"
            value={expTitle}
            onChange={(e) => setExpTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={expDesc}
            onChange={(e) => setExpDesc(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Project Link (Optional)</Form.Label>
          <Form.Control
            type="text"
            value={expLink}
            onChange={(e) => setExpLink(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Experience
        </Button>
      </Form>
    </Container>
  );
};

export default MakerAddExp;
