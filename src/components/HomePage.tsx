// components/HomePage.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { defaultTheme } from "@/config/themes/default.theme";
import Navbar from "../components/Navbar";
import HeaderSection from "../components/HeaderSection";
import PersonalizationSection from "../components/PersonalizationSection";
import Footer from "../components/FooterWithLazyBg";
import PersonalizationSectionOptimized from "./PersonalizationSectionOptimized";
import CategoriesSectionOptimized from "./CategoriesSectionOptimized";
import AboutSectionOptimized from "../components/AboutSectionOptimized";
import FaqSectionOptimized from "./FaqSectionOptimized";
import BlogSectionOptimized from "./BlogSectionOptimized";

// Lazy load heavy components
const FeedbackSection = dynamic(() => import("../components/FeedbackSection"), {
  loading: () => <SectionSkeleton />,
});

const CategoriesSection = dynamic(() => import("../components/CategoriesSection"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const AboutSection = dynamic(() => import("../components/AboutSectionOptimized"), {
  loading: () => <SectionSkeleton />,
});

const FaqSection = dynamic(() => import("../components/FaqSection"), {
  loading: () => <SectionSkeleton />,
});

const VideoSection = dynamic(() => import("../components/VideoSectionOptimized"), {
  loading: () => <SectionSkeleton />,
});

const BlogSection = dynamic(() => import("@/components/BlogSectionServer"), {
  loading: () => <SectionSkeleton />,
});

// Simple loading skeleton
function SectionSkeleton() {
  return (
    <div className="animate-pulse bg-gray-100 h-96 w-full">
      <div className="h-full flex items-center justify-center">
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-48"></div>
          <div className="h-4 bg-gray-300 rounded w-64"></div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const theme = defaultTheme;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LABONNEPLAQUE.fr",
    url: "https://www.labonneplaque.fr",
    logo: "https://www.labonneplaque.fr/logo.png",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        className="min-h-screen"
        style={{ background: theme.colors.primary.gradient }}
      >
        <Navbar />
        <HeaderSection />
        <PersonalizationSectionOptimized />
        
        <Suspense fallback={<SectionSkeleton />}>
          <FeedbackSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <CategoriesSectionOptimized />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <AboutSectionOptimized />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <FaqSectionOptimized />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <VideoSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <BlogSectionOptimized />
        </Suspense>
        
        <Footer />
      </main>
    </>
  );
}
