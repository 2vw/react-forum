// src/pages/CreatePage.js
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import HamburgerMenu from '../HamburgerCode';  // Import the hamburger menu component
import '../HamburgerMenu.css';  // Import the CSS for styling the hamburger
import '../App.css';

function CreatePage() {
  const [formData, setFormData] = useState({ title: '', message: '', tags: '' });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify the CAPTCHA.");
      return;
    }

    // Handle form submission
    console.log("Form Data Submitted: ", formData);
    console.log("Captcha Token: ", captchaValue);

    // Add your API call here to save the thread with tags
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          message: formData.message,
          tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [], // Only add tags if provided
          comments: [],
          captcha: captchaValue,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ title: '', message: '', tags: ''}); // Reset form data
      } else {
        alert('Failed to create thread. Please try again.');
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="App">
      <main>
        {formSubmitted ? (
          <div className="form-submitted">
            <p>Thank you! Your form has been submitted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <h1>Create A Thread</h1>
            </div>
            <h3>Title</h3>
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <h3>Message</h3>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            <h3>Tags (comma separated)</h3>
            <div>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g. React, JavaScript, Web Development"
              />
            </div>
            <ReCAPTCHA
              sitekey="6LcrnVsqAAAAAJPAJ2Dt3Q5k-QPuli55AIQmavpS"
              onChange={onCaptchaChange}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </main>
    </div>
  );
}

export default CreatePage;
