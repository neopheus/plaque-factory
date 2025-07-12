"use client";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";
import React from "react";
import LazyBackgroundSection from "./LazyBackgroundSection";
import { QuestionIcon } from "./Icons";

export default function FaqSectionOptimized() {
  const theme = useTheme();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenIndexes(
      (prevIndexes) =>
        prevIndexes.includes(index)
          ? prevIndexes.filter((i) => i !== index) // Ferme la question si déjà ouverte
          : [...prevIndexes, index] // Ouvre la question si elle est fermée
    );
  };

  return (
    <LazyBackgroundSection
      id="faq"
      backgroundImage="/images/bg/bg.webp"
      className="faq-section relative bg-cover py-10 md:py-14 border-t"
      threshold={0.1}
      rootMargin="100px"
    >
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2 h-full">
          <div className="relative h-full z-40 flex justify-center">
            <Image
              src="/images/illustration.webp"
              alt="Illustration FAQ"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
              width={600}
              height={600}
              className="object-cover rounded-3xl"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 h-fit z-40 text-left">
          <div className="badge badge-sm mb-4 rounded-2xl">
            <QuestionIcon className="w-3 h-3"/><span>FAQ</span>
          </div>
          <h2 className="text-left mb-8">
            <span className="italic">Questions</span> fréquemment posées
          </h2>
          <div className="faq-list h-fit">
            {theme.faq?.items?.map((item, index) => (
              item && (
              <div
                key={index}
                className={`faq-item ${
                  openIndexes.includes(index) ? "open" : ""
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleQuestion(index)}
                  className="faq-question px-4 py-2 gap-5"
                >
                  <span>{item?.question || ""}</span>
                  <span className="faq-toggle">
                    {openIndexes.includes(index) ? "−" : "+"}
                  </span>
                </button>

                {/* Réponse */}
                <div className="faq-answer">
                  <p>{item?.answer || ""}</p>
                </div>
              </div>
              )
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-white/70 to-white pointer-events-none z-0" />
    </LazyBackgroundSection>
  );
}