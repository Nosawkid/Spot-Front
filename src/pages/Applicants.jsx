import { useEffect, useState } from "react";
import { Table, Container, Spinner, Badge, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Applicants = () => {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`/api/filmmaker/application/${id}`);
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const chat = async (aid) => {
    const res = await axios.post("http://localhost:5000/api/chat", {
      makerId: user.id,
      artistId: aid,
    });
    navigate("/filmmaker/chat/" + res.data._id);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return <Badge bg="warning">Pending</Badge>;
      case 1:
        return <Badge bg="success">Accepted</Badge>;
      case 2:
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Applicants</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={app.userId.profilePicture}
                    alt="Profile"
                    width="30"
                    height="30"
                    className="rounded-circle me-2"
                  />
                  {app.userId.username || "Unknown"}
                </td>
                <td>{app.userId && app.userId.email}</td>
                <td>{getStatusBadge(app.applicationStatus)}</td>
                <td className="d-flex gap-1">
                  <Button variant="success">Accept</Button>
                  <Button variant="danger">Reject</Button>
                  <Button
                    as={Link}
                    to={"/filmmaker/user/" + app.userId.id}
                    variant="danger"
                  >
                    View Profile
                  </Button>
                  <Button onClick={() => chat(app.userId.id)} variant="primary">
                    Send Message
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Applicants;
