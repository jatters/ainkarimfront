import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { getStrapiData } from "@/lib/strapi";

export default async function FAQ() {
  const faqs = await getStrapiData("faqs?fields[0]=title&fields[1]=asnwer");
  if (!faqs) {
    console.error("Error fetching FAQS");
    return <div>Error cargando preguntas frecuentes</div>;
  }
  return (
    <div
      className="max-w-3xl px-5 mx-auto py-10 "
      aria-label="Preguntas frecuentes"
    >
      {faqs.map((faq) => (
        <Accordion key={faq.documentId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className="font-bold text-dark-green hover:text-light-green duration-200">
              {faq.title}
            </h3>
          </AccordionSummary>
          <AccordionDetails>
            <div className=" [&>p]:leading-7 prose [&>p]:mb-4 [&>p]:-text--dark-gray [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-3 [&>h2]:-text--dark-gray [&>h3]:mb-2 [&>h3]:font-semibold [&>h3]:-text--dark-gray [&>h3]:text-xl [&>h4]:text-lg [&>h4]:-text--dark-gray [&>h4]:mb-1 [&>h4]:font-semibold [&>img]:mx-auto [&>strong]:-text--dark-gray [&>p>a]:text-dark-green [&>p>a]:underline [&>p>a]:hover:text-light-green [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-5 [&>ul]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:list-inside ">
              <BlocksRenderer content={faq.asnwer || ""} />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
