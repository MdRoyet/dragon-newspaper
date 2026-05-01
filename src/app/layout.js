import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: {
    default: "Dragon News",
    template: "%s | Dragon News", // This %s gets replaced by the title in NewsDetails
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" date-theme="light">
      <body className={` ${poppins.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
