import ReembolsoForm from "@/components/Forms/ReembolsoForm";

export default function ReembolsoPage() {
  return (
    <main>
      <section className="container mx-auto py-16 px5">
        <h1 className="-text--dark-green text-4xl font-bold text-center mb-12 ">
          SOLICITUD DE DEVOLUCIÓN DE DINERO
        </h1>
        <p className="max-w-screen-md mx-auto mb-10 text-center">
          Diligencia el siguiente formulario para realizar la solicitu del
          tramite de tu dinero, es importante tener en cuenta que el tiempo
          estimado para realizar la devolución de tu dinero es de 15 días:
        </p>
        <ReembolsoForm />
      </section>
    </main>
  );
}
