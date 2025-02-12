import { Suspense } from "react";
import ResetPasswordPage from "@/components/ResetPasswordPage";


export default function ForgetPasswordPage() {
  

  return (
    <Suspense fallback={<p>Cargando formulario...</p>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
