import HeaderImage from "@/components/Ui/HeaderImage";
import SliderReconocimientos from "@/components/SliderReconocimientos";
import Filantropia from "@/components/Ui/Filantropia";
import Timeline from "@/components/Ui/Timeline";
import Image from "next/image";
import tropico from "../../../public/tropico.jpg";
import clima from "../../../public/clima.jpg";
import terreno from "../../../public/terreno.jpg";
import calidad from "../../../public/calidad.jpg";

export default function vinedoPage() {
  return (
    <>
      <HeaderImage title="el viñedo" background="/banner-el-vinedo.jpg" />
      <section className="container mx-auto py-16 px-10">
        <h2 className="text-4xl -text--dark-green text-center mb-14">
          EL VIÑEDO
        </h2>
        <Timeline />
      </section>
      <section className="container mx-auto py-16 px-10">
        <h2 className="text-4xl -text--dark-green text-center mb-14">
          VITICULTURA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div
            className="
          shadow-xl hover:shadow-2xl group duration-200"
          >
            <Image
              src={tropico}
              alt="Tropico"
              className="rounded-t-xl mb-6 group-hover:brightness-110 duration-200"
            />
            <p className="px-5 pt-5 pb-10">
              Nuestro viñedo esta ubicado en el tropico a una altura de 2110
              msnm, en una region elegida por tener microclimas ideales para el
              cultivo de la vid.
            </p>
          </div>
          <div
            className="
          shadow-xl hover:shadow-2xl group duration-200"
          >
            <Image
              src={clima}
              alt="Clima"
              className="rounded-t-xl mb-6 group-hover:brightness-110 duration-200"
            />
            <p className="px-5 pt-5 pb-10">
              La viña Ain Karim cuenta con un microclima especial, con días
              frescos y luminosos, temperaturas promedio de 19°C, rayos solares
              intensos y un aire puro y refrescante que favorece la amplitud
              térmica entre el día y la noche.
            </p>
          </div>
          <div
            className="
          shadow-xl hover:shadow-2xl group duration-200"
          >
            <Image
              src={terreno}
              alt="Terreno"
              className="rounded-t-xl mb-6 group-hover:brightness-110 duration-200"
            />
            <p className="px-5 pt-5 pb-10">
              El terreno con el tiempo llega a expresarse y a brindar
              características únicas. Contamos con Suelos pesados, con altos
              contenidos de arcillas, pH de neutro a alcalino, calcáreos con
              presencia de carbonatos de calcio y componentes minerales que
              permiten obtener vendimias con personalidad.
            </p>
          </div>
          <div
            className="
          shadow-xl hover:shadow-2xl group duration-200"
          >
            <Image
              src={calidad}
              alt="Calidad"
              className="rounded-t-xl mb-6 group-hover:brightness-110 duration-200"
            />
            <p className="px-5 pt-5 pb-10">
              La conjunción de estos factores, y la complicidad entre el clima y
              el suelo han contribuido a la obtención de una buena calidad de
              uva, y con esto, poder lograr vinos con aromas, colores y sabores
              intensos y distintivos.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16 px-10">
        <Filantropia />
      </section>
      <section className="container mx-auto py-16 px-10">
        <h2 className="text-4xl -text--dark-green text-center mb-14">
          RECONOCIMIENTOS
        </h2>
        <SliderReconocimientos />
      </section>
    </>
  );
}
