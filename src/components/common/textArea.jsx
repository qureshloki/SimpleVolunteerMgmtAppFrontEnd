import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} {...rest} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string
};

export default TextArea;
