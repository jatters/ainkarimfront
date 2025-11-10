import Link from "next/link";
import FormError from "./FormError";

export default function CheckboxTermsAndConditions({ disabled, error, defaultValue }) {
  return (
    <div className="col-span-2 my-3">
      <div className="pretty-checkbox">
        <label className="checkbox flex items-center">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="checkbox__input"
            disabled={disabled}
            defaultChecked={defaultValue}
          />
          <span className="checkbox__label"></span>
          <span htmlFor="terms" className="text-sm">
            He leído y Acepto los {""}
            <Link href="/terminos-y-condiciones" className="text-light-green hover:text-dark-green duration-200" target="_blank">
              Términos y Condiciones
            </Link>
            {" "}del servicio.
          </span>
        </label>
      </div>
      <FormError errors={error} />
    </div>
  );
}
