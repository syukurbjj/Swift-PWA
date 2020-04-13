import { FormControl, Input, InputLabel } from "@material-ui/core";
import classNames from "classnames";
import React, { useState } from "react";
import useStyles from "./style";

const CustomTextField = ({
  placeholder = "",
  disabled = false,
  onChange = () => {},
  value = "",
  className = "",
  label = "",
  fullWidth = true,
  shrink = true,
  error = false,
  variant = "standard",
  footer,
  ...other
}) => {
  const styles = useStyles();
  const [localValue, setValue] = useState(value);
  const onChangeText = (event) => {
    const { value } = event.target;
    setValue(value);
    onChange(value);
  };
  const customClass = classNames(styles.container, className);
  return (
    <FormControl
      disabled={disabled}
      fullWidth={fullWidth}
      error={error}
      variant={variant}
      className={customClass}
    >
      <InputLabel shrink={shrink} htmlFor={label}>
        {label}
      </InputLabel>
      <Input
        id={label}
        value={localValue}
        onChange={onChangeText}
        placeholder={placeholder}
        {...other}
      />
      {React.isValidElement(footer) && footer}
    </FormControl>
  );
};

export default CustomTextField;
