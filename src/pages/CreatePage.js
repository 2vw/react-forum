import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import HamburgerMenu from '../HamburgerCode'; // Import the hamburger menu component
import '../HamburgerMenu.css'; // CSS for hamburger menu
import '../App.css';

function CreatePage() {
  const [formData, setFormData] = useState({ title: '', message: '' });
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

    // Prepare data for submission
    const messageData = {
      title: formData.title,
      message: formData.message,
    };

    try {
      // Send POST request to the backend API
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        const result = await response.json();
        document.getElementById("view-post").href = `/view/${result._id}`;
        console.log("Form Data Submitted: ", result);
        setFormSubmitted(true);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <div className="App">
      <main>
        {formSubmitted ? (
          <div className="form-submitted">
            <a id="view-post">View Post</a>
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
                name="title"  // Ensure this matches the key in your state
                value={formData.title}  // Update to formData.title
                onChange={handleInputChange}
                required
              />
            </div>
            <h3>Text</h3>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
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
