import { Container, Row, Col, Card } from "react-bootstrap";
import {
  CheckCircle,
  PeopleFill,
  CameraReels,
  StarFill,
} from "react-bootstrap-icons";

const Features = () => {
  return (
    <Container fluid className="py-5 bg-light text-center">
      <h2 className="mb-4 fw-bold">Key Features</h2>
      <Row className="justify-content-center">
        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="p-4 shadow-sm">
            <div className="mb-3 text-primary" style={{ fontSize: "3rem" }}>
              <CheckCircle />
            </div>
            <h5 className="fw-bold">Seamless Project Applications</h5>
            <p className="text-muted">
              Effortlessly apply to various projects, ensuring an easy and
              streamlined experience to connect with creative opportunities.
            </p>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="p-4 shadow-sm">
            <div className="mb-3 text-primary" style={{ fontSize: "3rem" }}>
              <PeopleFill />
            </div>
            <h5 className="fw-bold">Build Your Network</h5>
            <p className="text-muted">
              Collaborate with talented filmmakers, artists, and industry
              professionals, expanding your network to achieve greater success.
            </p>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="p-4 shadow-sm">
            <div className="mb-3 text-primary" style={{ fontSize: "3rem" }}>
              <CameraReels />
            </div>
            <h5 className="fw-bold">Showcase Your Portfolio</h5>
            <p className="text-muted">
              Display your creative work and let potential collaborators find
              you easily by showcasing your talents.
            </p>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Card className="p-4 shadow-sm">
            <div className="mb-3 text-primary" style={{ fontSize: "3rem" }}>
              <StarFill />
            </div>
            <h5 className="fw-bold">Achieve Recognition</h5>
            <p className="text-muted">
              Earn a reputation in the industry and receive feedback to
              continually grow your skill set and increase your visibility.
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Features;
