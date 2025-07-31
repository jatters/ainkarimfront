import { Suspense } from "react";
import SuccessPageClient from "@/components/Ecommerce/SuccessPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SuccessPageClient />
    </Suspense>
  );
}
