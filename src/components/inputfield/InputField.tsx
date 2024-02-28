import React, { forwardRef, useState } from "react";
import { InputFieldProps } from "../../helpers/types";

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, onChange, defaultValue, errorMessage, ...props }: InputFieldProps,
    ref
  ) => {
    const [fieldValue, setFieldValue] = useState(!!defaultValue);

    const handleChange = (e: React.FocusEvent<HTMLInputElement>) => {
      setFieldValue(e.target.value.length !== 0);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <section>
        <div className="relative flex w-full items-center">
          <label className="text-purple-50 font-semibold w-[6rem] md:w-40 leading-5 md:leading-none text-base md:text-lg">
            {label}:
          </label>
          <input
            className="w-52 rounded py-1 px-2 outline-none box-border border-collapse border-2 border-purple-50 border-opacity-60 focus:border-purple-500 focus:border-2"
            ref={ref}
            onChange={handleChange}
            data-testid={"inputField"}
            {...props}
          />
        </div>
        {errorMessage ? (
          <p
            data-testid={`${
              props.name ? `${props.name}ErrorMessage` : `errorMessage`
            }`}
            className="pl-[5.7rem] md:pl-40 pt-1 text-sm text-purple-50"
          >
            {errorMessage}
          </p>
        ) : null}
      </section>
    );
  }
);
