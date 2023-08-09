import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";

const ProfileComponent = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({ t1: "", t2: "", t3: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("YOUR_SPRING_BOOT_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        console.log("Data submitted successfully!");
      } else {
        // Handle error
        console.error("Error submitting data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <Container className="mb-5">
        <Row className="align-items-center profile-header mb-5 text-center text-md-left">
          <Col md={2}>
            <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </Col>
          <Col md>
            <h2>{user.name}</h2>
            <p className="lead text-muted">{user.email}</p>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="t1">Text 1</Label>
                <Input
                    type="text"
                    name="t1"
                    id="t1"
                    value={formData.t1}
                    onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="t2">Text 2</Label>
                <Input
                    type="text"
                    name="t2"
                    id="t2"
                    value={formData.t2}
                    onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="t3">Text 3</Label>
                <Input
                    type="text"
                    name="t3"
                    id="t3"
                    value={formData.t3}
                    onChange={handleInputChange}
                />
              </FormGroup>
              <Button type="submit" color="primary">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
