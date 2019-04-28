import React, { PropTypes } from 'react';

function Button() {
  const { onClick, labelText, disabled } = this.props;

  return (
    <input
      type="button"
      value={labelText}
      onClick={onClick.bind(this)} disabled={disabled}
    />
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

export default Button;