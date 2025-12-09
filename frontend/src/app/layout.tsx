import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Targetym AI - Transformez vos RH avec l'Analytique People",
  description: "Plateforme d'analytique RH alimentée par l'IA pour optimiser votre personnel et améliorer les performances de votre équipe.",
  keywords: "RH, analytique, IA, ressources humaines, performance, OKR, évaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#3B82F6',
          colorBackground: '#ffffff',
          colorInputBackground: '#f8fafc',
          colorInputText: '#1e293b',
          borderRadius: '8px'
        },
        elements: {
          formButtonPrimary: 'bg-blue-500 hover:bg-blue-600 text-white font-medium',
          card: 'shadow-xl border-0',
          headerTitle: 'text-blue-600 font-bold text-2xl',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
          dividerLine: 'bg-gray-200',
          dividerText: 'text-gray-500 text-sm'
        }
      }}
    >
      <html lang="fr">
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-white`}
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
