import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import VideoGrid from '../Video/VideoGrid';
import HashtagCloud from './HashtagCloud';
import UserSuggestions from './UserSuggestions';

const DiscoverContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  margin: 30px 0 20px;
  font-size: 22px;
`;

const DiscoverPage = () => {
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [popularUsers, setPopularUsers] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscoverData = async () => {
      try {
        setLoading(true);
        const [videosRes, usersRes, hashtagsRes] = await Promise.all([
          axios.get('/videos/trending'),
          axios.get('/users/popular'),
          axios.get('/videos/hashtags')
        ]);

        setTrendingVideos(videosRes.data);
        setPopularUsers(usersRes.data);
        setHashtags(hashtagsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscoverData();
  }, []);

  if (loading) {
    return <div>Loading discover content...</div>;
  }

  return (
    <DiscoverContainer>
      <SectionTitle>Trending Videos</SectionTitle>
      <VideoGrid videos={trendingVideos} />

      <SectionTitle>Popular Creators</SectionTitle>
      <UserSuggestions users={popularUsers} />

      <SectionTitle>Trending Hashtags</SectionTitle>
      <HashtagCloud hashtags={hashtags} />
    </DiscoverContainer>
  );
};

export default DiscoverPage;