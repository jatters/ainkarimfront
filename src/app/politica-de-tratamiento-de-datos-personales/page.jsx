import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderImage from "@/components/Ui/HeaderImage";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

async function getPageData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/politica-dato-personal?populate=*`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function PersonalInformationPage() {
  const pageData = await getPageData();
  if (!pageData || !pageData.data) {
    console.error(pageData);
    return (
      <div className="container mx-auto py-16 px-5 text-center">
        No hemos podido cargar la información solicitada, regresa en un momento
      </div>
    );
  }
  const { title, content, image, politica } = pageData.data;

  return (
    <main>
      <HeaderImage
        title={title}
        background={
          image?.url
            ? `${process.env.NEXT_PUBLIC_SITE_URL}${image.url}`
            : "/banner-puntos-de-venta.webp"
        }
      />
      <section className="max-w-screen-lg mx-auto pt-8 pb-12 px-5 prose">
        {content && (
          <div className="mx-auto max-w-screen-lg [&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:-text--dark-green [&>p>a]:underline [&>p>a]:hover:-text--light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
            <BlocksRenderer content={content} />
          </div>
        )}

        {politica.map((politica) => (
          <Accordion key={politica.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <span className="font-bold">{politica.title}</span>
            </AccordionSummary>
            <AccordionDetails className="space-y-3">
              <BlocksRenderer content={politica.content || ""} />
            </AccordionDetails>
          </Accordion>
        ))}
      </section>
    </main>
  );
}
