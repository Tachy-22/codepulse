import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import { fetchDocument } from "@/actions/firebase/fetchDocument";
import { cookies } from "next/headers";
import UserDataProvider from "@/providers/UserDataProvider";
import { User } from "@/types";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/components/Footer";
import HeroUiProvider from "@/providers/HeroUiProvider";

interface UserData extends User {
  [key: string]: unknown;
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodePulse",
  description: "Your code snippet hub. Created by Jeff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const userIdFromCookie = cookieStore.get("userId")?.value;

  let userData = null;
  const userId = userIdFromCookie;
  console.log({ userId });
  if (userId) {
    const result = await fetchDocument<UserData>("users", userId);
    if (result && "data" in result) {
      userData = result;
    }
  }

  console.log({ userData });
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased dark:bg-black bg-white`}
      >
        <StoreProvider>
          <UserDataProvider user={userData}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {" "}
              <HeroUiProvider>
                <Navbar />
                <div className="h-full   ">{children}</div>
                <Footer />
              </HeroUiProvider>
            </ThemeProvider>
          </UserDataProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
