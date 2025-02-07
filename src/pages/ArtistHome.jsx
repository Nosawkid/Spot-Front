import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const ArtistHome = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/filmmaker/project-ongoing"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Discover Projects</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {projects.map((project) => (
            <Col key={project.id}>
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={project.projectImg || "https://via.placeholder.com/300"}
                  alt={project.projectTitle}
                />
                <Card.Body>
                  <Card.Title>{project.projectTitle}</Card.Title>
                  <Card.Text>{project.projectDesc}</Card.Text>
                  <Card.Text>
                    Posted By: <strong>Dan Shiju</strong>{" "}
                  </Card.Text>
                </Card.Body>
                <Button
                  as={Link}
                  to={"/artist/single/" + project.id}
                  className="btn-secondary"
                >
                  Learn more
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ArtistHome;
