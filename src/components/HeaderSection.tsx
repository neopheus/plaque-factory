"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useThrottle } from "@/hooks/useThrottle";
import { MedalIcon, ArrowRightIcon } from "@/components/Icons";

export default function HeaderSection() {
  const [, setIsHovered] = useState(false);

  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const layers = parallaxRef.current?.querySelectorAll("[data-depth]");
    layers?.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute("data-depth") || "0");
      const translateY = scrollY * depth * 0.2;
      (
        layer as HTMLElement
      ).style.transform = `translateY(${translateY}px) scale(1.1)`;
    });
  }, []);

  const throttledHandleScroll = useThrottle(handleScroll, 16); // 60fps

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [throttledHandleScroll]);

  return (
    <>

      <header className="relative pt-20 pb-10 md:py-40 items-center bg-white bg-cover bg-center">
        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto min-w-80">
          <div className="text-left lg:w-1/2 space-y-4 pt-6">
            <div className="inline-flex items-center border border-black rounded-full px-2 py-0.5 text-[10px] text-sm bg-white w-fit bg-white/80 backdrop-blur-sm ml-1">
              <Image
                src="/images/icons/france-flag.webp"
                alt="fabrication plaques françaises"
                width={16}
                height={16}
                className="rounded-full mr-2"
              />
              <span>Fabrication française</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-medium text-left">
              Créez votre plaque d’immatriculation personnalisée
            </h1>

            <div className="w-5/6 mb-2 ml-2">
              <p className="text-sm lg:text-base font-light">
                Choisissez facilement votre style, votre format et vos options
                pour créer une plaque homologuée et personnalisée adaptée à
                votre véhicule.
                Livraison rapide, qualité professionnelle <br />
                <span className="font-bold">
                  {" "}
                  — le tout en quelques clics.
                </span>
              </p>
              <p className="mt-4 text-xs mb-6">
                <MedalIcon className="inline w-4 h-4 mr-1" /> Partenaire officiel de{" "}
                <a
                  href="https://plaqueimmat.fr/?aff=9c7pyekcpurn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium hover:text-yellow-300 transition"
                  title="Voir le site de notre partenaire PlaqueImmat.fr"
                >
                  PlaqueImmat.fr
                </a>
              </p>
              <a
                href="https://www.avis-verifies.com/avis-clients/plaqueimmat.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 mt-1 mb-8 hover:text-current"
                title="Lire les avis vérifiés sur PlaqueImmat.fr"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src="/images/trust.webp"
                      alt="Trustpilot star"
                      className="hover:scale-105 w-6 h-6"
                      loading="lazy"
                      width={24}
                      height={24}
                    />
                  ))}
                  <span className="text-lg font-semibold ml-2">4.7</span>
                  <span className="text-sm">(255)</span>
                  <span className="text-sm font-medium ml-1">Excellent</span>
                  <Image
                    src="/images/avis.webp"
                    alt="logo avis vérifiés plaque immatriculation"
                    className="hover:scale-105"
                    loading="lazy"
                    width={20}
                    height={20}
                  />
                </div>
              </a>
            </div>

            <div className="flex flex-row gap-[10px] items-center cta-container">
              <a
                href="#personnalisation"
                className="header-cta bg-yellow-400 text-black font-normal py-4 rounded-lg shadow-lg transition duration-300 inline-flex items-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                title="Créer ma plaque personnalisée maintenant"
              >
                Je crée ma plaque{" "}
                <ArrowRightIcon className="inline w-4 h-4 cta-arrow" />
              </a>
              <a
                href="https://module.plaqueimmat.fr/?aff=cc58d6de-e03b-45b5-b678-0f6103f8d0e6"
                target="_blank"
                rel="noopener noreferrer"
                className="header-cta-2 font-normal px-8 py-4 rounded-lg shadow-lg transition duration-300 inline-flex items-center "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                title="Accéder au module complet de création de plaque"
              >
                Accéder au module complet{" "}
                <ArrowRightIcon className="inline w-4 h-4 cta-arrow-2" />
              </a>
            </div>
          </div>

          <div
            ref={parallaxRef}
            className="relative w-full sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[800px] max-w-none overflow-visible rounded-3xl sm:mt-0 flex justify-center px-6"
          >
            <div className="absolute w-full h-full rounded-full bg-[#FFD812] opacity-10 blur-2xl -z-10"></div>
            <div className="relative w-full max-w-[600px] aspect-[5/3] rounded-3xl floating">
              <Image
                src="/images/header.webp"
                alt="Illustration FAQ"
                priority
                quality={60}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="rounded-3xl object-contain"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white pointer-events-none z-0" />
      </header>
    </>
  );
}
