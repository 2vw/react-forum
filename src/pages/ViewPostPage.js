// src/pages/ViewPostPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/fetch?id=${id}`); // Adjust endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="view-post">
      <h1>{post.title}</h1>
      <p>{post.message}</p>
      {post.tags && post.tags.length > 0 && ( // Conditionally render tags
        <p className="post-tags">{post.tags.join(', ')}</p>
      )}
      {/* Add comments and other functionalities here */}
    </div>
  );
};

export default ViewPostPage;
