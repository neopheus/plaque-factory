"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import BlogCard from "@/components/BlogCard";
import { BlogIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightIcon } from "./Icons";

// 🪐 Embla Carousel imports
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type Article = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category?: {
    name: string;
  }[];
};

// Move Supabase client outside component to prevent recreation
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BlogSectionOptimized() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize autoplay plugin configuration
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplayPlugin]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Memoize fetch function
  const fetchArticles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("Article")
        .select(
          "id, slug, title, description, image, category:categoryId(name)"
        )
        .order("createdAt", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Erreur Supabase :", error);
        return;
      }

      setArticles(data || []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Memoize navigation callbacks
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Memoize processed articles
  const processedArticles = useMemo(
    () =>
      articles.map((article) => ({
        ...article,
        category: article.category?.[0],
      })),
    [articles]
  );

  if (isLoading) {
    return (
      <section className="blog-section md:text-center bg-white py-10 md:pb-20 md:pt-14">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mx-auto mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-20 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="blog"
      className="blog-section md:text-center bg-white py-10 md:pb-20 md:pt-14"
    >
      <div className="badge badge-sm mb-4 rounded-2xl">
        <BlogIcon className="w-3 h-3" />
        <span>Blog</span>
      </div>
      <h2 className="text-left md:text-center">
        Le coin des <span className="italic">passionnés</span>
      </h2>
      <p className="max-w-2xl mx-auto mb-12">
        Découvrez nos astuces, histoires insolites et conseils pratiques autour
        des plaques d'immatriculation et du monde automobile. <br />
        Bonne lecture et bonne route !
      </p>
      <div className="mx-auto">
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <Link
            href="/blog"
            role="button"
            className="bg-white border border-black text-black hover:bg-black hover:text-white transition-colors duration-200 px-6 py-2 rounded-lg flex items-center gap-2"
          >
            Voir tous les articles{" "}
            <ArrowRightIcon className="w-4 h-4"/>
          </Link>
        </div>

        <div className="mx-auto">
          <div className="flex justify-between items-center max-w-6xl lg:max-w-7xl mx-auto mb-4 px-2 md:px-8 lg:px-6">
            <button
              onClick={scrollPrev}
              className="text-black p-2 border border-black w-6 h-6 md:w-10 md:h-10 flex justify-center items-center rounded-[100%] hover:bg-neutral-800 transition mx-2"
              aria-label="Article précédent"
            >
              <ChevronLeftIcon />
            </button>
            <div
              className="overflow-hidden w-full max-w-5xl md:max-w-2xl lg:max-w-5xl px-6"
              ref={emblaRef}
            >
              <div className="flex gap-5">
                {processedArticles.map((article) => (
                  <div
                    key={article.id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                  >
                    <BlogCard article={article} />
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollNext}
              className="text-black p-2 border border-black w-6 h-6 md:w-10 md:h-10 flex justify-center items-center mx-2 rounded-[100%] hover:bg-neutral-800 transition"
              aria-label="Article suivant"
            >
              <ChevronRightIcon />
            </button>
          </div>
          <div className="embla-dots mt-6 flex justify-center items-center gap-4">
            {articles.map((_, index) => (
              <button
              title="Boutons de slider"
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-1 h-1 rounded-full transition-colors ${
                  selectedIndex === index
                    ? "bg-black/10 w-4 h-2"
                    : "bg-gray-100"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
