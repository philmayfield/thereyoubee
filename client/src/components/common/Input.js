import React, { Component } from "react";
import PropTypes from "prop-types";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };

    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus() {
    this.setState({ active: true });
  }

  handleBlur(e) {
    this.setState({ active: e.target.value ? true : false });
  }

  render() {
    const {
      name,
      label,
      placeholder,
      value,
      error,
      type = "text",
      onChange,
      disabled,
      info = "",
      required = false,
      autoFocus = false,
      minLength,
      maxLength
    } = this.props;

    const errorOrInfo = error ? error : info;

    return (
      <div className="input-field">
        <input
          type={type}
          className={`${error && "invalid"}`}
          placeholder={placeholder}
          id={`input-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          minLength={minLength}
          maxLength={maxLength}
        />
        <label
          htmlFor={`input-${name}`}
          className={`${(this.state.active || placeholder) && "active"}`}
        >
          {label}
          {required && " *"}
        </label>
        {errorOrInfo && (
          <div className="helper-text" data-error={errorOrInfo}>
            {info}
          </div>
        )}
      </div>
    );
  }
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Input;
