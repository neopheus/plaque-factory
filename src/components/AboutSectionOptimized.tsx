"use client";

import React, { memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { HouseIcon } from "@/components/Icons";


// Lazy load CountUp component
const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => <span>0</span>,
});

// Memoized stat component
const StatItem = memo(({ end, suffix, label, inView, separator }: {
  end: number;
  suffix: string;
  label: string;
  inView: boolean;
  separator?: string;
}) => (
  <div className="flex flex-col">
    <span className="text-3xl md:text-4xl font-bold">
      <CountUp 
        end={inView ? end : 0} 
        duration={2} 
        suffix={suffix} 
        separator={separator}
        enableScrollSpy
        scrollSpyOnce
      />
    </span>
    <span className="mt-1">{label}</span>
  </div>
));

StatItem.displayName = "StatItem";

function AboutSection() {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    { end: 8, suffix: "+", label: "Années d'expérience" },
    { end: 100000, suffix: "+", label: "Plaques vendues", separator: "," },
    { end: 99, suffix: "%", label: "Avis positifs" },
    { end: 75000, suffix: "+", label: "Clients satisfaits", separator: "," },
  ];

  return (
    <section id="about" className="pt-10 md:pt-14 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Texte gauche */}
        <div className="max-w-lg">
          <div className="badge badge-sm mb-4 rounded-2xl">
            <HouseIcon className="w-3 h-3" /><span>À propos</span>
          </div>
          <h2 className="text-left">
            La Bonne Plaque,
            <span className="block"> votre <span className="italic">expert</span> en plaques qui roulent.</span>
          </h2>
          <div className="flex flex-col">
            <p className="italic">
              Depuis plus de 8 ans, nous créons des plaques d&apos;immatriculation de
              qualité, homologuées et personnalisées pour tous les passionnés
              d&apos;automobile. Votre véhicule mérite ce qu&apos;il y a de mieux, livré
              rapidement, avec le souci du détail.
            </p>
            <Image
              src="/images/authors/signature.webp"
              alt="Signature de Fabien"
              width={200}
              height={20}
              className="self-start mt-8"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-2 gap-6 py-10">
            {stats.map((stat, index) => (
              <StatItem 
                key={index}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                inView={inView}
                separator={stat.separator}
              />
            ))}
          </div>
        </div>

        {/* Photo droite */}
        <div className="overflow-hidden w-full max-w-md flex items-end self-end">
          <Image
            src="/images/authors/fabien.webp"
            alt="Fabien"
            width={400}
            height={400}
            className="w-full"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>
    </section>
  );
}

export default memo(AboutSection);