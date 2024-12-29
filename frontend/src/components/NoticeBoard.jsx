import React, { useState } from 'react';
import './NoticeBoard.css';

function NoticeBoard({ notices, onDelete }) {
  const [selectedNotice, setSelectedNotice] = useState(null);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
  };

  const closePanel = () => {
    setSelectedNotice(null);
  };

  return (
    <div className="notice-board">
      <h2>Notice Board</h2>
      <div className="notice-grid">
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="notice-card"
            onClick={() => handleNoticeClick(notice)}
          >
            <h3>{notice.title}</h3>
            <p>{notice.body.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {selectedNotice && (
        <div className="slide-panel">
          <div className="slide-panel-header">
            <h3>{selectedNotice.title}</h3>
            <button onClick={closePanel} className="close-btn">
              Close
            </button>
          </div>
          <div className="slide-panel-body">
            <p>{selectedNotice.body}</p>
            {selectedNotice.attachment && (
              <a
                href={`http://localhost:5000/${selectedNotice.attachment}`}
                target="_blank"
                rel="noreferrer"
                download
                className="download-btn"
              >
                Download Attachment
              </a>
            )}
          </div>
          <div className="slide-panel-footer">
            <button
              className="delete-btn"
              onClick={() => {
                onDelete(selectedNotice._id);
                closePanel();
              }}
            >
              Delete Notice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;
