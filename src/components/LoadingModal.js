import React from 'react';
import './LoadingModal.css'; // Import the CSS for modal styling

const LoadingModal = () => {
  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal-content">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
