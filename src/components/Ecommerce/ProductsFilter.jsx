import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function ProductsFilter({ onCepasChange, onCategoriasChange }) {
  return (
    <div>
      {/* Secciones de filtro para vinos */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold capitalize -text--dark-green">Cepa</span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["Cabernet", "Chardonnay", "Merlot", "Pinot Noir", "Syrah"].map(
              (cepa) => (
                <FormControlLabel
                  key={cepa}
                  control={
                    <Checkbox
                      sx={{ "&.Mui-checked": { color: "#00af50" } }}
                      onChange={(e) => onCepasChange(cepa, e.target.checked)}
                    />
                  }
                  label={cepa}
                />
              )
            )}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold capitalize">Color</span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["Blanco", "Rosado", "Tinto"].map(color => (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox 
                    color="default" 
                    onChange={(e) => onCepasChange(color, e.target.checked)} 
                  />
                }
                label={color}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion> */}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <span className="font-semibold capitalize -text--dark-green">Categorías</span>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["Vinos", "Acompañamientos", "Souvenirs"].map((categoria) => (
              <FormControlLabel
                key={categoria}
                control={
                  <Checkbox
                    onChange={(e) =>
                      onCategoriasChange(categoria, e.target.checked)
                    }
                    sx={{ "&.Mui-checked": { color: "#00af50" } }}
                  />
                }
                label={categoria}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Otros filtros pueden añadirse de manera similar */}
    </div>
  );
}
