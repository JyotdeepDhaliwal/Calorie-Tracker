// App.js
import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Components for routing
import { AuthProvider, useAuth } from './AuthContext'; // AuthProvider for context and useAuth for authentication state
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import AllYourCalories from './AllYourCalories';
import Information from './Information';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling

// AppWrapper component that wraps the App component with AuthProvider
function AppWrapper() {
  return (
    <AuthProvider> {/* It will provide authentication context to the App*/}
      <App />
    </AuthProvider>
  );
}


function App() {
  const { isLoggedIn } = useAuth(); // Using useAuth hook to check if the user is logged in

  return (
    <Router> {/* Using Router to handle navigation */}
      {isLoggedIn && <Navigation />} {/* Rendering Navigation if logged in */}
      <Routes> {/* Routes for different components */}
        <Route path="/" element={<Login />} /> {/* For Login */}
        <Route path="/register" element={<Register />} /> {/* For Register */}
        <Route path="/home" element={<HomePage />} /> {/* Fo Home Page */}
        <Route path="/all-your-calories" element={<AllYourCalories />} /> {/* For All User Calories */}
        <Route path="/information" element={<Information />} /> {/* For more Information */}
      </Routes>
    </Router>
  );
}

// Exporting AppWrapper as the default export
export default AppWrapper;
