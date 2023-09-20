import React from "react";
import "./InputField.styles.css";
import propTypes from "./InputField.types.js";
import { TextField, SelectField, DateField, MaskField } from "./inputs/index";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

const InputField = (props) => {
  const {
    valueType,
    valueSet,
    label,
    value,
    warning,
    error,
    helperText,
    onChange,
    onBlur = null,
    disabled,
    pattern,
    locale,
    uiLocale,
    attribute = null,
    onInput,
  } = props;
  const generateSelectFieldValue = (valueSet, value) => {
    const v = valueSet.find((currentValue) => currentValue.value === value);
    return v ? v : null;
  };

  const generateInput = () => {
    if (valueSet) {
      return (
        <SelectField
          valueSet={valueSet}
          locale={locale}
          uiLocale={uiLocale}
          value={generateSelectFieldValue(valueSet, value)}
          handleBlur={onBlur}
          handleChange={onChange}
          disabled={disabled}
        />
      );
    }

    if (valueType === "DATE") {
      return (
        <DateField
          {...(_.has(props, "periodType") && { periodType: props.periodType })}
          valueSet={valueSet}
          value={value}
          locale={locale}
          handleBlur={onBlur}
          handleChange={onChange}
          disabled={disabled}
          uiLocale={uiLocale}
          {...props}
        />
      );
    }
    if (valueType === "BOOLEAN") {
      const vs = [
        { value: "true", label: uiLocale.yes },
        { value: "false", label: uiLocale.no },
      ];
      return (
        <SelectField
          value={generateSelectFieldValue(vs, value)}
          uiLocale={uiLocale}
          valueSet={vs}
          handleChange={onChange}
          disabled={disabled}
        />
      );
    }

    if (valueType === "MASK") {
      return (
        <TextField
          type="text"
          value={value}
          handleChange={onChange}
          handleBlur={onBlur}
          disabled={disabled}
          inputProps={{ min: "0" }}
          maxLength={attribute && attribute.maxLength}
          onInput={(e) => {
            const onlyNums = e.target.value.replace(pattern, "");
            e.target.value = onlyNums;
          }}
        />
      );
    }

    switch (valueType) {
      case "INTEGER":
      case "INTEGER_POSITIVE":
      case "INTEGER_NEGATIVE":
      case "INTEGER_ZERO_OR_POSITIVE":
        return (
          <TextField
            type="number"
            value={value}
            handleChange={onChange}
            handleBlur={onBlur}
            disabled={disabled}
            inputProps={{ min: "0" }}
            maxLength={attribute && attribute.maxLength}
            onInput={(e) => {
              if (attribute && attribute.maxLength) {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, attribute.maxLength);
              }
            }}
          />
        );
      case "TEXT":
      case "PERCENTAGE":
      case "PHONE_NUMBER":
      case "EMAIL":
        return (
          <TextField
            value={value}
            handleChange={onChange}
            handleBlur={onBlur}
            disabled={disabled}
          />
        );
      case "NUMBER":
        return (
          <TextField
            type="number"
            value={value}
            handleChange={onChange}
            handleBlur={onBlur}
            disabled={disabled}
            // maxLength={attribute && attribute.maxLength}
            onInput={(e) => {
              if (attribute && attribute.maxLength) {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, attribute.maxLength);
              }
              // check max
              if (attribute && attribute.max) {
                e.target.value =
                  parseInt(e.target.value) > attribute.max
                    ? attribute.max
                    : parseInt(e.target.value);
              }
            }}
          />
        );
      case "PATTERNNUMBER":
        return (
          <TextField
            type="number"
            value={value}
            handleChange={onChange}
            handleBlur={onBlur}
            disabled={disabled}
            maxLength={attribute.maxLength}
            onInput={(e) => {
              if (attribute && attribute.maxLength) {
                e.target.value = e.target.value.replace(/^0+/, "");
                if (
                  e.target.value.split("").length <= attribute.maxLength &&
                  e.target.value.split("").length > 0
                ) {
                  let arr = [];
                  e.target.value.split("").forEach((da) => {
                    arr.push(da);
                  });
                  let arrValue = [];
                  for (let i = 1; i <= attribute.maxLength - arr.length; i++) {
                    arrValue.push(0);
                  }
                  arr.forEach((da) => {
                    arrValue.push(da);
                  });
                  e.target.value = arrValue.join("");
                } else {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, attribute.maxLength);
                }
              }
            }}
          />
        );
    }
  };

  return (
    <div className="input-field-container">
      {label && <div className="input-field-label">{label}</div>}
      <div className="input-field-input">{generateInput()}</div>
      {warning && <div className="input-field-warning">{warning}</div>}
      {error && <div className="input-field-error">{error}</div>}
      {helperText && (
        <div className="input-field-helper-text">{helperText}</div>
      )}
    </div>
  );
};

InputField.propTypes = propTypes;
export default InputField;
