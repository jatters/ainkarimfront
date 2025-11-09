
import React, { useState, useEffect} from "react";
import { useFormContext } from "react-hook-form";

const MAX_SIZE = 10 * 1024 * 1024;

export default function FileUpload({ label, fieldName }) {
  const {
    register = () => {},
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    register(fieldName, { 
      required: "El documento es requerido" 
    });
  }, [register, fieldName]);

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = React.useRef(null);

  const openFileDialog = () => {
    clearErrors(fieldName);
    inputRef.current?.click();
  };

  const handleFile = async (e) => {
    clearErrors(fieldName);
    const selected = e.target.files[0];
    if (!selected) return;

    // Validación de tamaño y tipo
    if (selected.size > MAX_SIZE) {
      setError(fieldName, {
        type: "manual",
        message: "El archivo supera los 10 MB.",
      });
      return;
    }
    if (
      selected.type !== "application/pdf" &&
      !selected.type.startsWith("image/")
    ) {
      setError(fieldName, {
        type: "manual",
        message: "Solo PDF o imágenes permitidas.",
      });
      return;
    }

    setUploading(true);
    setFile({ name: selected.name, url: null });

    const formData = new FormData();
    formData.append("file", selected);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Error al subir");

      setFile({ name: selected.name, url: body.url });
      setValue(fieldName, body.url, { shouldValidate: true });
    } catch (err) {
      setError(fieldName, { type: "manual", message: err.message });
      setFile(null);
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setValue(fieldName, "", { shouldValidate: true });
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={fieldName}
        className="mb-1 text-gray-700 font-medium text-sm"
      >
        {label}
      </label>

      {/* Input oculto */}
      <input
        ref={inputRef}
        id={fieldName}
        type="file"
        accept="application/pdf,image/*"
        onChange={handleFile}
        className="hidden"
      />

      {!file ? (
        <button
          type="button"
          onClick={openFileDialog}
          className={`px-4 py-2 rounded-md text-white transition ${
            uploading
              ? "bg-gray-400 cursor-wait"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {uploading ? "Subiendo…" : "Seleccionar archivo"}
        </button>
      ) : (
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md border text-xs border-gray-200">
          <span
            className="icon-[teenyicons--file-tick-solid] text-green-600 text-base"
            role="img"
            aria-hidden="true"
          />
          <span className="truncate text-gray-800">{file.name}</span>
          <button
            type="button"
            onClick={clearFile}
            className="h-6 w-6 justify-self-end self-end "
            aria-label="Eliminar archivo"
          >
            <span
              className="icon-[tabler--trash] text-red-600 text-lg h-4 w-4 -mb-1"
              role="img"
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {errors[fieldName] && (
        <p className="mt-1 text-sm text-red-600">{errors[fieldName].message}</p>
      )}
    </div>
  );
}
