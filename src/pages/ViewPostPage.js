// src/pages/ViewPostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewPostPage.css';
import '../components/LoadingModal.css';
import LoadingModal from '../components/LoadingModal';

const ViewPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fetch?id=${id}`);
        if (!response.ok) {
          throw new Error("Post not found");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: id, username: 'User', text: commentText }), // You can replace 'User' with an actual username from your app
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const updatedPost = await response.json();
      setPost(updatedPost); // Update the post with the new comment
      setCommentText(''); // Clear the comment input
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>{loading && <LoadingModal />} {/* Show modal if loading is true */}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <div className="view-post">
        <div class="post-title">
          <h1>{post.title}</h1>
        </div>
        <div class="post-message">
          <p>{post.message}</p>
        </div>
      </div>
      <div class="comments-section">
        <h2 class="comments">Comments</h2>
        <ul class="comments-list">
          {post.comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.username}</strong>: {comment.text}
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleCommentSubmit}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Submit Comment</button>
      </form>
    </div>
  );};

export default ViewPostPage;
