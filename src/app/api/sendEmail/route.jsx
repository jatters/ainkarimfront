import { NextResponse } from "next/server";
import { GetSendMailsData } from "@/components/GetContentApi";

export async function POST(request) {
  try {
    const {
      formType,
      name,
      email,
      phone,
      reservation,
      reservationDate,
      paymentValue,
      planName,
      paymentMehotd,
      documentType,
      legalDocument,
      message,
      user_agent,
      uuid,
      ip_address,
      terms,
      marketing,
      date,
    } = await request.json();

    const SendData = await GetSendMailsData();
    if (!SendData) {
      return NextResponse.json(
        { message: "Error al obtener datos de envío" },
        { status: 500 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const url = "https://api.brevo.com/v3/smtp/email";
    const SalesMail = SendData?.ventasEmail;
    const ContactMail = SendData?.contactEmail;

    let subject;
    let htmlContent;

    switch (formType) {
      case "contacto":
        subject = `Nuevo mensaje de ${name}`;
        htmlContent = `
          <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #333;">
            <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <div style="text-align: center; margin-bottom: 20px; background-color: #000; padding: 15px 0;">
                <img src="https://ainkarim.co/uploads/logo_ain_karim_9987562b80.png" alt="Logo viñedo Ain Karim" style="width: 350px; height: auto;"/>
              </div>
              <div>
                <p style="text-align:right; font-size:12px"><strong>ID:</strong> ${uuid}</p>
              </div>
              <!-- Title -->
              <h2 style="color: #062f1d; font-size: 18px; margin-top: 0; text-align: center;">
                Has recibido un nuevo mensaje desde la página de contacto, con la siguiente información:
              </h2>

              <!-- Info with Icons -->
              <div style="margin-bottom: 20px;">
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                  <strong>Nombre:</strong> ${name}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="vertical-align: middle; margin-left: 8px;">
                    <path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/>
                  </svg>
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                  <strong>Correo:</strong> ${email}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" style="vertical-align: middle; margin-left: 8px;">
                    <path fill="currentColor" d="M18 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm-4.37 9.1L20 16v-2l-5.12-3.9L20 6V4l-10 8L0 4v2l5.12 4.1L0 14v2l6.37-4.9L10 14z"/>
                  </svg>
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                  <strong>Teléfono:</strong> ${phone}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="vertical-align: middle; margin-left: 8px;">
                    <g fill="currentColor">
                      <path d="M22 12A10 10 0 0 0 12 2v2a8 8 0 0 1 7.391 4.938A8 8 0 0 1 20 12zM2 10V5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H6a8 8 0 0 0 8 8v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5C7.373 22 2 16.627 2 10"/>
                      <path d="M17.543 9.704A6 6 0 0 1 18 12h-1.8A4.2 4.2 0 0 0 12 7.8V6a6 6 0 0 1 5.543 3.704"/>
                    </g>
                  </svg>
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                  <strong>Mensaje:</strong> ${message}
                </p>            
                ${
                  terms
                    ? `<p>                  
                        Autorizo el tratamiento de mis datos para responder a mi
                        mensaje y/o requerimiento presentado por este medio, lo que
                        implica la autorización de contacto a través de e-mail,
                        teléfono, o mensajería instantánea: <strong style="color:#0ead0e">Si Autorizo</strong>
                    </p>`
                    : `<p>                  
                        Autorizo el tratamiento de mis datos para responder a mi
                        mensaje y/o requerimiento presentado por este medio, lo que
                        implica la autorización de contacto a través de e-mail,
                        teléfono, o mensajería instantánea: <strong style="color:#b70b0b">No Autorizo</strong>
                    </p>`
                }
                ${
                  marketing
                    ? `<p>                  
                        Autorizo el tratamiento de mis datos de contacto para
                        informarme de ofertas y lanzamientos exclusivos; invitarme a
                        eventos y en general realizar actos de marketing y/o
                        publicidad por contacto a través de e-mail, teléfono, y/o
                        mensajería instantánea: <strong style="color:#0ead0e">Si Autorizo</strong>
                    </p>`
                    : `<p>                  
                        Autorizo el tratamiento de mis datos de contacto para
                        informarme de ofertas y lanzamientos exclusivos; invitarme a
                        eventos y en general realizar actos de marketing y/o
                        publicidad por contacto a través de e-mail, teléfono, y/o
                        mensajería instantánea: <strong style="color:#b70b0b">No Autorizo</strong>
                    </p>`
                }
                
              </div>
              <!-- Footer Text -->
              <p style="font-size: 14px; line-height: 1.5; color: #6c757d; text-align: center; margin-top: 20px;">
                Este mensaje fue enviado desde la web de Ainkarim.co
              </p>          
            </div>
          </div>`;
        break;

      case "Reembolso":
        subject = `Solicitud de reembolso en la reserva de ${reservation}`;
        htmlContent = `
        <div style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #333;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 20px; background-color: #000; padding: 15px 0;">
              <img src="https://ainkarim.co/uploads/logo_ain_karim_9987562b80.png" alt="Logo viñedo Ain Karim" style="width: 350px; height: auto;"/>
            </div>
            <div>
              <p style="text-align:right; font-size:12px"><strong>ID:</strong> ${uuid}</p>
            </div>
            <!-- Title -->
            <h2 style="color: #062f1d; font-size: 18px; margin-top: 0; text-align: center;">
              Has recibido una solicitud de reembolso, con la siguiente información:
            </h2>
  
            <!-- Info with Icons -->
            <div style="margin-bottom: 20px;">
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Nombre:</strong> ${name}                 
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Celular:</strong> ${phone}                
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Correo:</strong> ${email}                
              </p>              
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Tipo de documento:</strong> ${documentType}                
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Documento:</strong> ${legalDocument}                
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Número de reserva:</strong> ${reservation}                
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Fecha de reserva:</strong> ${reservationDate}                
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Plan:</strong> ${planName}                
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Valor pagado:</strong> ${paymentValue}                
              </p>
              <p style="font-size: 16px; line-height: 1.5; margin-bottom: 10px;">
                <strong>Método de pago:</strong> ${paymentMehotd}                
              </p>           
              ${
                terms
                  ? `<p>                  
                      Autorizo el tratamiento de mis datos para responder a mi
                      mensaje y/o requerimiento presentado por este medio, lo que
                      implica la autorización de contacto a través de e-mail,
                      teléfono, o mensajería instantánea: <strong style="color:#0ead0e">Si Autorizo</strong>
                  </p>`
                  : `<p>                  
                      Autorizo el tratamiento de mis datos para responder a mi
                      mensaje y/o requerimiento presentado por este medio, lo que
                      implica la autorización de contacto a través de e-mail,
                      teléfono, o mensajería instantánea: <strong style="color:#b70b0b">No Autorizo</strong>
                  </p>`
              }              
            </div>
            <!-- Footer Text -->
            <p style="font-size: 14px; line-height: 1.5; color: #6c757d; text-align: center; margin-top: 20px;">
              Este mensaje fue enviado desde la web de Ainkarim.co
            </p>          
          </div>
        </div>
      `;
        break;

      default:
        return NextResponse.json(
          { message: "Tipo de formulario no reconocido." },
          { status: 400 }
        );
    }
    const body = JSON.stringify({
      sender: {
        email: "no-reply@ainkarim.co",
        name: "Viñedo Ain Karim",
      },
      to: Array.isArray(ContactMail)
        ? ContactMail.map((email) => ({ email }))
        : [{ email: ContactMail }],
      subject: subject,
      htmlContent: htmlContent,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: body,
    });

    if (response.ok) {
      return NextResponse.json(
        { message: "Correo enviado correctamente" },
        { status: 200 }
      );
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { message: `Error al enviar el correo: ${errorData.message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      {
        message: "Hubo un problema al procesar la solicitud",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
