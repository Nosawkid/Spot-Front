import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserRecommendations = () => {
  const [users, setUsers] = useState([]);

  const projectId = useParams();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/filmmaker/recommendations/${projectId}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [projectId]);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Recommended Users</h3>
      <Row>
        {users.length > 0 ? (
          users.map((user) => (
            <Col md={4} key={user.id}>
              <Card className="mb-3 shadow">
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>
                    <strong>Profession:</strong>{" "}
                    {user.profession?.professionTitle || "N/A"}
                    <br />
                    <strong>Age:</strong> {user.age}
                    <br />
                    <strong>Gender:</strong> {user.gender}
                  </Card.Text>
                  <Button variant="primary">Message</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No recommendations available</p>
        )}
      </Row>
    </Container>
  );
};

export default UserRecommendations;
