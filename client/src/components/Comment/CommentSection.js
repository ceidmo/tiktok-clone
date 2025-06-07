import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaTimes, FaUserCircle } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';

const CommentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transform: translateY(${({ show }) => show ? '0' : '100%'});
  transition: transform 0.3s ease-out;
  z-index: 10;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;
`;

const CommentTitle = styled.h3`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const CommentList = styled.div`
  height: 70%;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const CommentItem = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const CommentAvatar = styled.div`
  margin-right: 10px;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentUser = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const CommentText = styled.div`
  font-size: 14px;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  border-top: 1px solid #333;
  padding-top: 15px;
`;

const CommentInput = styled.input`
  flex: 1;
  background: #333;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  color: white;
  outline: none;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: #fe2c55;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
`;

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
          <div>Loading comments...</div>
        ) : comments.length === 0 ? (
          <div>No comments yet</div>
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