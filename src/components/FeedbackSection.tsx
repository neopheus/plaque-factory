"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { StarIcon } from "./Icons";

export default function FeedbackSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);
  
  const reviews = [
    {
      text: "Super service, jai commandé ma plaque d’immatriculation personnalisée directement en ligne, la qualité en plexiglass est top et l’expédition a été rapide. Je recommande à tout ceux qui veulent une plaque homologué et esthétique pour leur voiture.",
      author: "Yassine B",
      imgSrc: "/images/authors/yassine.avif"
    },
    {
      text: "Le configurateur est très simple et j’ai pu personnaliser ma plaque auto en quelques clics. Résultat impeccable, merci !",
      author: "Max VH",
      imgSrc: "/images/authors/max.avif"
    },
    {
      text: "Très satisfaite de mon achat sur labonneplaque.fr, j’avais besoin d’une plaque moto homologuée et personnalisée...le site est clair, les plaques conformes, et la livraison ultra rapide. Un site au top pour créer ses plaques d’immatriculation en ligne.",
      author: "Sabine Joliveau",
      imgSrc: "/images/authors/sabine.avif"
    },
    {
      text: "Site très intuitif ! J’ai pu créer ma plaque en quelques minutes, avec exactement le design que je voulais. Livraison rapide et produit conforme. Bravo !",
      author: "Julie Robert",
      imgSrc: "/images/authors/julie.avif"
    },
    {
      text: "Commande facile et rapide, plaque conforme à la législation et très bien emballée. Je recommande vivement.",
      author: "Nicolas B.",
      imgSrc: "/images/authors/nicolas.avif"
    },
    {
      text: "Enfin un site clair pour commander ses plaques ! Les options sont nombreuses, et le rendu final est top. Livraison en 48h comme promis.",
      author: "Camille Larcher",
      imgSrc: "/images/authors/camille.avif"
    },
    {
      text: "Très bon service client. J’avais fait une erreur de personnalisation, ils ont été réactifs et ont corrigé avant l’envoi. Résultat impeccable.",
      author: "Laurent TRZ",
      imgSrc: "/images/authors/laurent.avif"
    },
    {
      text: "Parfait du début à la fin. Le module de personnalisation est très bien fait, et les plaques sont de qualité premium.",
      author: "Chloé Desbois",
      imgSrc: "/images/authors/chloe.avif"
    },
    {
      text: "J’ai commandé pour mon van aménagé, et je suis ravi. La plaque donne un look unique. Tout était nickel.",
      author: "Axel T.",
      imgSrc: "/images/authors/axel.avif"
    },
    {
      text: "Service rapide, site ergonomique et prix compétitif. Rien à redire. Je repasserai par vous sans hésiter.",
      author: "Sophie Volard",
      imgSrc: "/images/authors/sophie.avif"
    }
  ];

  return (
    <section className="w-full bg-white py-10 md:pt-14 md:pb-20 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto lg:text-center">
        <div className="badge badge-sm mb-4 rounded-2xl border-white/10">
          <StarIcon className="w-4 h-4"/><span>Avis</span>
        </div>
        <h2 className="text-left lg:text-center">
          Ce que <span className="italic">nos clients</span> en disent
        </h2>
        <p className="mb-8 md:mb-12">
          Ils ont testé <span className="italic">La Bonne Plaque</span> et ils en parlent mieux que nous. <br />Qualité, rapidité...Découvrez leurs avis sans filtre !
        </p>
      </div>

      <div className="max-w-5xl mx-auto overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
              <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition ease-in-out min-h-[300px]">
                <div className="flex items-center mb-4">
                  <div className="avatar">
                    <div className="w-10 h-10 relative rounded-full ring ring-gray-200 ring-offset-2 overflow-hidden">
                      <Image
                        src={review.imgSrc}
                        alt={review.author}
                        fill
                        sizes="48px"
                        loading="lazy"
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="text-left ml-3">
                    <p className=" text-gray-700 font-semibold">{review.author}</p>
                  </div>
                </div>
                <div className="flex items-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="fas fa-star text-sm w-4 h-4"/>
                  ))}
                </div>
                <p className="text-gray-600 text-sm line-clamp-6">
                  {review.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla-dots mt-6 flex justify-center items-center gap-4">
        {reviews.map((_, index) => (
          <button
          title="Boutons de slider"
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-1 h-1 rounded-full transition-colors ${
              selectedIndex === index ? "bg-black/10 w-4 h-2" : "bg-gray-100"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
