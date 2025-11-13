import React, { useState, useRef, useEffect } from "react";
import FormError from "@/components/Forms/FormError";

export default function FileInput({
  label,
  fieldName,
  disabled,
  error,
  accept = ".pdf,.jpg,.jpeg,.png",
  onFileChange,
  persistedFile,
}) {
  const [selectedFile, setSelectedFile] = useState(persistedFile);
  const fileInputRef = useRef(null);
  const hasError = error?.length > 0;

  // Sincronizar con el archivo persistido del padre
  useEffect(() => {
    if (persistedFile && persistedFile !== selectedFile) {
      setSelectedFile(persistedFile);
    }
  }, [persistedFile, selectedFile]);

  // Restaurar el archivo en el input después de un render
  useEffect(() => {
    if (selectedFile && fileInputRef.current) {
      try {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(selectedFile);
        fileInputRef.current.files = dataTransfer.files;
      } catch (error) {
        console.error("Error al restaurar archivo:", error);
      }
    }
  }, [selectedFile]);

  const handleFileChangeInternal = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileChange?.(fieldName, file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileChange?.(fieldName, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          id={fieldName}
          name={fieldName}
          accept={accept}
          className={`w-full px-3 py-2 border border-gray-400/40 rounded-lg text-gray-700 focus:ring-1 focus:ring-light-green focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-dark-green file:text-white hover:file:bg-light-green file:cursor-pointer ${
            hasError ? "border-red-500" : ""
          }`}
          disabled={disabled}
          onChange={handleFileChangeInternal}
        />
        {selectedFile && (
          <div className="mt-2 flex items-center justify-between bg-gray-50 p-2 rounded-md">
            <span className="text-sm text-gray-700 truncate flex-1">
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
              disabled={disabled}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
      <FormError errors={error} />
    </div>
  );
}
