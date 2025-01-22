import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function Viticultura({ viticultura }) {
  return (
    <section className="container mx-auto pb-16 px-10">
      <h2 className="text-4xl -text--dark-green text-center mb-14">
        VITICULTURA
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {viticultura.map((item, index) => (
          <div
            className="
            shadow-xl hover:shadow-2xl group duration-200"
            key={item.documentId ? item.documentId : index}
          >
            <div className="relative h-48 sm:h-80 md:h-96">
              <Image
                src={`${process.env.NEXT_PUBLIC_SITE_URL}${item.image.url}`}
                alt={
                  item.image.alternativeText
                    ? item.image.alternativeText
                    : `Imagen ${item.title}`
                }
                className="rounded-t-xl mb-6 group-hover:brightness-110 duration-200 w-full h-full"
                fill={true}
                style={{ objectFit: "cover" }}
              />
            </div>
            <h3 className="-text--dark-green text-center font-semibold text-xl mt-5 md:hidden">
              {item.title}
            </h3>
            <ReactMarkdown className="px-5 pt-5 pb-10 ">
              {item.description}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    </section>
  );
}
