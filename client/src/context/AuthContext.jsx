import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = async (credentials) => {
    try {
      const { emailAddress, password } = credentials;
      const authToken = btoa(`${emailAddress}:${password}`);
      const response = await fetch("http://localhost:5000/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify({ ...data, emailAddress }));
        setUser({ ...data, emailAddress, password });
        return data;
      } else {
        throw new Error("Sign-in failed");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      return null;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  useEffect(() => {
    console.log("AuthContext user state changed:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
