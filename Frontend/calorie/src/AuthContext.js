// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Context for authentication
const AuthContext = createContext(null);

// AuthProvider component that provides authentication context to its children
export const AuthProvider = ({ children }) => {
  
// Hook for tracking the login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

// Providing the isLoggedIn state and setIsLoggedIn function to children components
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children} {/* Rendering the child components */}
    </AuthContext.Provider>
  );
};

// Hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

