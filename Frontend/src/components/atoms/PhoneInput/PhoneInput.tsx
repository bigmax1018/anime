import { PhoneInputOwnProps } from ".";
import "react-phone-input-2/lib/material.css";
import { default as BasePhoneInput } from "react-phone-input-2";
import "./PhoneInput.css";
import { useAppSelector } from "redux/hooks";

export type PhoneInputProps = PhoneInputOwnProps &
  React.ComponentProps<typeof BasePhoneInput>;

export default function PhoneInput({
  id,
  name,
  error,
  onChange,
  helperText,
  value,
  ...rest
}: PhoneInputProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <BasePhoneInput
        country={user ? (user.country ? user.country : "au") : "au"}
        enableSearch
        value={value}
        inputProps={{
          id,
          name,
          defaultValue: value,
          placeholder: "",
        }}
        dropdownClass={"phone-input-dropdown"}
        containerClass={`phone-input ${error ? "phone-input-error" : ""}`}
        onChange={(value, data, e, formattedValue) => {
          onChange?.(value, data, e, formattedValue);
        }}
        {...rest}
        placeholder=""
      />
      {helperText && <p className="phone-input-helper-text">{helperText}</p>}
    </>
  );
}
