import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row className="text-center text-md-start">
          {/* Logo & Description */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">SpotLightHub</h5>
            <p className="small">
              Connecting talent with opportunity. Showcase your skills and find
              the right platform to shine.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none small">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none small">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none small">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none small">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </Col>

          {/* Social Media */}
          <Col md={4}>
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="#" className="text-light fs-5">
                <FaFacebook />
              </a>
              <a href="#" className="text-light fs-5">
                <FaTwitter />
              </a>
              <a href="#" className="text-light fs-5">
                <FaInstagram />
              </a>
              <a href="#" className="text-light fs-5">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-4">
          <Col className="text-center small">
            © {new Date().getFullYear()} SpotLightHub. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
