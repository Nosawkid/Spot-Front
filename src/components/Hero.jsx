import { Button, Container, Row, Col } from "react-bootstrap";

const Hero = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center text-center py-5"
      style={{ minHeight: "80vh", backgroundColor: "#f7f7f7" }}
    >
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#000" }}>
            SpotLightHub - Your Cast, Your Crew, Your Vision!
          </h1>
          <p
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "#333",
              marginBottom: "2rem",
            }}
          >
            Connect with talented performers and production professionals in one
            unified platform. From seasoned actors and cinematographers to
            skilled production designers and sound engineers, find the perfect
            team members for your next project. Build your dream team and bring
            your creative projects to life with our innovative matching system
            and portfolio showcase features.
          </p>
          <Button variant="dark" className="me-3">
            Get Started
          </Button>
          <Button variant="outline-dark">Learn More</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
