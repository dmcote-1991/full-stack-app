import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Header = () => {
  // Destructure user and signOut from the authentication context
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  // Handle the sign out process
  const handleSignOut = async (e) => {
    e.preventDefault();
    await signOut();
    navigate("/");
  };

  return (
    <header role="banner">
      <div className="wrap header--flex">
        <h1 className="header--logo">
          {/* Link to navigate to the homepage */}
          <Link to="/" aria-label="Go to homepage">Courses</Link>
        </h1>
        <nav role="navigation" aria-label="Main navigation">
          {user ? (
            // Render for users who are signed in
            <ul className="header--signedin">
              <li>
                <span>
                  Welcome, <span aria-label={`User first name: ${user.firstName}, last name: ${user.lastName}`}>{user.firstName} {user.lastName}</span>!
                </span>
              </li>
              <li>
                <button
                  className="button-signout button-signout-secondary"
                  onClick={handleSignOut}
                  aria-label="Sign out"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          ) : (
            // Render for users who are not signed in
            <ul className="header--signedout">
              <li>
                <Link to="/signup" aria-label="Sign up for an account">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin" aria-label="Sign in to your account">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
