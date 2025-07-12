"use client";

import React, { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-10 md:py-16 text-left bg-white w-full">
      <div className="max-w-3xl mx-auto lg:flex flex-col justify-center">
        <div className="badge badge-sm mb-4 rounded-2xl mx-auto">
          <i className="fa fa-play"></i>
        </div>
        <h2 className="text-left lg:text-center lg:max-w-lg mx-auto">
          Découvrez notre
          <span className="text-[#FFD713]"> savoir-faire</span> en action
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-left lg:text-center">
          Chaque commande est préparée avec précision et passion pour vous
          fabriquer une plaque d'immatriculation conforme, stylée et prête à
          poser sans prise de tête.
        </p>
        <div ref={ref} className="overflow-hidden rounded-2xl shadow-md border border-gray-200 p-1 mx-auto relative">
          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
              aria-label="Lire la vidéo"
            >
              <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                <svg
                  className="w-12 h-12 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </button>
          )}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload={inView ? "metadata" : "none"}
            poster="/images/video-poster.webp"
            controls={isPlaying}
            className="rounded-xl shadow-lg w-full max-w-4xl mx-auto"
          >
            <source src="/videos/ugc-optimized.webm" type="video/webm" />
            <source src="/videos/ugc-optimized.mp4" type="video/mp4" />
            Votre navigateur ne prend pas en charge cette vidéo...
          </video>
        </div>
      </div>
    </section>
  );
}
