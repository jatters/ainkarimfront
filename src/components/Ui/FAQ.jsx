import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

async function fetchFaqs() {
  const url = `${process.env.STRAPI_URL}/api/faqs`;
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error(error);
  }
}

export default async function FAQ() {
  const faqs = await fetchFaqs();
  return (
    <div className="max-w-3xl px-5 mx-auto py-10">
      {faqs.map((faq) => (
        <Accordion key={faq.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className="font-bold -text--dark-green hover:-text--light-green">
              {faq.attributes.title}
            </h3>
          </AccordionSummary>
          <AccordionDetails>{faq.attributes.content}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
