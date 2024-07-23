/**
 * UnhandledError Component
 *
 * This component renders a page that informs the user that an unexpected error has occurred.
 * It provides a general error message when the application encounters an issue that doesn't fit
 * into other specific error categories (e.g., 404 Not Found). This page is usually shown when
 * a server error or unexpected issue arises, and no other more specific error page is applicable.
 *
 * @returns {JSX.Element} A React element displaying a generic error message.
 */

const UnhandledError = () => {
  return (
    <main>
      <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
    </main>
  );
};

export default UnhandledError;
