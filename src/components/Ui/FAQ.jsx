import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetFaqs } from "../GetContentApi";

export default async function FAQ() {
  const faqs = await GetFaqs();
  return (
    <div className="max-w-3xl px-5 mx-auto py-10">
      {faqs.data.map((faq) => (
        <Accordion key={faq.documentId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <h3 className="font-bold -text--dark-green hover:-text--light-green">
              {faq.title}
            </h3>
          </AccordionSummary>
          <AccordionDetails>{faq.content}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
