import React from "react";

import type { InputProps } from "../util/data-types.ts";

const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      <div className="control-error">{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;
