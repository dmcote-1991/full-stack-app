const validationErrors = ({ errors }) => {
  return (
    <div>
      {errors.length > 0 && (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.map((error, index) => {
              <li key={index}>{error}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default validationErrors;
