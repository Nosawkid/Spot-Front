import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Row, Col, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const MakerHome = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.id}`
        );
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [user.id]); // Ensure useEffect runs when user.id changes

  if (!userData) {
    return <p>Loading...</p>; // Prevents rendering before data is loaded
  }

  return (
    <Container className="mt-4">
      {/* Profile Section */}
      <Card className="mb-4 p-3">
        <Row className="align-items-center">
          <SearchBar />
          <Col md={3} className="text-center">
            <Image
              src={userData.profilePicture || "/default-profile.png"}
              alt="Profile"
              roundedCircle
              fluid
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          </Col>
          <Col md={9}>
            <h2>{userData.username}</h2>
            <p>
              <strong>Profession:</strong> {userData.role || "Not specified"}
            </p>
            <p>
              <strong>Bio:</strong> {userData.bio || "No bio available."}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {userData.rating || "No ratings yet"}
            </p>
          </Col>
        </Row>
      </Card>

      {/* Experience Section */}
      <h3>Experience</h3>
      <Row>
        {userData.experience && userData.experience.length > 0 ? (
          userData.experience.map((exp, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{exp.expTitle}</Card.Title>
                  <Card.Text>{exp.expDesc}</Card.Text>
                  {exp.expLink && (
                    <a
                      href={exp.expLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View More
                    </a>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No experience added yet.</p>
        )}
      </Row>
      <Link to="/filmmaker/add-experience">Add Experience</Link>
    </Container>
  );
};

export default MakerHome;
