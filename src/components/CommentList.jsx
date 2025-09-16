import React, { useState, useEffect } from 'react';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch comments for the post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}/comments`);
        if (!response.ok) throw new Error('Failed to fetch comments');
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  if (loading) return <p className="text-[var(--white-smoke)] text-sm">Loading comments...</p>;
  if (error) return <p className="text-[var(--neon-red)] text-sm">{error}</p>;

  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-lg font-semibold text-[var(--neon-purple)]">Comments</h3>
      {comments.length === 0 ? (
        <p className="text-[var(--white-smoke)] opacity-60 text-sm">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-[var(--main-bg)] p-3 rounded border border-[var(--neon-purple)] shadow-[0_0_5px_var(--pink-glow)]"
          >
            <p className="text-[var(--white-smoke)] text-sm">{comment.content}</p>
            <p className="text-xs text-[var(--white-smoke)] opacity-60 mt-1">
              Commented by User {comment.user_id} on {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;