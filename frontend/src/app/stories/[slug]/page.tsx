// src/app/stories/[slug]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { allStories } from "@/data/stories";

// Next.js 15+ compatibility
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allStories.map((story) => ({
    slug: story.slug,
  }));
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = allStories.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="mb-6">
          <span className="inline-block uppercase tracking-wider text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-800 rounded-full mb-3">
            {story.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight">
            {story.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100 text-sm text-gray-600 mb-8">
          <div className="flex items-center gap-2"><User className="w-4 h-4" /> {story.author}</div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {story.date}</div>
          <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {story.readTime}</div>
        </div>

        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg mb-10 bg-gray-100">
          <Image src={story.image} alt={story.title} fill className="object-cover" />
        </div>

        <div className="space-y-6">
          {story.content.map((paragraph, idx) => (
            <p key={idx} className="text-lg leading-8 text-gray-800">{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
