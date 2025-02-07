import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Badge,
  CloseButton,
} from "react-bootstrap";
import axios from "axios";
import commonServices from "../services/user";
import { useSelector } from "react-redux";

const ProjectForm = () => {
  const user = useSelector((state) => state.user);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [projectImg, setProjectImg] = useState(null);
  const [message, setMessage] = useState("");
  const [professions, setProfessions] = useState([]);

  // New state variables
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(100);
  const [experience, setExperience] = useState("");

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const data = await commonServices.getProfessions();
        setProfessions(data);
      } catch (error) {
        console.error("Error fetching professions:", error);
      }
    };

    fetchProfessions();
  }, []);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const selectedProfession = professions.find((p) => p._id === selectedId);

    if (
      selectedProfession &&
      !selectedProfessions.some((p) => p.id === selectedId)
    ) {
      setSelectedProfessions([
        ...selectedProfessions,
        { id: selectedId, title: selectedProfession.professionTitle },
      ]);
    }
  };

  const handleRemoveProfession = (id) => {
    setSelectedProfessions(selectedProfessions.filter((p) => p.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectTitle || !projectDesc || !gender || !experience) {
      setMessage("Please fill all the required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("projectTitle", projectTitle);
    formData.append("projectDesc", projectDesc);
    formData.append("postedBy", user.id);
    selectedProfessions.forEach((p) => {
      formData.append("professions[]", p.id);
    });

    // New fields added to formData
    formData.append("gender", gender);
    formData.append("minAgeRequirement", minAge);
    formData.append("maxAgeRequirement", maxAge);
    formData.append("experience", experience);

    if (projectImg) {
      formData.append("projectImg", projectImg);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/filmmaker/project",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(res.data.message);
      setProjectTitle("");
      setProjectDesc("");
      setSelectedProfessions([]);
      setProjectImg(null);
      setGender("");
      setMinAge(0);
      setMaxAge(0);
      setExperience("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Card
        style={{
          width: "500px",
          padding: "30px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Create Project</h2>
          {message && <p className="text-danger text-center">{message}</p>}

          <Form onSubmit={handleSubmit}>
            {/* Project Title */}
            <Form.Group className="mb-3">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                required
              />
            </Form.Group>

            {/* Project Description */}
            <Form.Group className="mb-3">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                required
              />
            </Form.Group>

            {/* Selected Professions Display */}
            <Form.Group className="mb-3">
              <Form.Label>Selected Professions</Form.Label>
              <div>
                {selectedProfessions.map((profession) => (
                  <Badge
                    key={profession.id}
                    bg="primary"
                    className="me-2 p-2 d-inline-flex align-items-center"
                  >
                    {profession.title}
                    <CloseButton
                      className="ms-2"
                      onClick={() => handleRemoveProfession(profession.id)}
                    />
                  </Badge>
                ))}
              </div>
            </Form.Group>

            {/* Profession Select */}
            <Form.Group className="mb-3">
              <Form.Label>Select Professions</Form.Label>
              <Form.Select onChange={handleSelectChange} defaultValue="">
                <option value="" disabled>
                  Choose a profession...
                </option>
                {professions.map((profession) => (
                  <option key={profession._id} value={profession._id}>
                    {profession.professionTitle}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Gender Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Male"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Female"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </Form.Group>

            {/* Age Range */}
            <Form.Group className="mb-3">
              <Form.Label>Age Range</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="number"
                  value={minAge}
                  min="18"
                  max="100"
                  onChange={(e) => setMinAge(Number(e.target.value))}
                  className="me-2"
                />
                <span>-</span>
                <Form.Control
                  type="number"
                  value={maxAge}
                  min="18"
                  max="100"
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                  className="ms-2"
                />
              </div>
            </Form.Group>

            {/* Experience Level */}
            <Form.Group className="mb-3">
              <Form.Label>Experience Level</Form.Label>
              <div>
                <Form.Select onChange={(e) => setExperience(e.target.value)}>
                  <option value={""}>Choose Experience level</option>
                  <option value={"beginner"}>Beginner</option>
                  <option value={"intermediate"}>Intermediate</option>
                  <option value={"advanced"}>Advanced</option>
                </Form.Select>
              </div>
            </Form.Group>

            {/* Project Image Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Project Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setProjectImg(e.target.files[0])}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100 py-2">
              Create Project
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProjectForm;
