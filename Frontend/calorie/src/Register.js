//Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Link for navigation, (useNavigate) for navigating
import './auth.css';

function Register() {
  // Hooks for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook to navigate between routes

  // Function to handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setError(''); // Resets any existing error messages

    try {
      // Sending a POST request to the server with password and username 
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Registered successfully'); // Alerting the user that they are now registered
        navigate('/'); // Takes them to the login page after registration
        console.log("Registered!!!")
      } else {
        setError('Registration failed, username might be taken :('); //  Error message on registration failure
      }
    } catch (error) {
      setError('An error occurred. Please try again later '); // Error message on exception
    }
  };

  // Registration form
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Displaying any error messages in red */}
        <form onSubmit={handleRegister}>
          {/* Form is for username and password */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Register</button> {/* Submit button for the form */}
        </form>
        <p>
          <center>
            Already have an account? <Link to="/">Login</Link> {/* Link to the login page, but it takes them to the login page once they register on it's own*/}
          </center>
        </p>
      </div>
    </div>
  );
}

export default Register;
