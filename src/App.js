import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CreatePage from './pages/CreatePage';
import BrowsePostsPage from './pages/BrowsePostsPage';
import ViewPostPage from './pages/ViewPostPage'; // Import View Post Page
import NotFoundPage from './pages/NotFoundPage';
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
            <Route path="/view/:id" element={<ViewPostPage />} /> {/* New Route for Viewing Post */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
