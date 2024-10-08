import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CreatePage from './pages/CreatePage';
import BrowsePostsPage from './pages/BrowsePostsPage';
import ViewPostPage from './pages/ViewPostPage'; // Import View Post Page
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Logout from './pages/Logout';
import ProtectedPage from './pages/ProtectedPage';
import HamburgerMenu from './HamburgerCode';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <HamburgerMenu />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/browse" element={<BrowsePostsPage />} />
            <Route path="/view/:id" element={<ViewPostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/protected" element={<ProtectedPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
