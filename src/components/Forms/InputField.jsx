import React from "react";
import FormError from "@/components/Forms/FormError";

export default function InputField({
  label,
  fieldName,
  type,
  disabled,
  error,
  defaultValue,
}) {
  const hasError = error?.length > 0;
  return (
    <div className="col-span-2 md:col-span-1">
      <label
        htmlFor={fieldName}
        className={`font-medium text-sm ml-2 text-dark-green ${
          hasError ? "text-red-500" : ""
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        id={fieldName}
        name={fieldName}
        className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-none ${
          hasError ? "border-red-500" : ""
        } disabled:opacity-50 `}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      <FormError errors={error} />
    </div>
  );
}
