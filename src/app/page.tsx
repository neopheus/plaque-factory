import type { Metadata } from 'next'
import HomePageOptimized from '@/components/HomePageOptimized'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Plaques d’immatriculation personnalisées et homologuées",
    description: "Créez votre plaque d'immatriculation personnalisée et homologuée en quelques clics. Livraison rapide, qualité pro, large choix de styles pour votre véhicule.",
    alternates: {
      canonical: "https://www.labonneplaque.fr/",
    },
    openGraph: {
      title: "Plaques personnalisées et homologuées | LABONNEPLAQUE.fr",
      description: "Personnalisez votre plaque d'immatriculation facilement. Livraison rapide, qualité premium et création en ligne.",
      url: "https://www.labonneplaque.fr/",
      siteName: "La Bonne Plaque",
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: "https://www.labonneplaque.fr/favicon.png",
          width: 1200,
          height: 630,
          alt: "Plaque d'immatriculation personnalisée",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Plaques personnalisées et homologuées | LABONNEPLAQUE.fr",
      description: "Commandez votre plaque d'immatriculation personnalisée et homologuée. Livraison rapide, création simple en ligne.",
      images: ["https://www.labonneplaque.fr/favicon.png"],
    },
  }
}

export default function Page() {
  return <HomePageOptimized />
}