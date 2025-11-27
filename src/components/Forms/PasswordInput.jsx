import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import FormError from "./FormError";

export default function PasswordInput({ label, fieldName, showPassword, togglePasswordVisibility, disabled, defaultValue, error }) {
  return (
    <div className="col-span-2 md:col-span-1">
      <div className="relative">
        <label htmlFor={fieldName} className="sr-only">
          {label}
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id={fieldName}
          name={fieldName}
          className={`mt-1 p-2 w-full border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-none disabled:opacity-50 ${error ? "border-red-500" : ""}`}
          placeholder="Crea tu contraseña"          
          disabled={disabled}
          defaultValue={defaultValue}
        />
        <Tooltip
          title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          slotProps={{
            popper: {
              sx: {
                [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                  {
                    marginTop: "0px",
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                  {
                    marginBottom: "0px",
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                  {
                    marginLeft: "0px",
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                  {
                    marginRight: "0px",
                  },
              },
            },
          }}
        >
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? (
              <span
                className="icon-[ri--eye-close-line]"
                role="img"
                aria-hidden="true"
              />
            ) : (
              <span className="icon-[bi--eye]" role="img" aria-hidden="true" />
            )}
          </button>
        </Tooltip>
      </div>      
      <FormError errors={error} />
    </div>
  );
}
