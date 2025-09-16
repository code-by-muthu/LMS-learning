import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const BlogPostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const currentUser = { id: 'user_anonymous' }; // Replace with auth context

  // Fetch post and check if user has liked it
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await fetch(`/api/posts/${postId}`);
        if (!postResponse.ok) throw new Error('Failed to fetch post');
        const postData = await postResponse.json();
        setPost(postData);

        const likesResponse = await fetch(`/api/posts/${postId}/likes`);
        if (!likesResponse.ok) throw new Error('Failed to fetch likes');
        const likesData = await likesResponse.json();
        setHasLiked(likesData.some((like) => like.user_id === currentUser.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  // Handle like/unlike
  const handleLikeToggle = async () => {
    try {
      const method = hasLiked ? 'DELETE' : 'POST';
      const response = await fetch(`/api/posts/${postId}/likes`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.id }),
      });
      if (!response.ok) throw new Error(`Failed to ${hasLiked ? 'unlike' : 'like'} post`);
      setHasLiked(!hasLiked);
      setPost((prev) => ({
        ...prev,
        likes: hasLiked ? (prev.likes || 1) - 1 : (prev.likes || 0) + 1,
      }));
      setSuccess(hasLiked ? 'Like removed!' : 'Like added!');
      setTimeout(() => setSuccess(null), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center text-[var(--white-smoke)]">Loading post...</p>;
  if (error) return <p className="text-center text-[var(--neon-red)]">{error}</p>;
  if (!post) return <p className="text-center text-[var(--white-smoke)]">Post not found</p>;

  return (
    <div className="bg-[var(--main-bg)] min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--neon-pink)] [text-shadow:0_0_20px_var(--pink-glow)]">
          {post.title}
        </h1>
        {success && (
          <p className="text-sm text-[var(--acid-green)] text-center">{success}</p>
        )}
        <p className="text-[var(--white-smoke)] opacity-80">{post.content}</p>
        <p className="text-xs text-[var(--white-smoke)] opacity-60">
          Posted by User {post.user_id} on {new Date(post.created_at).toLocaleDateString()}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLikeToggle}
            className={`flex items-center gap-2 ${
              hasLiked ? 'text-[var(--neon-red)]' : 'text-[var(--neon-pink)]'
            } hover:text-[var(--aqua-glow)] transition-all duration-300`}
          >
            <FaHeart className="text-sm" /> {hasLiked ? 'Unlike' : 'Like'} ({post.likes || 0})
          </button>
        </div>
        <CommentList postId={postId} />
        <CommentForm postId={postId} setPost={setPost} />
      </div>
    </div>
  );
};

export default BlogPostPage;