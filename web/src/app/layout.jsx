import { Geist, Geist_Mono, IBM_Plex_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";
const ibm = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
});
const monster = Montserrat({
  variable: "--font-most",
  subsets: ["latin"],
});
export const metadata = {
  title: "Annocat - Visually Capture, Annotate, Organize, Share",
  description: "Annocat helps you visually bookmark, annotate, organize, and share web content with a beautiful dashboard and Chrome extension.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐈</text></svg>"
        />
      </head>
      <body
        className={`${ibm.className} ${monster.variable} antialiased selection:bg-teal-500 selection:text-black`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
