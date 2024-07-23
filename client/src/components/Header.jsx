import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          {/* Link to navigate to the homepage */}
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          {user ? (
            // Render for users who are signed in
            <ul className="header--signedin">
              <li>
                Welcome, {user.firstName} {user.lastName}!
              </li>
              <li>
                <button
                  className="button button-secondary"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          ) : (
            // Render for users who are not signed in
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
