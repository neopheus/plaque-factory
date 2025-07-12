"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CategoryItem } from "@/types/theme";
import { useState, useEffect, memo } from "react";
import { defaultTheme } from "@/config/themes/default.theme";
import { CategoryIcon } from "./Icons";

// Lazy load framer-motion
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { 
    ssr: false,
    loading: () => <div className="opacity-0" />
  }
);

const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

function Categories() {
  // Use default theme directly to avoid context issues
  const categories: CategoryItem[] = defaultTheme.categories.items;
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay animation loading
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="catégories"
      className="relative py-10 md:py-14 flex flex-col items-start lg:items-center bg-[url('/images/bg/bg5.webp')] bg-cover border-t border-b"
    >
      <div className="lg:flex flex-col justify-center">
        <div className="badge badge-sm mb-4 rounded-2xl mx-auto">
          <CategoryIcon className="w-3 h-3"/><span>Catégories</span>
        </div>
        <h2 className="text-left lg:text-center">
          On a la plaque <br />
          <span className="italic">qu'il vous faut</span>
        </h2>
        <p className="lg:text-center mb-4 md:mb-8 max-w-2xl">
          Si ça roule, on a la plaque d'immatriculation qui va avec. Parcourez
          nos catégories et trouvez la plaque parfaite pour votre véhicule, en
          quelques clics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto z-10 mt-4">
        {isVisible ? (
          <AnimatePresence>
            {categories.map((category, index) => {
              // Pattern spécifique sur lg :
              // ligne 1: 0->span-2, 1->span-1, 2->span-1
              // ligne 2: 3->span-1, 4->span-1, 5->span-2
              // ligne 3: 6->span-2, 7->span-1, 8->span-1
              let colSpan = "col-span-1";
              if (index === 0 || index === 5 || index === 6) {
                colSpan = "lg:col-span-2";
              }

              return (
                <MotionDiv
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`relative rounded-xl overflow-hidden group shadow-md ${colSpan}`}
                >
                  <Image
                    src={`/images/categories/${category.image}`}
                    alt={category.title}
                    width={400}
                    height={240}
                    quality={60}
                    loading="lazy"
                    className="object-cover w-full h-60 transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-opacity-20 bg-black/20 group-hover:bg-yellow-50/10 group-hover:bg-opacity-40 transition cursor-pointer"></div>
                  <div className="absolute bottom-3 left-3 text-white drop-shadow z-20">
                    <h3 className="text-xl text-left font-bold uppercase">
                      {category.title}
                    </h3>
                    <p className="text-sm">{category.sizes}cm</p>
                  </div>
                </MotionDiv>
              );
            })}
          </AnimatePresence>
        ) : (
          // Static fallback while framer-motion loads
          categories.map((category, index) => {
            // Pattern spécifique sur lg :
            // ligne 1: 0->span-2, 1->span-1, 2->span-1
            // ligne 2: 3->span-1, 4->span-1, 5->span-2
            // ligne 3: 6->span-2, 7->span-1, 8->span-1
            let colSpan = "col-span-1";
            if (index === 0 || index === 5 || index === 6) {
              colSpan = "lg:col-span-2";
            }

            return (
              <div
                key={category.id}
                className={`relative rounded-xl overflow-hidden group shadow-md ${colSpan}`}
              >
                <Image
                  src={`/images/categories/${category.image}`}
                  alt={category.title}
                  width={400}
                  height={240}
                  quality={60}
                  loading="lazy"
                  className="object-cover w-full h-60 transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-opacity-20 bg-black/20 group-hover:bg-yellow-50/10 group-hover:bg-opacity-40 transition cursor-pointer"></div>
                <div className="absolute bottom-3 left-3 text-white drop-shadow z-20">
                  <h3 className="text-xl text-left font-bold uppercase">
                    {category.title}
                  </h3>
                  <p className="text-sm">{category.sizes}cm</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default memo(Categories);