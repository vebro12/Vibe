/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import './Commentmodel.css';

const CommentModal = ({ isOpen, onClose, comments, onCommentSubmit }) => {
  if (!isOpen) return null;

  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit({ text: commentText }); 
      setCommentText(''); 
    }
  };

  return (
    <div className="commentModal">
      <div className="commentModalContent">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Comment</button>
        </form>
        <div className="commentsList">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              {comment.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
