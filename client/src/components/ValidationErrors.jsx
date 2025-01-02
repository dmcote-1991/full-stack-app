/**
 * ValidationErrors Component
 *
 * This component is used to display a list of validation errors. It receives an `errors` prop,
 * which is an array of error messages. If there are any errors, it renders a list of those errors
 * inside a styled container. Each error message is displayed as a list item.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string[]} [props.errors=[]] - An array of error messages to display.
 * @returns {JSX.Element} A React element that displays validation errors if any exist.
 */

const validationErrors = ({ errors = [] }) => {
  return (
    <div aria-live="polite" aria-atomic="true">
      {errors.length > 0 && (
        <div className="validation--errors" role="alert">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default validationErrors;
