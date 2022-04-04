/* eslint-disable react/display-name */

import React from "react";
import { useState, useEffect } from "react";
import Textarea from "react-textarea-autosize";
// import AutosizeInput from "react-input-autosize";

// TODO: call onChange after no changes in X seconds?

export default React.forwardRef(
  (
    {
      value: defaultValue,
      onChange,
      className = "",
      placeholder,
      onFocus,
      onBlur,
      onEnter = () => {},
      singleLine = false,
      newlineOnEnter = false,
      autoFocus = false,
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
      if (!editing || value === undefined || value === null)
        setValue(defaultValue);
    }, [defaultValue, value]);

    if (typeof onChange !== "function")
      return <div className={className}>{value}</div>;

    const props = {
      className: className,
      value: value || "",
      onChange: (e) => setValue(e.target.value),
      onKeyDown: (e) => {
        if (
          (e.key === "Enter" && !e.shiftKey && !newlineOnEnter) ||
          e.key === "Escape"
        ) {
          e.preventDefault();
          e.stopPropagation();
          e.target.blur();
          if (e.key === "Enter") onEnter();
        }
      },
      placeholder: placeholder,
      onFocus: (e) => {
        setEditing(true);
        onFocus && onFocus();
      },
      onBlur: (e) => {
        onChange(value || null);
        setEditing(false);
        onBlur && onBlur();
      },
      autoFocus,
    };

    // if (singleLine) return <AutosizeInput ref={ref} type="text" {...props} />;
    if (singleLine) return <input ref={ref} type="text" {...props} />;
    else return <Textarea ref={ref} {...props} />;
  }
);
