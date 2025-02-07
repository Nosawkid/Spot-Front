import { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Badge,
  Form,
  Button,
} from "react-bootstrap";

const UserProfile = () => {
  const user = {
    username: "John Doe",
    email: "johndoe@example.com",
    role: "artist",
    profilePicture:
      "https://res.cloudinary.com/dcpn8iz9s/image/upload/v1738885794/projects/eztdfdn2axnweshlomoy.png",
    bio: "Passionate artist with 5 years of experience in digital painting and concept art.",
    rating: 4.5,
    experience: [
      {
        expTitle: "Lead Concept Artist",
        expDesc: "Worked on AAA game projects for a major studio.",
        expLink: "https://portfolio.com/project1",
      },
      {
        expTitle: "Freelance Illustrator",
        expDesc: "Created artwork for various clients worldwide.",
        expLink: "https://portfolio.com/project2",
      },
    ],
    workHistory: [
      "Project Alpha - Character Designer",
      "Project Beta - Background Artist",
    ],
  };

  const [reviews, setReviews] = useState([
    { name: "Alice", rating: 5, comment: "Amazing artist!" },
    { name: "Bob", rating: 4, comment: "Very creative work." },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="rounded-circle"
              width="150"
              height="150"
            />
          </Col>
          <Col md={8}>
            <h3>{user.username}</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <Badge bg="info" className="text-uppercase">
                {user.role}
              </Badge>
            </p>
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {user.rating}/5
            </p>
          </Col>
        </Row>

        <hr />

        <h4>Experience</h4>
        <ListGroup>
          {user.experience.map((exp, index) => (
            <ListGroup.Item key={index}>
              <strong>{exp.expTitle}</strong> - {exp.expDesc}{" "}
              {exp.expLink && (
                <a href={exp.expLink} target="_blank" rel="noopener noreferrer">
                  (View)
                </a>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <hr />

        <h4>Work History</h4>
        <ListGroup>
          {user.workHistory.map((work, index) => (
            <ListGroup.Item key={index}>{work}</ListGroup.Item>
          ))}
        </ListGroup>

        <hr />

        {/* Review System */}
        <h4>Reviews</h4>
        <ListGroup>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ListGroup.Item key={index}>
                <strong>{review.name}</strong> - ⭐ {review.rating}/5
                <br />
                {review.comment}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No reviews yet.</ListGroup.Item>
          )}
        </ListGroup>

        <hr />

        {/* Review Form */}
        <h4>Leave a Review</h4>
        <Form onSubmit={handleReviewSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: Number(e.target.value) })
              }
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit Review
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default UserProfile;
