// components/Video/Video.js
import React, { useState, useRef, useEffect } from 'react';
import { FaHeart, FaComment, FaShare, FaMusic } from 'react-icons/fa';
import axios from 'axios';
import CommentSection from '../Comment/CommentSection';
import {
  VideoContainer,
  VideoElement,
  VideoInfo,
  Username,
  Description,
  SongInfo,
  Sidebar,
  IconButton,
  IconCount,
  LoadingSpinner
} from './Video.styles';

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
