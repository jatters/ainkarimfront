// app/checkout/success/page.jsx
import { Suspense } from "react";
import SuccessPageClient from "@/components/Ecommerce/SuccessPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando la página de éxito...</div>}>
      <SuccessPageClient />
    </Suspense>
  );
}
