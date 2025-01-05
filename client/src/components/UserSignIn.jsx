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
    <main role="main">
      <div className="form--centered">
        <h2>Sign In</h2>
        {/* Display error message if there is one */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="error"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">
            Email Address
            <span className="visually-hidden"> (required)</span>
          </label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="sr-only">
            Enter your email address.
          </small>

          <label htmlFor="password">
            Password
            <span className="visually-hidden"> (required)</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            aria-describedby="passwordHelp"
          />
          <small id="passwordHelp" className="sr-only">
            Enter your password.
          </small>

          <br />

          <button className="button" type="submit">
            Sign In
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            aria-label="Cancel and return to homepage"
          >
            Cancel
          </button>
        </form>
        <p>
          Don&apos;t have a user account? Click here to{" "}
          <Link to="/signup" aria-label="Sign up for a new user account">
            sign up
          </Link>
          !
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
