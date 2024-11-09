import React from "react";
import './inputField.css'

const InputField = ({ label, register, name, rules, pattern, errors }) => {
  return (
    <div className={`form-row ${errors[name]?.message ? 'input-error' : ''}`}>
      <label>{label}:</label>
      <input
        {...register(name, rules)} 
      />
      {errors[name]?.message && <p className="error-message">{errors[name].message}</p>}
      {/* <p>{errors[name]?.message}</p> */}
    </div>
  );
};

export default InputField;


