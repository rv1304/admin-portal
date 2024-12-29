import React from 'react';
import './NoticeList.css'; // Import the new CSS file

function NoticeList({ notices, onDelete }) {
  return (
    <div className="notice-list">
      <h2>Notices</h2>
      <ul>
        {notices.map((notice) => (
          <li key={notice._id}>
            <h3>{notice.title}</h3>
            <p>{notice.body}</p>
            {notice.attachment && (
              <a href={`http://localhost:5002/${notice.attachment}`} target="_blank" rel="noreferrer">
                View Attachment
              </a>
            )}
            <button onClick={() => onDelete(notice._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticeList;
