import React from 'react';

export default function CheckoutForm() {
  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">      
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <label htmlFor="firstName" className="block text-sm font-medium -text--dark-green">
            Primer nombre
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="secondName" className="block text-sm font-medium -text--dark-green">
            Segundo nombre
          </label>
          <input
            type="text"
            name="secondName"
            id="secondName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="firstLastName" className="block text-sm font-medium -text--dark-green">
            Primer apellido
          </label>
          <input
            type="text"
            name="firstLastName"
            id="firstLastName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="secondLastName" className="block text-sm font-medium -text--dark-green">
            Segundo apellido
          </label>
          <input
            type="text"
            name="secondLastName"
            id="secondLastName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="documentNumber" className="block text-sm font-medium -text--dark-green">
            Número de documento
          </label>
          <input
            type="text"
            name="documentNumber"
            id="documentNumber"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium -text--dark-green">
            Dirección
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="mobile" className="block text-sm font-medium -text--dark-green">
            Móvil
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="city" className="block text-sm font-medium -text--dark-green">
            Ciudad
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="state" className="block text-sm font-medium -text--dark-green">
            Departamento
          </label>
          <input
            type="text"
            name="state"
            id="state"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium -text--dark-green">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 px-4 -bg--dark-green text-white font-bold rounded-lg hover:-bg--light-green duration-300"
          >
            Finalizar compra
          </button>
        </div>
      </form>
    </div>
  );
}
