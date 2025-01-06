import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import ValidationErrors from "./ValidationErrors";

const UserSignUp = () => {
  // Destructure signIn from the authentication context
  const { signIn } = useAuth();

  const navigate = useNavigate();

  // Local state for user inputs and errors
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new user object
    const newUser = {
      firstName,
      lastName,
      emailAddress: email,
      password,
    };

    try {
      // Send POST request to create new user
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      // Handle different response statuses
      if (response.status === 201) {
        // Attempt to sign in the newly created user
        const signInSuccess = await signIn({ emailAddress: email, password });
        if (signInSuccess) {
          navigate("/"); // Redirect to home if sign-in is successful
        } else {
          setErrors(["Failed to sign in after account creation."]);
          navigate("/error");
        }
      } else if (response.status === 400) {
        // Set validation errors if there are any
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else if (response.status === 500) {
        // Redirect to error page on server error
        navigate("/error");
      } else {
        throw new Error("Unexpected response"); // Handle unexpected responses
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setErrors(["Error signing up. Please try again."]);
      navigate("/error"); // Redirect on error
    }
  };

  return (
    <main role="main">
      <div className="form--centered">
        <h2>Sign Up</h2>
        {/* Display validation errors, if any */}
        <ValidationErrors errors={errors} />

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">
            First Name
            <span className="visually-hidden"> (required)</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            aria-required="true"
            aria-describedby="firstNameHelp"
          />
          <small id="firstNameHelp" className="sr-only">
            Enter your first name.
          </small>

          <label htmlFor="lastName">
            Last Name
            <span className="visually-hidden"> (required)</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            aria-required="true"
            aria-describedby="lastNameHelp"
          />
          <small id="lastNameHelp" className="sr-only">
            Enter your last name.
          </small>

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

          <button className="button" type="submit">
            Sign Up
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
          Already have a user account? Click here to{" "}
          <Link to="/signin" aria-label="Sign in to your account">
            sign in
          </Link>
          !
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
