import { getCachedAllArticles, getCachedArticleBySlug, type Article } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

export const revalidate = 3600; // Revalidate every hour

// ✅ Nouveau typage compatible Next.js 15
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getCachedArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [article.image],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

// Ajouter avant l'export default
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

// ✅ Utilisation de Promise<{ slug }> pour compatibilité avec PageProps
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCachedArticleBySlug(slug);
  if (!article) return notFound();
  const allArticles = await getCachedAllArticles();
  const otherArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div>
      <Navbar />
      <main className="bg-gray-50 pb-10 pt-24 md:py-32">
        <div className="mx-auto max-w-3xl px-2 md:py-10">
          <section className="mb-20">
            <div className="max-w-7xl mb-8">
              <nav className="text-sm text-gray-500">
                <Link href="/" className="hover:underline text-blue-700">
                  Accueil
                </Link>
                <span className="mx-2">›</span>
                <Link href="/blog" className="hover:underline text-blue-700">
                  Blog
                </Link>
                <span className="mx-2">›</span>
                <span className="text-gray-700">{article.title}</span>
              </nav>
            </div>
            <h1 className="text-4xl font-bold text-left">
              {article.title}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              {article.author && (
                <>
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={70}
                    height={70}
                    className="rounded-full"
                    quality={70}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/images/placeholder.png"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      Publié par {article.author.name}
                    </p>
                    <p className="text-sm font-light">{article.author.bio}</p>
                    <p className="text-sm font-light">
                      {formatDate(article.createdAt)}
                    </p>
                  </div>
                </>
              )}
            </div>
            <Image
              src={article.image}
              alt={article.title}
              width={800}
              height={400}
              className="rounded-lg w-full mb-6"
              loading="lazy"
              quality={70}
              placeholder="blur"
              blurDataURL="/images/placeholder.png"
            />
            <p className="text-lg text-gray-700 mb-6">{article.description}</p>
            <div className="prose prose-lg text-left leading-relaxed [&_h3]:text-left [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:leading-snug">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </section>
        </div>
        <section className="mb-10 max-w-6xl flex flex-col justify-center mx-auto border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold mb-6 pl-2">Articles récents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {otherArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-white hover:text-black border border-black transition"
            >
              Retour à la page Blog
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

