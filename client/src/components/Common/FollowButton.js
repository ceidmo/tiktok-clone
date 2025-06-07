import React, { useState } from 'react';
import axios from 'axios';

const FollowButton = ({ targetUserId, isFollowing }) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    try {
      await axios.post(`/users/${targetUserId}/${following ? 'unfollow' : 'follow'}`);
      setFollowing(!following);
    } catch (err) {
      console.error('Follow/unfollow failed', err);
    }
  };

  return (
    <button onClick={handleFollow}>
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;