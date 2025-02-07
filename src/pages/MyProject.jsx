import React from "react";
import { Container, Row, Col, Card, ListGroup, Badge } from "react-bootstrap";

const MyProject = () => {
  const selectedJobs = [
    { title: "Frontend Developer", company: "TechCorp" },
    { title: "Backend Engineer", company: "CodeWorks" },
  ];

  const rejectedJobs = [
    { title: "Data Analyst", company: "DataSolutions" },
    { title: "UI/UX Designer", company: "CreativeHub" },
  ];

  return (
    <Container className="mt-4">
      <Row>
        {/* Selected Jobs */}
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Header className="bg-success text-white text-center">
              <h4>Selected Jobs</h4>
            </Card.Header>
            <ListGroup variant="flush">
              {selectedJobs.map((job, index) => (
                <ListGroup.Item key={index}>
                  <h5>
                    {job.title} <Badge bg="success">Selected</Badge>
                  </h5>
                  <p>{job.company}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Rejected Jobs */}
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Header className="bg-danger text-white text-center">
              <h4>Rejected Jobs</h4>
            </Card.Header>
            <ListGroup variant="flush">
              {rejectedJobs.map((job, index) => (
                <ListGroup.Item key={index}>
                  <h5>
                    {job.title} <Badge bg="danger">Rejected</Badge>
                  </h5>
                  <p>{job.company}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProject;
