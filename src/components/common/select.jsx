import React from "react";
import PropTypes from "prop-types";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} {...rest} className="form-control">
        {options.map(opt => {
          return (
            <option key={opt._id} value={opt._id}>
              {opt.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string
    })
  ),
  error: PropTypes.string
};

export default Select;
