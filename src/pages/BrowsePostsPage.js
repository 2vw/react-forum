// src/pages/BrowsePostsPage.js
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import './BrowsePostsPage.css'; // Import the CSS file for styling

const BrowsePostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/fetch'); // Adjust this endpoint if necessary
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data); // Set filtered posts initially to all posts
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredPosts(posts); // Reset to all posts if query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.message.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredPosts(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="browse-posts">
      <h1>Browse Posts</h1>
      <SearchBar onSearch={handleSearch} /> {/* Include the search bar */}
      {filteredPosts.length === 0 ? ( // Check if filtered posts are empty
        <div className="no-posts">No posts found...</div>
      ) : (
        <div className="posts-grid">
          {filteredPosts.map(post => (
            <div className="post-card" key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.message}</p>
              <a href={`/view/${post._id}`} className="view-post-link">View Post</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePostsPage;
