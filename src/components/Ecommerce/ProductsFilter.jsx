import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ProductsFilter() {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <span className="font-semibold capitalize">Vinos</span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="default" />}
              label="Tintos"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#000000",
                    "&.Mui-checked": {
                      color: "#ff0000",
                    },
                  }}
                />
              }
              label="Blancos"
            />
            <FormControlLabel
              control={<Checkbox color="default" />}
              label="Rosados"
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className="font-semibold capitalize">Categorias</span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="Vinos" />
            <FormControlLabel control={<Checkbox />} label="Acompañamientos" />
            <FormControlLabel control={<Checkbox />} label="Sourvenirs" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className="font-semibold capitalize">Cepa</span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="default" />}
              label="Malbec"
            />
            <FormControlLabel control={<Checkbox />} label="Merlot" />
            <FormControlLabel control={<Checkbox />} label="Cabernet" />
            <FormControlLabel control={<Checkbox />} label="Syrah" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
