// components/Video/VideoPlayer.js
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
} from './video.styles'; // Make sure file matches casing

const VideoPlayer = ({ video, onLike, currentUser }) => {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(video.liked || false);
  const [showComments, setShowComments] = useState(false);
  const videoRef = useRef(null);

  // Check if current user has liked the video
  useEffect(() => {
    if (currentUser && Array.isArray(video.likedBy)) {
      setLiked(video.likedBy.includes(currentUser.id));
    }
  }, [video, currentUser]);

  // Video loading event listeners
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleLoaded = () => setLoading(false);
    const handleWaiting = () => setLoading(true);
    const handlePlaying = () => setLoading(false);

    vid.addEventListener('loadeddata', handleLoaded);
    vid.addEventListener('waiting', handleWaiting);
    vid.addEventListener('playing', handlePlaying);

    return () => {
      vid.removeEventListener('loadeddata', handleLoaded);
      vid.removeEventListener('waiting', handleWaiting);
      vid.removeEventListener('playing', handlePlaying);
    };
  }, []);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
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
      setLiked((prev) => !prev);
      if (onLike) onLike(video._id, !liked);
    } catch (err) {
      console.error('Error liking video:', err);
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
        <Username>@{video.user?.username || 'unknown'}</Username>
        <Description>{video.description}</Description>
        <SongInfo>
          <FaMusic style={{ marginRight: '8px' }} />
          {video.song}
        </SongInfo>
      </VideoInfo>

      <Sidebar>
        <IconButton onClick={handleLike}>
          <FaHeart size={24} color={liked ? '#fe2c55' : 'white'} />
          <IconCount>{video.likes}</IconCount>
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
