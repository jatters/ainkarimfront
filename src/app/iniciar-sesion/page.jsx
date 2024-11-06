import Image from "next/image";
import banner from "../../../public/login-image.jpg";
import Link from "next/link";

export default function loginpage() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center">
      <Image
        src={banner}
        alt="Banner Login"
        className="hidden lg:block h-screen object-cover"
      />
      <div className="py-20 md:py-10 px-5 flex flex-col justify-center items-center">
        <h1 className="-text--dark-green text-3xl text-center font-bold">
          Iniciar Sesión
        </h1>
        <p className="font-semibold py-5 text-center">
          Inicia sesión para acceder a tu cuenta
        </p>
        <form
          action=""
          className="flex flex-col space-y-4 mt-5 w-full max-w-xs"
        >
          <input
            type="email"
            name=""
            id=""
            placeholder="Correo electronico"
            className="border border-gray-300 px-5 py-3 rounded-md"
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Contraseña"
            className="border border-gray-300 px-5 py-3 rounded-md"
          />
          <button
            type="submit"
            className="-bg--dark-green py-3 px-4 rounded-md text-white"
          >
            Iniciar sesión
          </button>
        </form>
        <div>
          <p className="text-center py-5">
            ¿No tienes una cuenta?{" "}
            <Link href="/registro" className="-text--dark-green font-semibold">
              Registrate
            </Link>
          </p>
          <p className="text-center py-5">
            Olvidaste tu contraseña{" "}
            <a href="" className="-text--dark-green font-semibold"></a>
          </p>
        </div>
      </div>
    </section>
  );
}
