import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (credentials) => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return data.user;
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
      await fetch("http://localhost:5000/api/signout", { method: "POST" });
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
