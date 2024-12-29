import React, { useState } from 'react';
import './AddNotice.css';

const AddNoticePage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleAddNotice = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      if (attachment) formData.append('attachment', attachment);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/notices`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to add notice');

      alert('Notice added successfully!');
      setTitle('');
      setBody('');
      setAttachment(null);
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  return (
    <div className="add-notice-page">
      <h2>Add Notice</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter notice title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter notice body"
        />
      </div>
      <div className="form-group">
        <label htmlFor="attachment">Attachment</label>
        <input
          type="file"
          id="attachment"
          onChange={(e) => setAttachment(e.target.files[0])}
        />
      </div>
      <button className="add-btn" onClick={handleAddNotice}>
        Add Notice
      </button>
    </div>
  );
};

export default AddNoticePage;
