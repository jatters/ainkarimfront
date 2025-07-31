import { Suspense } from "react";
import PendingPageClient from "@/components/Ecommerce/PendingPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PendingPageClient />
    </Suspense>
  );
}
