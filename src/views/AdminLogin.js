import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
} from "reactstrap";

const AdminLogin = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submittedData, setSubmittedData] = useState(null); // Track submitted data

    const handleLogin = () => {
        // In a real application, you would call an API to authenticate the user.
        // For this example, we'll compare credentials with the mock backend.
        const users = require("./user.json"); // Import the mock user data

        const user = users.find(
            (user) =>
                user.username === username && user.password === password
        );
        if (user) {
            // Set user info in local storage or context for authentication
            // In a real application, you would handle authentication securely
            localStorage.setItem("adminUser", JSON.stringify(user));
            history.push("/admin");
        } else {
            setError("Invalid credentials");
            setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
        }

        // Store submitted data for display
        setSubmittedData({ username, password });
    };

    return (
        <Container className="text-center">
            <Row>
                <Col xs={12} sm={8} md={6} lg={4} className="mx-auto mt-5">
                    <h1>Admin Login</h1>
                    {error && <Alert color="danger">{error}</Alert>}
                    <Form>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;
