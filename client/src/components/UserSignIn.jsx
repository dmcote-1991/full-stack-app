import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth";

const UserSignIn = () => {
  // Destructure signIn from the authentication context
  const { signIn } = useAuth();
  // Local state for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign in the user
      const user = await signIn({ emailAddress: email, password });
      if (user) {
        // Navigate to the redirect location if available, otherwise home
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo);
      } else {
        // Set error message if sign-in failed
        setError("Sign-in failed. Please try again");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      navigate("/error"); // Navigate to error page on exception
    }
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {/* Display error message if there is one */}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </form>
        <p>
          Don&apos;t have a user account? Click here to{" "}
          <Link to="/signup">sign up</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
