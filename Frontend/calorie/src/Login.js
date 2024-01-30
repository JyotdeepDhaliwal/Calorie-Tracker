//login.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap'; // React Bootstrap for styling
import { Link, useNavigate } from 'react-router-dom'; // Link for navigation, (useNavigate) for navigating
import { useAuth } from './AuthContext'; // It a custom hook for authentication
import './auth.css';

function Login() {
  // Hooks for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook to navigate between routes
  const { setIsLoggedIn } = useAuth(); // Using authentication

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setError(''); // Resets any existing error messages

    try {
      // Sending PSOT request to the server with username and password
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true); // If login is successful, sets the login state to true
        navigate('/home'); // Goes to the home page
        console.log("Logined In!!")
      } else {
        setError('Login failed :('); // Error message if login fails
      }
    } catch (err) {
      setError('An error occurred. Please try again later.'); // Error message
    }
  };

  // The login form
  return (
    <div className="auth-container">
      <Container className="auth-form">
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>} {/* Displaying any error messages */}
        <Form onSubmit={handleLogin}>
          {/*  For username and password */}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit"> {/* Submit button for form */}
            Login
          </Button>
        </Form>
        <div className="mt-3">
          <center>
            Don't have an account? <Link to="/register">Register</Link> {/* Link to register page if they don't have account*/}
          </center>
        </div>
      </Container>
    </div>
  );
}

export default Login;
