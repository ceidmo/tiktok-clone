// components/Comment/CommentSection.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import axios from 'axios';
import {
  CommentContainer,
  CommentHeader,
  CommentTitle,
  CloseButton,
  CommentList,
  CommentItem,
  CommentAvatar,
  CommentContent,
  CommentUser,
  CommentText,
  CommentForm,
  CommentInput,
  SendButton,
  LoadingText,
  EmptyText
} from './Comment.styles';

const CommentSection = ({ videoId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/video/${videoId}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [videoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await axios.post('/comments', {
        videoId,
        text: newComment
      });
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CommentContainer show={true}>
      <CommentHeader>
        <CommentTitle>Comments ({comments.length})</CommentTitle>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
      </CommentHeader>

      <CommentList>
        {loading ? (
          <LoadingText>Loading comments...</LoadingText>
        ) : comments.length === 0 ? (
          <EmptyText>No comments yet</EmptyText>
        ) : (
          comments.map(comment => (
            <CommentItem key={comment._id}>
              <CommentAvatar>
                <FaUserCircle size={24} />
              </CommentAvatar>
              <CommentContent>
                <CommentUser>@{comment.user.username}</CommentUser>
                <CommentText>{comment.text}</CommentText>
              </CommentContent>
            </CommentItem>
          ))
        )}
      </CommentList>

      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <SendButton type="submit">
          <IoIosSend />
        </SendButton>
      </CommentForm>
    </CommentContainer>
  );
};

export default CommentSection;
