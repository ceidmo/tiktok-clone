import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaUserPlus, FaUserCheck, FaEllipsisH } from 'react-icons/fa';
import VideoGrid from '../components/Video/VideoGrid';
import TabNavigation from './TabNavigation';
import { useAuth } from '../context/AuthContext';

const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Username = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Bio = styled.p`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.textSecondary};
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-weight: bold;
  font-size: 18px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const FollowButton = styled.button`
  padding: 8px 20px;
  background-color: ${({ isFollowing, theme }) =>
    isFollowing ? theme.bgSecondary : theme.primary};
  color: ${({ isFollowing, theme }) =>
    isFollowing ? theme.textPrimary : 'white'};
  border: ${({ isFollowing, theme }) =>
    isFollowing ? `1px solid ${theme.border}` : 'none'};
  border-radius: 4px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const MoreButton = styled.button`
  padding: 8px 15px;
  background: none;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  cursor: pointer;
`;

const ProfilePage = () => {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('videos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/users/${username}`);
        setProfile(res.data.user);
        setVideos(res.data.videos);
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  const handleFollow = async () => {
    try {
      await axios.post(`/users/${profile._id}/follow`);
      setIsFollowing(!isFollowing);

      // Update profile stats
      setProfile(prev => ({
        ...prev,
        followers: isFollowing
          ? prev.followers.filter(id => id !== currentUser.id)
          : [...prev.followers, currentUser.id]
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>User not found</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar src={profile.avatar} alt={profile.username} />
        <ProfileInfo>
          <Username>@{profile.username}</Username>
          <Bio>{profile.bio || 'No bio yet'}</Bio>

          <StatsContainer>
            <StatItem>
              <StatNumber>{videos.length}</StatNumber>
              <StatLabel>Videos</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{profile.followers.length}</StatNumber>
              <StatLabel>Followers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{profile.following.length}</StatNumber>
              <StatLabel>Following</StatLabel>
            </StatItem>
          </StatsContainer>

          {currentUser && currentUser.id !== profile._id && (
            <ActionButtons>
              <FollowButton
                isFollowing={isFollowing}
                onClick={handleFollow}
              >
                {isFollowing ? <FaUserCheck /> : <FaUserPlus />}
                {isFollowing ? 'Following' : 'Follow'}
              </FollowButton>
              <MoreButton>
                <FaEllipsisH />
              </MoreButton>
            </ActionButtons>
          )}
        </ProfileInfo>
      </ProfileHeader>

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showLikes={currentUser && currentUser.id === profile._id}
      />

      {activeTab === 'videos' && (
        <VideoGrid videos={videos} />
      )}

      {activeTab === 'liked' && currentUser && currentUser.id === profile._id && (
        <LikedVideos userId={profile._id} />
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;
