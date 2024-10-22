import HeaderImage from "@/components/Ui/HeaderImage";
import Timeline from "@/components/Ui/Timeline";
import Viticultura from "@/components/Ui/Viticultura";
import Filantropia from "@/components/Ui/Filantropia";
import SliderReconocimientos from "@/components/SliderReconocimientos";
import { GetAboutUs } from "@/components/GetContentApi";

export default async function vinedoPage() {
  const data = await GetAboutUs();
  if (!data || !data.data) {
    console.log("Error fetching about us info page");
    return <div>Error cargando la información</div>;
  }

  const { title, timeline, viticultura, filantropia, slider, cover } =
    data.data;

  return (
    <>
      <HeaderImage
        title={title}
        background={`${process.env.NEXT_PUBLIC_STRAPI_URL}${cover.url}`}
      />
      <section className="container mx-auto py-16 px-10">
        <h2 className="text-4xl -text--dark-green text-center mb-14 uppercase">
          {title}
        </h2>
        {timeline && <Timeline timeline={timeline} />}
      </section>

      {viticultura && <Viticultura viticultura={viticultura} />}

      {filantropia && <Filantropia filantropia={filantropia} />}

      {slider && <SliderReconocimientos reconocimientos={slider} />}
    </>
  );
}
