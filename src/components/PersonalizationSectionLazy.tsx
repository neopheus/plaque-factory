"use client";
import { useState, useEffect, memo, useCallback, useMemo } from "react";
import React from "react";
import LazyBackgroundSection from "./LazyBackgroundSection";

const IFRAME_LOAD_TIMEOUT = 5000;
const PROGRESS_UPDATE_INTERVAL = 100;

function PersonalizationSectionLazy() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [progress, setProgress] = useState(0);

  // Memoize iframe URL
  const iframeUrl = useMemo(
    () => "https://deploy-preview-384--module-plaqueimmat.netlify.app/361?iframe=1",
    []
  );

  // Memoize progress style
  const progressStyle = useMemo(
    () => ({ "--value": progress } as React.CSSProperties),
    [progress]
  );

  // Memoize iframe class
  const iframeClassName = useMemo(
    () => `iframe-content${iframeLoaded ? " loaded bg-white shadow-md" : ""} w-full border-none`,
    [iframeLoaded]
  );

  // Memoize callbacks
  const handleIframeLoad = useCallback(() => {
    setIframeLoaded(true);
  }, []);

  const retryIframeLoad = useCallback(() => {
    console.log("Retrying iFrame load...");
    setRetryKey((prev) => prev + 1);
  }, []);

  // Progress effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!iframeLoaded) {
      const start = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const percentage = Math.min((elapsed / IFRAME_LOAD_TIMEOUT) * 100, 100);
        setProgress(Math.floor(percentage));
      }, PROGRESS_UPDATE_INTERVAL);
    } else {
      setProgress(100);
    }

    return () => clearInterval(interval);
  }, [iframeLoaded, retryKey]);

  // Retry effect
  useEffect(() => {
    if (iframeLoaded) return;

    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        retryIframeLoad();
      }
    }, IFRAME_LOAD_TIMEOUT);

    return () => clearTimeout(timer);
  }, [iframeLoaded, retryKey, retryIframeLoad]);

  return (
    <LazyBackgroundSection
      id="personnalisation"
      backgroundImage="/images/bg/bg.webp"
      className="section-personnalisation bg-cover py-10 md:pt-14 text-center border-t border-b"
      threshold={0.1}
      rootMargin="50px"
    >
      <div className="personnalisation-container max-w-7xl m-auto">
        <div className="max-w-2xl text-left lg:text-center mx-auto">
          <div className="badge badge-sm mb-4 rounded-2xl">
            <i className="fa fa-magic text-white"></i>Personnalisation
          </div>
          <h2 className="text-left lg:text-center">
            Personnalisez votre plaque{" "}
            <span className="block">
              en toute <span className="text-[#FFD713]">simplicité</span>
            </span>
          </h2>
          <div className="max-w-xl mx-auto leading-relaxed mt-4 lg:text-center">
            <p>
              Votre plaque d'immatriculation en 3 clics : entrez votre numéro, votre département
              et ajoutez au panier, c&apos;est parti !
              <span className="block">
                Envie de plus d'options de personnalisations ? Cliquez sur
                &ldquo;Plus d'options&rdquo; pour tout personnaliser selon vos
                envies.
              </span>
            </p>
          </div>
        </div>

        {!iframeLoaded && (
          <LoadingOverlay progress={progress} progressStyle={progressStyle} />
        )}

        <div className="iframe-wrapper relative mt-8">
          <iframe
            key={retryKey}
            src={iframeUrl}
            onLoad={handleIframeLoad}
            className={iframeClassName}
            allowFullScreen
            loading="lazy"
            title="Module de personnalisation de plaque d'immatriculation"
          />
        </div>
      </div>
    </LazyBackgroundSection>
  );
}

// Memoized loading overlay component
const LoadingOverlay = memo(({ progress, progressStyle }: {
  progress: number;
  progressStyle: React.CSSProperties;
}) => (
  <div className="iframe-loader flex flex-col justify-center items-center gap-4 absolute inset-0 z-10 bg-white/80">
    <div
      className="radial-progress text-black"
      style={progressStyle}
      aria-valuenow={progress}
      role="progressbar"
    >
      {progress}%
    </div>
    <span className="text-sm text-gray-500">
      Chargement du module...
    </span>
  </div>
));

LoadingOverlay.displayName = "LoadingOverlay";

export default memo(PersonalizationSectionLazy);