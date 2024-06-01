import React, { useEffect, useState } from 'react';
import './Post.css';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest.js';
import { addComment } from '../../api/CommentRequest.js';
import { getComments } from '../../actions/commentAction.js';
import CommentModal from '../Commentmodal/Commentmodel.jsx';

const Post = ({ data }) => {
  const serverPublic = 'http://localhost:5000/images/';
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.commentsByPostId[data._id] || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if the post contains a video or an image
  const isVideo = data.image && (data.image.endsWith('.mp4') || data.image.endsWith('.webm') || data.image.endsWith('.ogg'));

  const handleCommentImageClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const shareToWhatsApp = async () => {
    const shareData = {
      title: 'Check this out!',
      text: `${data.desc}\nCheck this out: `,
      url: data.image ? serverPublic + data.image : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('Post shared successfully!');
      } else {
        alert('Share feature is not supported in this browser.');
      }
    } catch (err) {
      console.error('Error sharing the post:', err);
    }
  };

  useEffect(() => {
    dispatch(getComments(data._id));
  }, [dispatch, data._id]);

  const handleCommentSubmitFromModal = async (commentData) => {
    const commentText = commentData.text;
    if (!commentText.trim()) return;

    try {
      const commentPayload = { postId: data._id, userId: user._id, text: commentText };
      await addComment(commentPayload);
      dispatch(getComments(data._id)); // Refetch comments
      console.log('Comment added!');
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  return (
    <div className="Post">
      {isVideo ? (
        <video controls src={serverPublic + data.image} alt="Post media" />
      ) : (
        <img src={data.image ? serverPublic + data.image : ""} alt="Post media" />
      )}
      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" style={{ cursor: 'pointer', marginTop:'2px',height:'26px' }} onClick={handleLike} />
        <img src={Comment} alt="" style={{ cursor: 'pointer' , height:'30px' }} onClick={handleCommentImageClick} />
        <img
          style={{ cursor: 'pointer',height:'27px', width:'30px'  }}
          onClick={shareToWhatsApp}
          src={Share}
          alt=""
        />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>

      <div className="detail">
        <span><b>{data.name}</b></span>
        <span><b>Vibe : {data.desc}</b></span>
      </div>
      <CommentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        comments={comments}
        onCommentSubmit={handleCommentSubmitFromModal}
      />
    </div>
  );
};

export default Post;
