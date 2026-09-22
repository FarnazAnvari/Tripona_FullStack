// src/app/stories/page.tsx
import { allStories } from "@/data/stories";
import Link from "next/link";
import Image from "next/image";

export default function StoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-8">All Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allStories.map((story) => (
          <Link href={story.link} key={story.id} className="group border rounded-2xl p-4 hover:shadow-lg transition">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              {/* حالا چون آدرس عکس درست است، نمایش داده می‌شود */}
              <Image src={story.image} alt={story.title} fill className="object-cover" />
            </div>
            <h2 className="text-xl font-bold">{story.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
