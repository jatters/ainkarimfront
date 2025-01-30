import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function filantropia({ filantropia }) {
  return (
    <section className="container mx-auto pb-16 px-10">
      <h2 className="text-4xl -text--dark-green text-center mb-14">
        FILANTROPÍA
      </h2>
      <div className="space-y-10">
        {filantropia.map((item, index) => (
          <div
            className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-x-14 gap-y-5 items-center shadow-xl sm:py-10 sm:px-10 rounded-xl"
            key={item.documentId ? item.documentId : index}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_SITE_URL}${item.image.url}`}
              alt={
                item.image.alternativeText
                  ? item.image.alternativeText
                  : `Imagen ${item.title}`
              }
              loading="lazy"
              width={700}
              height={700}
              className="rounded-t-lg lg:rounded-lg"
            />
            <div className="space-y-5 py-5 lg:py-10 px-10 prose">
              <h3 className="text-3xl -text--dark-green mb-7">{item.title}</h3>
              <ReactMarkdown>{item.description}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
