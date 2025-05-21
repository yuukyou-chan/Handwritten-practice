import React, { useState } from "react";

const InputNumber = ({ onChange, value }) => {
  const [_value, set_Value] = useState(value);
  const _onChange = (e) => {
    const val = e.target.value;

    if (!Object.is(Number(val), NaN)) {
      set_Value(val);
      onChange(val);
    }
  };
  return <input type="text" value={_value} onChange={_onChange} />;
};

export default InputNumber;
