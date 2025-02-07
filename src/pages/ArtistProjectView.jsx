import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import { Container, Card, ListGroup, Spinner, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ArtistProjectView = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const applyNow = async (pid) => {
    await axios.post("http://localhost:5000/api/artist/application/" + pid, {
      userId: user.id,
    });
    navigate("/artist/home");
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/filmmaker/project/${id}`
        );
        setProject(response.data); // Axios auto-parses JSON, no need for .json()
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="text-center mt-5">Project not found</Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        {project.projectImg && (
          <Card.Img
            width={"500px"}
            height={"500px"}
            variant="top"
            src={project.projectImg}
            alt="Project"
            style={{ objectFit: "contain" }}
          />
        )}
        <Card.Body>
          <Card.Title>{project.projectTitle}</Card.Title>
          <Card.Text>{project.projectDesc}</Card.Text>

          <h5>Allowed Professions</h5>
          <ListGroup>
            {project.professions?.length > 0 ? (
              project.professions.map((profession, index) => (
                <ListGroup.Item key={index}>
                  {profession.professionTitle}
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No professions specified</ListGroup.Item>
            )}
          </ListGroup>
          <Button
            onClick={() => applyNow(project.id)}
            className="mt-3"
            variant="success"
          >
            Apply Now
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ArtistProjectView;
