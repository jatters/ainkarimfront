import React from 'react'

export default function PaymentPage() {
  return (
    <div className="container mx-auto pt-16 pb-14">
      <h1>Finalizar Compra</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 -bg--grey-lightest py-10 px-6 rounded-lg">
        <div className="col-span-1">
          <div className="flex gap-5">
            <button className="-bg--red-cruz text-white py-3 px-6 rounded-md font-bold hover:-bg--grey-darkest duration-300">
              EMPRESA
            </button>
            <button className="border border-solid -border--red-cruz -text--red-cruz rounded-md py-3 px-6 font-bold">
              PERSONA NATURAL
            </button>
          </div>
          <div>
            <h2>Identificación</h2>
            <form action="" className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="correo"
                placeholder="correo"
                className="col-span-2"
              />
              <input
                type="text"
                name="correo"
                placeholder="Nombre"
                className="col-span-1"
              />
              <input
                type="text"
                name="correo"
                placeholder="Apellido"
                className="col-span-1"
              />
              <input
                type="text"
                name="correo"
                placeholder="Telefono"
                className="col-span-2"
              />
              <h2>Datos de empresa</h2>
              <input
                type="text"
                name="correo"
                placeholder="Razón Social"
                className="col-span-2"
              />
              <input
                type="text"
                name="correo"
                placeholder="NIT"
                className="col-span-2"
              />
              <h2>Dirección de envío</h2>
              <input
                type="text"
                name="correo"
                placeholder="Nombre de la persona que va a recibir"
                className="col-span-2"
              />
              <input
                type="text"
                name="correo"
                placeholder="Departamento"
                className="col-span-1"
              />
              <input
                type="text"
                name="correo"
                placeholder="Municipio"
                className="col-span-1"
              />
              <input
                type="text"
                name="correo"
                placeholder="Dirección"
                className="col-span-2"
              />
              <input
                type="text"
                name="correo"
                placeholder="Torre, apartamento, conjunto, oficina"
                className="col-span-2"
              />
              <input
                type="text"
                name="correo"
                placeholder="Telefono contacto"
                className="col-span-2"
              />
            </form>
          </div>
        </div>
        <div className="col-span-1">
          <h2>Tu pedido</h2>
          <div className="bg-white rounded-lg  py-4 px-5 border">
            <div className="grid grid-cols-4 py-8 justify-items-center items-center">
              <div className="col-span-1">
                <img
                  src="https://cdn.industriascruz.co/wp-content/uploads/2024/05/Silla-Sidney-1-300x300.jpg.webp"
                  alt=""
                  className="h-20 w-20"
                />
              </div>
              <div className="col-span-2">
                <div className="font-bold">Producto title</div>
                <div className="">Referencia</div>
                <div className="">

                  <div> price={"1400000"}</div>
                </div>
              </div>
              <div className="col-span-1 text-center">
                <div>
                  <button>
                    <span class="icon-[mingcute--delete-2-line] text-xl hover:-text--red-cruz hover:scale-125 duration-300" />
                  </button>
                </div>
                <div>1 unidad</div>
              </div>
            </div>
            <div className="grid grid-cols-4 py-8 border-t justify-items-center items-center">
              <div className="col-span-1">
                <img
                  src="https://cdn.industriascruz.co/wp-content/uploads/2024/05/Silla-Sidney-1-300x300.jpg.webp"
                  alt=""
                  className="h-20 w-20"
                />
              </div>
              <div className="col-span-2">
                <div className="font-bold">Producto title</div>
                <div className="">Referencia</div>
                <div className="">
                <div> price={"1400000"}</div>
                </div>
              </div>
              <div className="col-span-1 text-center">
                <div>
                  <button>
                    <span class="icon-[mingcute--delete-2-line] text-xl hover:-text--red-cruz hover:scale-125 duration-300" />
                  </button>
                </div>
                <div>1 unidad</div>
              </div>
            </div>
            <div className="grid grid-cols-4 py-8 border-t">
              <div className="col-span-2">
                <div>Subtotal</div>
                <div>Envío</div>
                <div>Impuestos</div>
              </div>
              <div className="col-span-2 text-right">
              <div> price={"2800000"}</div>
              <div> price={"1500000"}</div>
              <div> price={"5600000"}</div>
              </div>
            </div>
            <div className="grid grid-cols-4 py-8 border-t">
              <div className="col-span-2">
                <div className="font-bold">Total</div>
              </div>
              <div className="col-span-2 text-right">
              <div> price={"35100000"}</div>
              </div>
            </div>
            <div className="py-8 border-t">
              <button className="-bg--red-cruz text-white font-bold py-3 rounded-lg w-full hover:-bg--grey-darkest duration-200">
                REALIZAR PAGO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
