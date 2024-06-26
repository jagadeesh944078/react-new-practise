import React, { useState } from "react";

const Input = (props) => {
  const [value, setValue] = useState(null);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <input type="text" value={value} onChange={handleChange} />
      <br />
      {props.renderTextBelow(value)}
    </>
  );
};

export default Input;
