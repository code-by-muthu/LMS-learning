import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts'); // Replace with your API endpoint
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-[var(--white-smoke)]">Loading posts...</p>;
  if (error) return <p className="text-center text-[var(--neon-red)]">{error}</p>;

  return (
    <div className="bg-[var(--main-bg)] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)] text-center">
          Blog Posts
        </h1>
        {posts.length === 0 ? (
          <p className="text-[var(--white-smoke)] text-center opacity-80">No posts yet. Create one!</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[var(--dark-charcoal)] p-4 rounded-lg shadow-[0_0_15px_var(--blue-glow)]"
              >
                <h2 className="text-lg font-bold text-[var(--electric-blue)]">{post.title}</h2>
                <p className="text-[var(--white-smoke)] opacity-80 mt-2">
                  {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
                </p>
                <p className="text-xs text-[var(--white-smoke)] opacity-60 mt-2">
                  Posted by User {post.user_id} on {new Date(post.created_at).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-[var(--neon-pink)]">Likes: {post.likes || 0}</span>
                  <span className="text-[var(--neon-purple)]">Comments: {post.comments?.length || 0}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-[var(--acid-green)] hover:text-[var(--cyber-yellow)]"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;