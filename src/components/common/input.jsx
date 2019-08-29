import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group m-1">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...rest} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

export default Input;
