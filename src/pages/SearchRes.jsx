import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const SearchRes = () => {
  const [users, setUsers] = useState([]);
  const { title } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/filmmaker/search/" + title
        ); // Fetch users from API
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">User List</h2>
      <Row>
        {users.map((user) => (
          <Col key={user._id} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {user.profession.professionTitle}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Age:</strong> {user.age} <br />
                  <strong>Gender:</strong> {user.gender} <br />
                  <strong>Bio:</strong> {user.bio}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchRes;
