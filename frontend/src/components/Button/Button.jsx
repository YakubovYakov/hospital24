import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button({
  to,
  onClick,
  color = "primary",
  size = "medium",
  minWidth = false,
  maxWidth = false,
  hiddenButton = false,
  children,
}) {
  const className = `btn btn--${color} btn--${size} 
	${minWidth ? "btn--min-width" : ""}
	${maxWidth ? "btn--max-width" : ""}
	${hiddenButton ? "btn--hidden-button" : ""}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
