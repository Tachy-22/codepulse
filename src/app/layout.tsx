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

// Determine the base URL for metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://codepulse-kohl.vercel.app' // Your actual production domain
    : 'http://localhost:3000');

export const metadata: Metadata = {
  title: {
    default: "CodePulse | Code Snippet Sharing Platform",
    template: "%s | CodePulse"
  },
  description: "Discover, share and collaborate on code snippets with developers worldwide",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: 'website',
    siteName: 'CodePulse',
    locale: 'en_US',
    url: baseUrl,
    title: "CodePulse | Code Snippet Sharing Platform",
    description: "Discover, share and collaborate on code snippets with developers worldwide",
    images: [
      {
        url: `${baseUrl}/api/og?title=CodePulse`,
        width: 1200,
        height: 630,
        alt: "CodePulse Platform"
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@entekume_j',
    title: "CodePulse | Code Snippet Sharing Platform",
    description: "Discover, share and collaborate on code snippets with developers worldwide",
    images: [`${baseUrl}/api/og?title=CodePulse`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased dark:bg-black bg-white `}
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

// Add this to your existing .env.local file or create it if it doesn't exist:
// NEXT_PUBLIC_BASE_URL=http://localhost:3000
// In production, set this to your actual domain
