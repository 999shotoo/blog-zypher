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
      
      <div className="max-w-[680px] mx-auto px-5 py-5 min-h-screen flex flex-col sm:px-[15px] xs:px-3">
      <header className="sticky top-0 bg-background z-[100] border-b-2 border-border pb-5 mb-10 pt-5 -mt-5 sm:pb-[15px] sm:mb-[30px]">
        <div className="flex items-center justify-between mb-5">
          <Link href="/" className="font-mono text-sm text-[#0000ee] dark:text-[#6b9eff] no-underline inline-block hover:underline">
            ← back to home
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-[28px] md:text-2xl sm:text-[21px] font-bold leading-tight mb-2 text-foreground">{post.title}</h1>
        <time className="font-mono text-[13px] text-muted-foreground">{post.date} || anonymous</time>
      </header>

      <main className="flex-1 mb-10 text-[17px] md:text-base sm:text-[15px] xs:text-sm leading-[1.7] prose-retro">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
      </main>

      <footer className="border-t-2 border-border pt-5 mt-10 text-center">
        <Link href="/" className="font-mono text-sm text-[#0000ee] dark:text-[#6b9eff] no-underline inline-block hover:underline">
          ← back to all posts
        </Link>
      </footer>
    </div>
    </>
  );
}
