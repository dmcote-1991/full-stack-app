/**
 * Forbidden Component
 *
 * This component renders a simple page indicating that the user does not have permission
 * to access the requested resource. It provides a user-friendly message explaining the
 * restriction. This page is typically shown when a user tries to access a resource or
 * route they are not authorized to view.
 *
 * @returns {JSX.Element} A React element displaying the "Forbidden" message.
 */

const Forbidden = () => {
  return (
    <main role="main">
      <div className="wrap">
        <h2>Access Denied</h2>
        <p>Uh oh! You do not have permission to access this page.</p>
      </div>
    </main>
  );
};

export default Forbidden;
