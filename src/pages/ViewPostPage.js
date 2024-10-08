// src/pages/ViewPostPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import './ViewPostPage.css';

const ViewPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

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
      if (!captchaValue) {
        alert("Please verify the CAPTCHA.");
        return;
      }

      const response = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: id, username: 'User', text: commentText, captcha: captchaValue }), // You can replace 'User' with an actual username from your app
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const updatedPost = await response.json();
      setPost(updatedPost); // Update the post with the new comment
      setCommentText(''); // Clear the comment input
      setCaptchaValue(null); // Reset the captcha value
    } catch (error) {
      console.error("Error adding comment:", error);
      setError(error.message);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="view-post">
      <h1>{post.title}</h1>
      <p>{post.message}</p>

      <h2>Comments</h2>
      {post.comments?.length ? (
        <ul>
          {post.comments.map((comment) => (
            <li key={comment._id}>
              <strong>{comment.username}</strong>: {comment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments found.</p>
      )}

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <ReCAPTCHA
          sitekey="6LcrnVsqAAAAAJPAJ2Dt3Q5k-QPuli55AIQmavpS"
          onChange={handleCaptchaChange}
        />
        <button type="submit">Submit Comment</button>
      </form>
    </div>
  );
};

export default ViewPostPage;

