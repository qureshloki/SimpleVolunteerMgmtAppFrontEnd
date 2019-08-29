import React from "react";
import PropTypes from "prop-types";

const Button = ({ name, label, type, isLoading, ...rest }) => {
  if (isLoading) rest.disabled = isLoading;
  return (
    <button
      id={name}
      name={name}
      type={type}
      {...rest}
      className="btn btn-primary m-1"
    >
      {isLoading && (
        <React.Fragment>
          <span
            className="spinner-border"
            role="status"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Loading...</span>
        </React.Fragment>
      )}
      {!isLoading && label}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

export default Button;
