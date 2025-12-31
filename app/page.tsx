import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { ThemeToggle } from '@/components/theme-toggle';
import { BlogList } from '@/components/blog-list';
import { generateWebSiteSchema } from '@/lib/schema';

export default function Home() {
  const posts = getAllPosts();
  const schema = generateWebSiteSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="max-w-[680px] mx-auto px-5 py-5 min-h-screen flex flex-col md:px-4 sm:px-3 xs:px-2">
      <header className="border-b-2 border-border pb-5 mb-10 sm:pb-4 sm:mb-8">
        <div className="flex items-center justify-between mb-1.5">
          <h1 className="font-mono text-3xl lg:text-[32px] md:text-[28px] sm:text-2xl xs:text-xl font-bold text-foreground">~/blog</h1>
          <ThemeToggle />
        </div>
        <p className="text-sm md:text-[13px] sm:text-xs text-muted-foreground italic">thoughts and observations</p>
      </header>

      <main className="flex-1 mb-10">
        <BlogList posts={posts} />
      </main>

      <footer className="border-t-2 border-border pt-5 mt-10 text-center sm:pt-4 sm:mt-8">
        <p className="font-mono text-[13px] md:text-xs sm:text-[11px] text-muted-foreground">© 2025 - Simple thoughts, simple words</p>
      </footer>
    </div>
    </>
  );
}
