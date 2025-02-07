import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Modal,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeUser } from "../reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const ArtistNav = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const logout = () => {
    dispatch(removeUser);
    nav("/");
  };
  const startCamera = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      const constraints = {
        video:
          videoDevices.length > 0
            ? { deviceId: videoDevices[0].deviceId }
            : true,
      };
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    if (canvas && video) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/png"));
      stopCamera();
    }
  };

  const openVerifyModal = () => {
    setCapturedImage(null); // Reset previous image
    setShowVerifyModal(true);
    startCamera();
  };

  const closeVerifyModal = () => {
    stopCamera();
    setShowVerifyModal(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">spotlighthub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/artist/profile"}>
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to={"/artist/project"}>
                My Projects
              </Nav.Link>
              <Nav.Link onClick={openVerifyModal}>Verify Now</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
            <Button onClick={logout} variant="danger" className="ms-3">
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Verification Modal */}
      <Modal show={showVerifyModal} onHide={closeVerifyModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Identity Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="text-center p-3">
            {!capturedImage ? (
              <>
                <video ref={videoRef} autoPlay className="rounded w-100" />
                <Button
                  onClick={captureImage}
                  variant="primary"
                  className="mt-3"
                >
                  Capture
                </Button>
              </>
            ) : (
              <>
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="rounded w-100"
                />
                <Button
                  onClick={openVerifyModal}
                  variant="warning"
                  className="mt-3"
                >
                  Retake
                </Button>
              </>
            )}
          </Card>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ArtistNav;
