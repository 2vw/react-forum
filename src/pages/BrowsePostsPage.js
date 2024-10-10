// src/pages/BrowsePostsPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingModal from '../components/LoadingModal';
import SearchBar from '../components/SearchBar';
import io from 'socket.io-client'; // Import socket.io-client
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

    fetchPosts(); // Initial fetch

    // Initialize socket connection to the server
    const socket = io('http://localhost:5000'); // Ensure this matches your server URL

    // Listen for new posts from the server
    socket.on('newPost', (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]); // Add new post to the front of the array
      setFilteredPosts((prevFiltered) => [newPost, ...prevFiltered]); // Update filtered posts
    });

    return () => {
      socket.disconnect(); // Cleanup on component unmount
    };
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredPosts(posts); // Reset to all posts if query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.message.toLowerCase().includes(lowerCaseQuery) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))) // Search by tags
      );
      setFilteredPosts(filtered);
    }
  };

  const truncateMessage = (message) => {
    const words = message.split(' ');
    return words.length > 15 ? words.slice(0, 15).join(' ') + '...' : message;
  };

  if (loading) {
    return <div>{loading && <LoadingModal />} {/* Show modal if loading is true */}</div>;
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
          {filteredPosts.map(post => {
            const now = new Date();
            const postDate = new Date(post.createdAt);
            const timeDifference = (now - postDate) / 1000 / 60 / 60;
            const isNew = timeDifference < 12; // Check if post is under 12 hours old

            return (
              <div className="post-card" key={post._id}>
                <h2>{post.title}</h2>
                <p>{truncateMessage(post.message)}</p> {/* Truncated message */}
                <div className="post-author">{post.author && `By: ${post.author}`}</div>
                {post.tags && post.tags.length > 0 && ( // Conditionally render tags
                  <p className="post-tags">#{post.tags.join(', #')}</p>
                )}
                <div className="post-footer">
                  {isNew && post.newBadge && ( // Check if post is new and newBadge exists
                    <span className="new-badge">New</span>
                  )}
                  <Link to={`/view/${post._id}`} className="view-post-link">View Post</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


export default BrowsePostsPage;
