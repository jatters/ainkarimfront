import { Montserrat, Marcellus } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Header from "@/components/Ui/Header";
import Footer from "@/components/Ui/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { ViewTransitions } from "next-view-transitions";

export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const marcellus = Marcellus({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-marcellus",
});

export const metadata = {
  title: "Viñedo Ain Karim",
  description: "Generated by create next app",
};

export default function RootLayout(props) {
  return (
    <ViewTransitions>
      <html lang="es">
        <body
          className={`${montserrat.variable} ${marcellus.variable} antialiased`}
        >
          <CartProvider>
            <Header />
            <AppRouterCacheProvider>{props.children}</AppRouterCacheProvider>
            <Footer />
          </CartProvider>
          <Toaster position="bottom-left" />
        </body>
      </html>
    </ViewTransitions>
  );
}
