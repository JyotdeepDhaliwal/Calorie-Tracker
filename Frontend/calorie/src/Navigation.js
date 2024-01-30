// Navigation.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap'; // React bootstrap for navigation bar
import { LinkContainer } from 'react-router-bootstrap'; // LinkContainer for integrating React Router with React Bootstrap
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigating between routes
import { useAuth } from './AuthContext'; // Importing the useAuth hook for authentication context

function Navigation() {
    const { setIsLoggedIn } = useAuth(); // Using the authentication context
    const navigate = useNavigate(); // Hook to navigate between routes

    // Function to handle user logout
    const handleLogout = () => {
        setIsLoggedIn(false); // Updates the login status to false
        navigate('/'); // Takes the user to the login page after logout
    };

    // Navigation bar
    return (
        <Navbar bg="primary" variant="dark" expand="lg"> {/* Using Bootstrap styling */}
            <Container>
                <i className="pi pi-spin pi-cog" style={{ fontSize: '2rem' }}></i> {/* Icon for the navbar from prime react */}
                <Navbar.Brand href="#home">Calorie Snap</Navbar.Brand> {/* App name */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/home">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/all-your-calories">
                            <Nav.Link>All Your Calories</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/information">
                            <Nav.Link>Information</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link> {/* Logouts out th euser and takes them back to login page */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
