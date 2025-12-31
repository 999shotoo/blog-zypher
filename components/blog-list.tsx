"use client"

import Link from 'next/link';
import { useState, useMemo } from 'react';
import type { Post } from '@/lib/posts';

interface BlogListProps {
  posts: Post[];
}

const POSTS_PER_PAGE = 5;

export function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.date.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="search posts..."
            className="w-full px-4 py-2 font-mono text-sm border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-ring transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-xs px-2 py-1 text-muted-foreground hover:text-foreground"
            >
              [clear]
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Posts List */}
      {currentPosts.length > 0 ? (
        <div className="flex flex-col gap-[30px] md:gap-[25px] sm:gap-5">
          {currentPosts.map((post) => (
            <article key={post.slug} className="border-l-[3px] border-border pl-[15px] sm:pl-3 transition-colors hover:border-foreground">
              <time className="font-mono text-[13px] text-muted-foreground block mb-1.5">{post.date}</time>
              <h2 className="text-2xl md:text-[21px] sm:text-[19px] xs:text-lg font-bold leading-tight m-0">
                <Link href={`/post/${post.slug}`} className="text-[#0000ee] dark:text-[#6b9eff] no-underline visited:text-[#551a8b] dark:visited:text-[#b48eff] hover:underline">
                  {post.title}
                </Link>
              </h2>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="font-mono text-sm text-muted-foreground">
            No posts found matching "{searchQuery}"
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 pt-8 border-t-2 border-border">
          <div className="flex items-center justify-center gap-2 font-mono text-sm">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border-2 border-border bg-background text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              [prev]
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 border-2 transition-colors ${
                    currentPage === page
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border-2 border-border bg-background text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              [next]
            </button>
          </div>
          <p className="text-center mt-3 font-mono text-xs text-muted-foreground">
            page {currentPage} of {totalPages}
          </p>
        </div>
      )}
    </>
  );
}
