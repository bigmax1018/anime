import PhoneInput from "components/atoms/PhoneInput";

export default function PhoneInputRedux({
  id,
  input,
  label,
  handleBlur,
  handleFocus,
  PhoneInputProps,
  meta: { error, touched, invalid },
}: any) {
  return (
    <PhoneInput
      {...PhoneInputProps}
      id={id}
      name={input?.name}
      specialLabel={label}
      value={input?.value?.value ? input?.value?.value : input?.value}
      helperText={touched && invalid && error}
      error={touched && invalid && error && true}
      onBlur={(e) => {
        handleBlur?.(e);
        e.preventDefault();
      }}
      onFocus={(e) => {
        handleFocus?.(e);
        e.preventDefault();
      }}
      onChange={(value, data, _e, formattedValue) => {
        input.onChange({ value, data, formattedValue });
      }}
    />
  );
}
