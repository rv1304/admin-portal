import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NoticeBoard from './components/NoticeBoard.jsx';
import AddNoticePage from './components/AddNotice.jsx';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/noticeboard" className="nav-link">Notice Board</Link>
          <Link to="/add-notice" className="nav-link">Add Notice</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<h1>Welcome to the Admin Portal</h1>}
          />
          <Route
            path="/noticeboard"
            element={<NoticeBoardPage />}
          />
          <Route
            path="/add-notice"
            element={<AddNoticePage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const NoticeBoardPage = () => {
  const [notices, setNotices] = React.useState([]);

  const fetchNotices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notices`);
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const deleteNotice = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notices/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete notice');

      setNotices(notices.filter((notice) => notice._id !== id));
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  React.useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div>
      <h1>Notice Board</h1>
      <NoticeBoard notices={notices} onDelete={deleteNotice} />
    </div>
  );
};

export default App;
