import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import type { Metadata } from 'next';
import { generateBlogPostingSchema } from '@/lib/schema';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Extract first 160 characters of content for description
  const description = post.content.replace(/[#*`\[\]]/g, '').slice(0, 160) + '...';

  return {
    title: post.title,
    description: description,
    keywords: [post.title, 'blog', 'article', 'programming', 'technology'],
    authors: [{ name: 'Anonymous' }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: description,
      publishedTime: post.date,
      authors: ['Anonymous'],
      url: `https://zypher.ooguy.com/post/${slug}`, // Replace with your actual domain
      images: [
        {
          url: '/og-image.png', // You can create post-specific images later
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `https://zypher.ooguy.com/post/${slug}`, // Replace with your actual domain
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Generate structured data
  const description = post.content.replace(/[#*`\[\]]/g, '').slice(0, 160) + '...';
  const schema = generateBlogPostingSchema(post.title, post.date, description, slug);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="max-w-[680px] mx-auto px-5 py-5 min-h-screen flex flex-col md:px-4 sm:px-3 xs:px-2">
      <header className="sticky top-0 bg-background z-[100] border-b-2 border-border pb-5 mb-10 pt-5 -mt-5 sm:pb-4 sm:mb-8">
        <div className="flex items-center justify-between mb-5 sm:mb-4">
          <Link href="/" className="font-mono text-sm md:text-[13px] sm:text-xs text-[#0000ee] dark:text-[#6b9eff] no-underline inline-block hover:underline">
            ← back to home
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-[28px] lg:text-[26px] md:text-2xl sm:text-xl xs:text-lg font-bold leading-tight mb-2 text-foreground">{post.title}</h1>
        <time className="font-mono text-[13px] md:text-xs sm:text-[11px] text-muted-foreground">{post.date} || anonymous</time>
      </header>

      <main className="flex-1 mb-10 text-[17px] lg:text-base md:text-[15px] sm:text-sm xs:text-[13px] leading-relaxed prose-retro">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
      </main>

      <footer className="border-t-2 border-border pt-5 mt-10 text-center sm:pt-4 sm:mt-8">
        <Link href="/" className="font-mono text-sm md:text-[13px] sm:text-xs text-[#0000ee] dark:text-[#6b9eff] no-underline inline-block hover:underline">
          ← back to all posts
        </Link>
      </footer>
    </div>
    </>
  );
}
