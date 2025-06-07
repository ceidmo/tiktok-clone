import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaMusic } from 'react-icons/fa';
import { trackEvent } from '../utils/analytics'; // ✅ NEW

// Styled components
const HomeContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  background-color: #000;
`;

const VideoContainer = styled.div`
  position: relative;
  height: 100vh;
  scroll-snap-align: start;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  position: absolute;
  bottom: 80px;
  left: 20px;
  color: white;
  max-width: 70%;
`;

const Username = styled.h3`
  margin: 0;
  font-size: 18px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
`;

const Description = styled.p`
  margin: 8px 0;
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
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
`;

const IconCount = styled.span`
  margin-top: 4px;
`;

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    trackEvent('Page Viewed', { page: 'Home' }); // ✅ Log homepage view

    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        setVideos(response.data);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleScroll = () => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        const rect = videoRef.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          if (videoRef.paused) {
            videoRef.play().catch(e => console.log('Autoplay prevented:', e));
          }
        } else {
          if (!videoRef.paused) {
            videoRef.pause();
          }
        }
      }
    });
  };

  const handleLike = async (videoId) => {
    try {
      await axios.post(`/api/videos/${videoId}/like`);
      setVideos(videos.map(video =>
        video._id === videoId
          ? { ...video, likes: video.liked ? video.likes - 1 : video.likes + 1, liked: !video.liked }
          : video
      ));
      trackEvent('Video Liked', { videoId }); // ✅ Log like event
    } catch (err) {
      console.error('Failed to like video:', err);
    }
  };

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>Loading videos...</div>;
  }

  return (
    <HomeContainer onScroll={handleScroll}>
      {videos.map((video, index) => (
        <VideoContainer key={video._id}>
          <VideoPlayer
            ref={el => videoRefs.current[index] = el}
            src={video.url}
            loop
            playsInline
            muted
          />

          <VideoInfo>
            <Username>@{video.user.username}</Username>
            <Description>{video.description}</Description>
            <SongInfo>
              <FaMusic style={{ marginRight: '8px' }} />
              {video.song || 'Original sound'}
            </SongInfo>
          </VideoInfo>

          <Sidebar>
            <IconButton onClick={() => handleLike(video._id)}>
              {video.liked ? <FaHeart color="#fe2c55" size={24} /> : <FaRegHeart size={24} />}
              <IconCount>{video.likes}</IconCount>
            </IconButton>

            <IconButton>
              <FaComment size={24} />
              <IconCount>{video.comments}</IconCount>
            </IconButton>

            <IconButton>
              <FaShare size={24} />
              <IconCount>{video.shares}</IconCount>
            </IconButton>
          </Sidebar>
        </VideoContainer>
      ))}
    </HomeContainer>
  );
}

export default HomePage;
