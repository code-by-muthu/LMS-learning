import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const currentUser = { id: 'user_anonymous' }; // Replace with auth context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, user_id: currentUser.id }),
      });
      if (!response.ok) throw new Error('Failed to create post');
      setSuccess('Post created successfully!');
      setTitle('');
      setContent('');
      setError(null);
      setTimeout(() => {
        setSuccess(null);
        navigate('/blog');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-[var(--main-bg)] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)] text-center">
          Create New Post
        </h1>
        {error && (
          <p className="text-sm text-[var(--neon-red)] text-center mt-4">{error}</p>
        )}
        {success && (
          <p className="text-sm text-[var(--acid-green)] text-center mt-4">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="bg-[var(--dark-charcoal)] p-4 sm:p-6 rounded-lg shadow-[0_0_15px_var(--blue-glow)] mt-6">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-purple)]"
            required
          />
          <textarea
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-4 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-purple)]"
            rows="6"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[var(--acid-green)] text-[var(--dark-charcoal)] rounded-md font-semibold hover:bg-[var(--cyber-yellow)] hover:shadow-[0_0_15px_var(--green-glow)] transition-all duration-300"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;