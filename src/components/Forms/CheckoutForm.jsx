import React, { useState } from "react";

export default function CheckoutForm({ showAddressFields, orderData }) {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    documentNumber: "",
    address: "",
    city: "",
    state: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Función para convertir la hora en formato "2:00 pm" a "14:00:00.000"
  function convertToTimeFormat(hourString) {
    const [time, period] = hourString.split(" ");
    let [hours, minutes] = time.split(":");

    if (period.toLowerCase() === "pm" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (period.toLowerCase() === "am" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}:00.000`;
  }

  const formattedTime = convertToTimeFormat(orderData[0].time);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Crear el usuario en Strapi
      const userResponse = await fetch(
        `${process.env.STRAPI_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            username: formData.email,
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            middleName: formData.secondName,
            lastName: formData.firstLastName,
            secondLastName: formData.secondLastName,
            document: formData.documentNumber,
            address: formData.address,
            city: formData.city,
            department: formData.state,
            mobile: formData.mobile,
          }),
        }
      );

      const userData = await userResponse.json();

      if (userResponse.ok) {
        console.log("Usuario creado:", userData);

        // Crear la reserva en Strapi
        const reservationResponse = await fetch(
          `${process.env.STRAPI_URL}/api/reservas`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify({
              data: {
                plan: orderData[0].plan, // ID del plan seleccionado
                date: orderData[0].date || null, // Fecha seleccionada, asegurando que no sea nula
                time: formattedTime || null, // Hora seleccionada, asegurando que no sea nula
                guests: orderData[0].guests || null, // Número de personas, asegurando que no sea nula
                estado: "Pendiente", // Estado inicial de la reserva
                users_permissions_user: userData.user.id, // Vincular la reserva con el usuario recién creado
              },
            }),
          }
        );

        const reservationData = await reservationResponse.json();

        if (reservationResponse.ok) {
          console.log("Reserva creada:", reservationData);
          // Redirigir a la página de confirmación o a la pasarela de pago
        } else {
          console.error("Error al crear la reserva:", reservationData);
        }
      } else {
        console.error("Error al crear el usuario:", userData);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="md:col-span-1">
          <label htmlFor="firstName" className="sr-only">
            Primer nombre
          </label>
          <input
            placeholder="Primer Nombre"
            type="text"
            name="firstName"
            id="firstName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="secondName" className="sr-only">
            Segundo nombre
          </label>
          <input
            placeholder="Segundo nombre"
            type="text"
            name="secondName"
            id="secondName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.secondName}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="firstLastName" className="sr-only">
            Primer apellido
          </label>
          <input
            placeholder="Primer apellido"
            type="text"
            name="firstLastName"
            id="firstLastName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.firstLastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="secondLastName" className="sr-only">
            Segundo apellido
          </label>
          <input
            placeholder="Segundo apellido"
            type="text"
            name="secondLastName"
            id="secondLastName"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.secondLastName}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="documentNumber" className="sr-only">
            Número de documento
          </label>
          <input
            placeholder="Número de documento"
            type="text"
            name="documentNumber"
            id="documentNumber"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.documentNumber}
            onChange={handleChange}
            required
          />
        </div>

        {showAddressFields && (
          <>
            <div className="md:col-span-2">
              <label htmlFor="address" className="sr-only">
                Dirección
              </label>
              <input
                placeholder="Dirección"
                type="text"
                name="address"
                id="address"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="city" className="sr-only">
                Ciudad
              </label>
              <input
                placeholder="Ciudad"
                type="text"
                name="city"
                id="city"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="state" className="sr-only">
                Departamento
              </label>
              <input
                placeholder="Departamento"
                type="text"
                name="state"
                id="state"
                className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="md:col-span-2">
          <label htmlFor="mobile" className="sr-only">
            Móvil
          </label>
          <input
            placeholder="Móvil"
            type="text"
            name="mobile"
            id="mobile"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            placeholder="Correo electrónico"
            type="email"
            name="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            placeholder="Contraseña"
            type="password"
            name="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-lg focus:outline-none focus:-border--light-green"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 px-4 -bg--dark-green text-white font-bold rounded-lg hover:-bg--light-green duration-200"
          >
            REALIZAR PAGO
          </button>
        </div>
      </form>
    </div>
  );
}
