import { Accordion, Container, Row, Col } from "react-bootstrap";

const FAQ = () => {
  return (
    <Container className="py-5 d-flex justify-content-center">
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }} className="text-center">
          <h2 className="mb-4 fw-bold">Frequently Asked Questions</h2>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is SpotLightHub?</Accordion.Header>
              <Accordion.Body>
                SpotLightHub is a platform designed to showcase talent and
                connect individuals with opportunities in their respective
                fields.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How do I get started?</Accordion.Header>
              <Accordion.Body>
                You can sign up for an account, create a profile, and start
                exploring features tailored to your needs.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Is SpotLightHub free to use?</Accordion.Header>
              <Accordion.Body>
                Yes, the basic features of SpotLightHub are free. However, we
                offer premium plans for additional benefits.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>How can I contact support?</Accordion.Header>
              <Accordion.Body>
                You can reach out to our support team through the Contact Us
                page or email us at support@spotlighthub.com.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default FAQ;
