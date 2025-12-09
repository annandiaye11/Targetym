import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Import du header simple au lieu du Clerk
import SimpleHeader from '@/components/layout/header-simple'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Targetym AI - Optimisation Marketing Intelligente",
  description: "Optimisez vos campagnes marketing avec l'intelligence artificielle. Targetym AI vous aide à maximiser votre ROI et convertir plus efficacement.",
  keywords: "marketing, intelligence artificielle, optimisation, ROI, conversion, automatisation",
  authors: [{ name: "Targetym AI Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Header simple temporaire */}
        <SimpleHeader />
        
        {/* Contenu principal avec padding pour le header fixe */}
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
