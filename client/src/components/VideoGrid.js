import React from 'react';
import styled from 'styled-components';
import VideoThumbnail from './VideoThumbnail';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  padding: 16px 0;
`;

function VideoGrid({ videos }) {
  return (
    <Grid>
      {videos.map(video => (
        <VideoThumbnail key={video._id} video={video} />
      ))}
    </Grid>
  );
}

export default VideoGrid;