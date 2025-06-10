import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ProductsFilter({
  cepas,
  categorias,
  onCepasChange,
  onCategoriasChange,
}) {
  return (
    <div className="px-5 space-y-5">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold capitalize -text--dark-green">
            Cepas
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {cepas.map(({ id, name }) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    sx={{ "&.Mui-checked": { color: "#00af50" } }}
                    onChange={(e) => onCepasChange(id, e.target.checked)}
                  />
                }
                label={name}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold capitalize -text--dark-green">
            Categorías
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categorias.map(({ id, name }) => (
              <FormControlLabel
                key={id}
                control={
                  <Checkbox
                    sx={{ "&.Mui-checked": { color: "#00af50" } }}
                    onChange={(e) => onCategoriasChange(id, e.target.checked)}
                  />
                }
                label={name}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
