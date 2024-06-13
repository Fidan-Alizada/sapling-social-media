import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import AnalyticsPage from './pages/AnalyticsPage';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
