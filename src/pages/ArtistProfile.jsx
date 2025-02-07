import { Card, Container, Row, Col, ListGroup, Badge } from "react-bootstrap";

const ArtistProfile = () => {
  // Static artist data
  const artist = {
    username: "John Doe",
    email: "johndoe@example.com",
    role: "Artist",
    profilePicture:
      "https://res.cloudinary.com/dcpn8iz9s/image/upload/v1738885794/projects/eztdfdn2axnweshlomoy.png",
    bio: "Passionate artist with 5+ years of experience in digital painting and concept art.",
    rating: 4.7,
    experience: [
      {
        title: "Lead Concept Artist",
        description: "Worked on AAA game projects for a major studio.",
        link: "https://portfolio.com/project1",
      },
      {
        title: "Freelance Illustrator",
        description: "Created artwork for various clients worldwide.",
        link: "https://portfolio.com/project2",
      },
    ],
    workHistory: [
      "Project Alpha - Character Designer",
      "Project Beta - Background Artist",
    ],
    reviews: [
      {
        reviewer: "Emily Smith",
        comment: "Fantastic artist! Delivered top-quality work on time.",
        rating: 5,
      },
      {
        reviewer: "Michael Johnson",
        comment: "Very creative and professional. Highly recommended!",
        rating: 4.5,
      },
    ],
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3">
        <Row className="align-items-center">
          {/* Profile Picture */}
          <Col md={4} className="text-center">
            <img
              src={artist.profilePicture}
              alt="Profile"
              className="rounded-circle"
              width="150"
              height="150"
            />
          </Col>

          {/* Artist Details */}
          <Col md={8}>
            <h3>{artist.username}</h3>
            <p>
              <strong>Email:</strong> {artist.email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <Badge bg="info" className="text-uppercase">
                {artist.role}
              </Badge>
            </p>
            <p>
              <strong>Bio:</strong> {artist.bio}
            </p>
            <p>
              <strong>Rating:</strong> ⭐ {artist.rating}/5
            </p>
          </Col>
        </Row>

        <hr />

        {/* Experience Section */}
        <h4>Experience</h4>
        <ListGroup>
          {artist.experience.map((exp, index) => (
            <ListGroup.Item key={index}>
              <strong>{exp.title}</strong> - {exp.description}{" "}
              {exp.link && (
                <a href={exp.link} target="_blank" rel="noopener noreferrer">
                  (View)
                </a>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>

        <hr />

        {/* Work History Section */}
        <h4>Work History</h4>
        <ListGroup>
          {artist.workHistory.map((work, index) => (
            <ListGroup.Item key={index}>{work}</ListGroup.Item>
          ))}
        </ListGroup>

        <hr />

        {/* Reviews Section */}
        <h4>Reviews</h4>
        <ListGroup>
          {artist.reviews.map((review, index) => (
            <ListGroup.Item key={index}>
              <strong>{review.reviewer}:</strong> {review.comment}{" "}
              <Badge bg="warning">⭐ {review.rating}/5</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default ArtistProfile;
