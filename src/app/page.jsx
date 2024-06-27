import HeroCoverHome from "@/components/Ui/HeroCoverHome";
import Link from "next/link";
import PlansHome from "@/components/Ui/PlansHome";
import ProductsHome from "@/components/Ui/ProductsHome";

export default function homepage() {
  return (
    <>
      <HeroCoverHome />
      {/* <section className="container mx-auto pt-16 pb-14">
        <h2 className="text-5xl font-extrabold text-center -text--dark-green">
          VIVE NUESTRAS EXPERIENCIAS
        </h2>
        <p className="text-xl text-center mt-5">Conoce nuestros planes</p>
        <PlansHome />
        <div className="flex justify-center">          
          <Link
            href="/visitas"
            className="-bg--dark-green rounded-md text-white px-6 py-4 text-lg font-medium mt-8 hover:-bg--light-green transition duration-300"
          >
            Ver todos nuestros planes
          </Link>
        </div>
      </section> */}
      <section className="bg-slate-100">
        <div className="container mx-auto pt-16 pb-14">
          <h2 className="text-5xl font-extrabold text-center -text--dark-green mb-10">
            CONOCE NUESTROS PRODUCTOS
          </h2>
          <ProductsHome />
          <div className="flex justify-center">
            <Link href="/productos" className="-bg--dark-green rounded-md text-white px-6 py-4 text-lg font-medium mt-8 hover:-bg--light-green transition duration-300">
              Ver todos nuestros productos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
