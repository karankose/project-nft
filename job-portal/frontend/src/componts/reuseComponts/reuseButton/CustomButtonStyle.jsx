import React from 'react';

const CustomButtonStyle = ({
  type = 'button',
  label,
  onClick,
  btnClassName = 'btn-primary',
  wrapperClassName = '',
  iconLeft,
  iconRight,
  iconCenter,
  style = {},
  disabled = false,
}) => {
  return (
    <div className={wrapperClassName}>
      <button
        type={type}
        className={`btn ${btnClassName} d-inline-flex align-items-center justify-content-center`}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        {/* If center icon exists and no label */}
        {iconCenter && !label && <span>{iconCenter}</span>}

        {/* Normal case: left icon, label, right icon */}
        {!iconCenter && (
          <>
            {iconLeft && <span className="me-2 d-flex">{iconLeft}</span>}
            <span>{label}</span>
            {iconRight && <span className="ms-2 d-flex">{iconRight}</span>}
          </>
        )}
      </button>
    </div>
  );
};

export default CustomButtonStyle;
