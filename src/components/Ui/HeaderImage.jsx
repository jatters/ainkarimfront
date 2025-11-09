import Breadcrumbs from "./Breadcrumbs";

export default function HeaderImage({ title = "", background = "" }) {
  return (
    <section
      style={{ "--image-url": `url(${background})` }}
      className={`bg-(image:--image-url) bg-no-repeat bg-cover bg-gray-500 flex flex-col py-8 lg:py-28`}
    >
      <h1 className="text-center text-2xl lg:text-5xl font-bold mb-2 lg:mb-8 text-white uppercase">
        {title}
      </h1>
      <span className="text-white text-center">
        <Breadcrumbs title={title} />
      </span>
    </section>
  );
}
