import React, { useState, useRef } from 'react';
import { FaHeart, FaRegHeart, FaCommentDots, FaMusic, FaShare } from 'react-icons/fa';
import './VideoThumbnail.css'; // We'll use CSS for styling

const VideoThumbnail = ({ video }) => {
  const [isLiked, setIsLiked] = useState(video.isLiked);
  const [likeCount, setLikeCount] = useState(video.likeCount);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);
  };

  const formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="video-thumbnail">
      <div className="video-container" onClick={() => setIsPlaying(!isPlaying)}>
        <img src={video.thumbnail} alt="video" className="thumbnail" />
        {!isPlaying && <div className="play-overlay">▶</div>}
      </div>

      <div className="video-info">
        <p className="description">{video.description}</p>
        <div className="user-info">
          <img src={video.user.avatar} alt="avatar" className="avatar" />
          <span className="username">@{video.user.username}</span>
        </div>
      </div>

      <div className="action-bar">
        <div className="action-button" onClick={handleLike}>
          {isLiked ? <FaHeart color="#fe2c55" size={24} /> : <FaRegHeart size={24} />}
          <span>{formatCount(likeCount)}</span>
        </div>
        <div className="action-button">
          <FaCommentDots size={24} />
          <span>{formatCount(video.commentCount)}</span>
        </div>
        <div className="action-button">
          <FaShare size={24} />
          <span>{formatCount(video.shareCount)}</span>
        </div>
        <div className="action-button">
          <FaMusic size={24} />
        </div>
      </div>

      <div className="sound-label">{video.soundName}</div>
    </div>
  );
};

export default VideoThumbnail;
