import React, { useState } from 'react';

const CommentForm = ({ postId, setPost }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const currentUser = { id: 'user_anonymous' }; // Replace with auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, user_id: currentUser.id }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const newComment = await response.json();
      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));
      setContent('');
      setSuccess('Comment added successfully!');
      setError(null);
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-4">
      {error && (
        <p className="text-sm text-[var(--neon-red)] mb-2">{error}</p>
      )}
      {success && (
        <p className="text-sm text-[var(--acid-green)] mb-2">{success}</p>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 bg-[var(--main-bg)] border border-[var(--neon-purple)] rounded text-[var(--white-smoke)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--neon-purple)]"
          required
        />
        <button
          type="submit"
          className="px-3 py-1 bg-[var(--neon-purple)] text-[var(--white-smoke)] rounded font-semibold hover:bg-[var(--soft-violet)] hover:shadow-[0_0_10px_var(--pink-glow)] transition-all duration-300"
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentForm;