
import { Suspense } from "react";
import FailurePageClient from "@/components/Ecommerce/FailurePageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FailurePageClient />
    </Suspense>
  );
}
    