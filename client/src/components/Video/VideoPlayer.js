import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaHeart, FaComment, FaShare, FaMusic, FaEllipsisH } from 'react-icons/fa';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import CommentSection from '../Comment/CommentSection';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgPrimary};
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  position: absolute;
  bottom: 100px;
  left: 20px;
  max-width: 70%;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  animation: ${fadeIn} 0.5s ease-out;
`;

const Username = styled.h3`
  margin-bottom: 8px;
  font-size: 18px;
`;

const Description = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 16px;
`;

const Sidebar = styled.div`
  position: absolute;
  right: 20px;
  bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  transition: transform 0.2s;

  &:active {
    transform: scale(0.9);
  }
`;

const IconCount = styled.span`
  margin-top: 5px;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const VideoPlayer = ({ video, onLike, currentUser }) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => setLoading(false));
      videoRef.current.addEventListener('waiting', () => setLoading(true));
      videoRef.current.addEventListener('playing', () => setLoading(false));
    }

    // Check if user liked the video
    if (currentUser && video.likes.includes(currentUser.id)) {
      setLiked(true);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', () => setLoading(false));
        videoRef.current.removeEventListener('waiting', () => setLoading(true));
        videoRef.current.removeEventListener('playing', () => setLoading(false));
      }
    };
  }, [video, currentUser]);

  const handleVideoClick = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleLike = async () => {
    try {
      await axios.post(`/videos/${video._id}/like`);
      setLiked(!liked);
      onLike(video._id, liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VideoContainer>
      {loading && <LoadingSpinner>Loading...</LoadingSpinner>}
      <VideoElement
        ref={videoRef}
        onClick={handleVideoClick}
        loop
        playsInline
        poster={video.thumbnail}
      >
        <source src={video.url} type="video/mp4" />
      </VideoElement>

      <VideoInfo>
        <Username>@{video.userId.username}</Username>
        <Description>{video.description}</Description>
        <SongInfo>
          <FaMusic style={{ marginRight: '8px' }} />
          {video.song}
        </SongInfo>
      </VideoInfo>

      <Sidebar>
        <IconButton onClick={handleLike}>
          <FaHeart size={24} color={liked ? '#fe2c55' : 'white'} />
          <IconCount>{video.likes.length}</IconCount>
        </IconButton>

        <IconButton onClick={() => setShowComments(!showComments)}>
          <FaComment size={24} />
          <IconCount>{video.comments}</IconCount>
        </IconButton>

        <IconButton>
          <FaShare size={24} />
          <IconCount>{video.shares}</IconCount>
        </IconButton>
      </Sidebar>

      {showComments && (
        <CommentSection
          videoId={video._id}
          onClose={() => setShowComments(false)}
        />
      )}
    </VideoContainer>
  );
};

export default VideoPlayer;