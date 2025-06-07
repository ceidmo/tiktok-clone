// components/Video/Video.styles.js
import styled, { keyframes } from 'styled-components';
import { devices } from '../../styles/responsive';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgPrimary};

  @media ${devices.mobile} {
    height: 80vh;
  }
`;

export const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const VideoInfo = styled.div`
  position: absolute;
  bottom: 100px;
  left: 20px;
  max-width: 70%;
  color: white;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  animation: ${fadeIn} 0.5s ease-out;

  @media ${devices.mobile} {
    bottom: 120px;
    max-width: 60%;
  }
`;

export const Username = styled.h3`
  margin-bottom: 8px;
  font-size: 18px;
`;

export const Description = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
`;

export const SongInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const Sidebar = styled.div`
  position: absolute;
  right: 20px;
  bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media ${devices.mobile} {
    bottom: 120px;
    gap: 15px;
  }
`;

export const IconButton = styled.button`
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

  @media ${devices.mobile} {
    font-size: 10px;
  }
`;

export const IconCount = styled.span`
  margin-top: 5px;
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;