import React from "react";

export default ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} />
        {touched && error && <span style={{ color: "red" }}>{error}</span>}
      </div>
    </div>
  );
};
