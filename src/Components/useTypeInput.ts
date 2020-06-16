import { useState } from "react";

export default (defaultValue: string) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value !== "pub" && value !== "restaurant" && value !== "cafe") {
      setValue("");
    } else {
      setValue(value);
    }
  };

  return { value, onChange, setValue };
};
