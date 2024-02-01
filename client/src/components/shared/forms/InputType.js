import React from "react";
//to make it resusable
const InputType = ({
  lableText,
  lableFor,
  inputType,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <div className="mb-3">
        <label htmlFor={lableFor} className="form-group">
          {lableText}
        </label>
        <input 
          type={inputType}
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputType;
