import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaHeart, FaRegHeart, FaComment, FaShare, FaArrowLeft } from 'react-icons/fa';
import CommentSection from '../components/CommentSection';
import VideoGrid from '../components/VideoGrid';

// Styled components
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  color: white;
  min-height: 100vh;
`;

const BackButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(0,0,0,0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  cursor: pointer;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 9/16;
  max-width: 500px;
  margin: 0 auto;
`;

const VideoPlayer = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Username = styled.h3`
  margin: 0;
  font-size: 16px;
`;

const Description = styled.p`
  margin: 8px 0;
  font-size: 14px;
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #aaa;
  margin-bottom: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
  margin: 16px 0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  cursor: pointer;
`;

const RelatedVideos = styled.div`
  padding: 20px;
  border-top: 1px solid #222;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

function VideoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const [videoRes, relatedRes] = await Promise.all([
          axios.get(`/api/videos/${id}`),
          axios.get(`/api/videos/related/${id}`)
        ]);
        setVideo(videoRes.data);
        setRelatedVideos(relatedRes.data);
        setLiked(videoRes.data.isLiked);
      } catch (err) {
        console.error('Failed to fetch video:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  const handleLike = async () => {
    try {
      await axios.post(`/api/videos/${id}/like`);
      setLiked(!liked);
      setVideo(prev => ({
        ...prev,
        likes: liked ? prev.likes - 1 : prev.likes + 1
      }));
    } catch (err) {
      console.error('Failed to like video:', err);
    }
  };

  if (loading) {
    return (
      <DetailContainer>
        <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
          Loading video...
        </div>
      </DetailContainer>
    );
  }

  if (!video) {
    return (
      <DetailContainer>
        <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
          Video not found
        </div>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </BackButton>

      <VideoWrapper>
        <VideoPlayer
          ref={videoRef}
          src={video.url}
          controls
          autoPlay
          loop
          playsInline
        />
      </VideoWrapper>

      <VideoInfo>
        <UserInfo>
          <Avatar src={video.user.avatar} alt={video.user.username} />
          <Username>@{video.user.username}</Username>
        </UserInfo>

        <Description>{video.description}</Description>

        <SongInfo>
          <FaMusic style={{ marginRight: '8px' }} />
          {video.song || 'Original sound'}
        </SongInfo>

        <ActionButtons>
          <ActionButton onClick={handleLike}>
            {liked ? <FaHeart color="#fe2c55" /> : <FaRegHeart />}
            {video.likes}
          </ActionButton>
          <ActionButton onClick={() => setShowComments(!showComments)}>
            <FaComment />
            {video.comments}
          </ActionButton>
        </ActionButtons>

        {showComments && (
          <CommentSection videoId={id} />
        )}
      </VideoInfo>

      <RelatedVideos>
        <SectionTitle>More Videos</SectionTitle>
        <VideoGrid videos={relatedVideos} />
      </RelatedVideos>
    </DetailContainer>
  );
}

export default VideoDetailPage;