import React from "react";
import '../buttonPagination/buttonPagination.css'

const ButtonPagination = ({onClick,disabled,number}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="page-link"
    >
      {number}
    </button>
  );
};

export default ButtonPagination;
