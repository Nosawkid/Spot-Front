import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Nav, Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("ongoing");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const ongoingRes = await axios.get(
          "http://localhost:5000/api/filmmaker/project-ongoing/" + user.id
        );
        const completedRes = await axios.get(
          "http://localhost:5000/api/filmmaker/project-complete/" + user.id
        );

        setOngoingProjects(ongoingRes.data);
        setCompletedProjects(completedRes.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const finishProject = async (id) => {
    const res = await axios.put(
      "http://localhost:5000/api/filmmaker/finish-project/" + id
    );
    navigate("/filmmaker/view");
  };

  const displayedProjects =
    activeTab === "ongoing" ? ongoingProjects : completedProjects;

  return (
    <Container className="mt-4">
      {/* Navigation */}
      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "ongoing"}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing Projects
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
          >
            Completed Projects
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Row>
        {displayedProjects.length > 0 ? (
          displayedProjects.map((project) => (
            <Col md={6} key={project.id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{project.projectTitle}</Card.Title>
                  <Card.Text>{project.projectDesc}</Card.Text>
                  <Badge bg={activeTab === "completed" ? "success" : "warning"}>
                    {activeTab === "completed" ? "Completed" : "Ongoing"}
                  </Badge>
                  {project.projectStatus === 0 && (
                    <Button
                      onClick={() => finishProject(project.id)}
                      className="d-block mt-2"
                      variant="danger"
                    >
                      Mark as finish
                    </Button>
                  )}

                  <Link to={`/filmmaker/applications/${project.id}`}>
                    View Applications
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No {activeTab} projects available.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProjectsPage;
