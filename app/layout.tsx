import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Lenis from "./_components/Lenis";
import { UserContextProvider } from "./context/UserContext";
import { Bounce, ToastContainer } from "react-toastify";

const jostFont = Jost({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krist - Online Clothing Shop",
  description:
    "Discover the latest fashion trends at Krist. Shop our wide selection of clothing and accessories for men and women.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jostFont.className} antialiased min-h-dvh overflow-x-hidden relative`}
      >
        <Lenis>
          <UserContextProvider>{children}</UserContextProvider>
        </Lenis>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
