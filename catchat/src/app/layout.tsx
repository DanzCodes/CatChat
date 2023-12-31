import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import { CacheProvider } from "../../components/chakra-next-components";
import { Box, ChakraProvider } from "../../components/chakra-client-components";
import "./page.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CatChat",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CacheProvider>
          <ChakraProvider>
            <Navbar />
            <Box bg="#232323">{children}</Box>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
