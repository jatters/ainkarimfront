import HeaderImage from "@/components/Ui/HeaderImage";
import React from "react";

export default function page() {
  const almacenes = [
    { almacen: "VIÑEDO BOGOTÁ", direccion: "CL. 127 # 13A – 32 OF. 202" },
    {
      almacen: "ÉXITO SUBA",
      direccion: "CL. 145 #105B – 58 ( AV. SUBA CON AV. CALI)",
    },
    { almacen: "ÉXITO NUEVO KENNEDY", direccion: "CARRERA 78K #37 A – 53 SUR" },
    { almacen: "ÉXITO BOSA", direccion: "CL. 65 SUR #78 H – 54" },
    {
      almacen: "ÉXITO FACATATIVA",
      direccion: "C. C. EL PÓRTICO, CRA. 5 SUR #13 – 50, FACATATIVÁ",
    },
    { almacen: "ÉXITO FONTIBON", direccion: "AV. 13 # 106-104 ZONA FRANCA" },
    {
      almacen: "ÉXITO CIUDAD TUNAL",
      direccion: "CALLE 47 B SUR # 24 B 33 C. C. CIUDAD TUNAL",
    },
    { almacen: "LA LICORERA", direccion: "CARRERA 14 #104-45" },
  ];
  return (
    <main>
      <HeaderImage
        title="Puntos de Venta"
        background="/banner-puntos-de-venta.webp"
      />
      <section className="container mx-auto py-16 px-5">
        <h2 className="text-center text-4xl font-bold -text--dark-green">
          PUNTOS DE VENTA BOGOTÁ
        </h2>
        <div className="p-6">
          <table className="mx-auto max-w-screen-sm border-collapse">
            <thead className="font-serif text-2xl -bg--dark-green text-white rounded-lg ">
              <tr>
                <th className="py-2 px-4 border-b">Almacén</th>
                <th className="py-2 px-4 border-b">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {almacenes.map((item, index) => (
                <tr key={index} className="my-5 hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{item.almacen}</td>
                  <td className="py-2 px-4 border-b">{item.direccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
