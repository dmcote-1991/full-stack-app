import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

// Create the AuthContext with default value of undefined
const AuthContext = createContext();

// Provider component that will wrap the application
export const AuthProvider = ({ children }) => {
  // Initialize state with user data from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Handles user sign-in
  const signIn = async (credentials) => {
    try {
      const { emailAddress, password } = credentials;
      // Encode credentials for Basic Auth
      const authToken = btoa(`${emailAddress}:${password}`);
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authToken}`, // Attach auth token to headers
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Store user data and credentials in localStorage
        // (password is stored for learning purposes only and should not be stored in production environments)
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data, emailAddress, password })
        );
        // Update user state with the fetched data
        setUser({ ...data, emailAddress, password });
        return data;
      } else {
        throw new Error("Sign-in failed");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      return null; // Return null on failure
    }
  };

  // Handles user sign-out
  const signOut = async () => {
    try {
      // Removes user data from localStorage
      localStorage.removeItem("user");
      // Reset user state to null
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  // Effect to log changes in user state
  useEffect(() => {
    console.log("AuthContext user state changed:", user);
  }, [user]);

  // Provide user and auth functions to the component tree
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define prop types for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
