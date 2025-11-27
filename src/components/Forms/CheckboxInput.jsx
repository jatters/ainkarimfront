import style from "./PrettyCheckbox.css";
import FormError from "./FormError";

export default function CheckboxInput({ fieldName, content, required, disabled, error, defaultValue }) {
  return (
    <div className="col-span-2">
      <div className="pretty-checkbox mb-3 flex gap-2  items-center text-light-gray">
        <label className="checkbox flex items-center gap-1">
          <input
            type="checkbox"
            id={fieldName}
            name={fieldName}
            className="checkbox__input "
            disabled={disabled}
            defaultChecked={defaultValue}
          />
          <span className="checkbox__label"></span>
          <span htmlFor={fieldName} className="text-xs ">
            {content}            
          </span>
        </label>
      </div>   
      <FormError errors={error} />       
    </div>
  );
}
