/**
 * NotFound Component
 *
 * This component renders a page indicating that the requested resource or route could
 * not be found. It provides a user-friendly message informing the user that the page
 * they are trying to access does not exist. This page is typically displayed when a
 * user navigates to a URL that does not match any route in the application.
 *
 * @returns {JSX.Element} A React element displaying the "Not Found" message.
 */

const NotFound = () => {
  return (
    <main role="main">
      <div className="wrap">
        <h2>Page Not Found</h2>
        <p>Sorry! We couldn&apos;t find the page you were looking for.</p>
      </div>
    </main>
  );
};

export default NotFound;
