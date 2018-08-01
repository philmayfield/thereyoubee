import React from "react";
import PropTypes from "prop-types";

const Input = ({
  name,
  label,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled,
  info,
  required = false,
  autoFocus = false
}) => {
  const handleFocus = () => {
    console.log("focus!");
  };
  return (
    <div className="input-field">
      <input
        type={type}
        className={`${error ? "invalid" : ""}`}
        placeholder={placeholder}
        id={`input-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        disabled={disabled}
        required={required}
        autoFocus={autoFocus}
      />
      <label htmlFor={`input-${name}`}>
        {label}
        {required && " *"}
      </label>
      <div className="invalid-feedback">{error}</div>
      {info && <span className="helper-text">{info}</span>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  onChange: PropTypes.func,
  info: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool
};

Input.defaultProps = {
  type: "text"
};

export default Input;
