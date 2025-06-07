// components/Comment/Comment.styles.js
import styled from 'styled-components';
import { devices } from '../../styles/responsive';

export const CommentContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transform: translateY(${({ show }) => show ? '0' : '100%'});
  transition: transform 0.3s ease-out;
  z-index: 10;

  @media ${devices.mobile} {
    height: 70%;
    padding: 15px;
  }
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #333;

  @media ${devices.mobile} {
    margin-bottom: 15px;
  }
`;

export const CommentTitle = styled.h3`
  margin: 0;
  font-size: 18px;

  @media ${devices.mobile} {
    font-size: 16px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 5px;

  @media ${devices.mobile} {
    font-size: 18px;
  }
`;

export const CommentList = styled.div`
  height: 70%;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 5px;

  @media ${devices.mobile} {
    height: 65%;
    margin-bottom: 15px;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  margin-bottom: 15px;

  @media ${devices.mobile} {
    margin-bottom: 12px;
  }
`;

export const CommentAvatar = styled.div`
  margin-right: 10px;

  svg {
    @media ${devices.mobile} {
      width: 20px;
      height: 20px;
    }
  }
`;

export const CommentContent = styled.div`
  flex: 1;
`;

export const CommentUser = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 14px;

  @media ${devices.mobile} {
    font-size: 13px;
  }
`;

export const CommentText = styled.div`
  font-size: 14px;

  @media ${devices.mobile} {
    font-size: 13px;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  align-items: center;
  border-top: 1px solid #333;
  padding-top: 15px;

  @media ${devices.mobile} {
    padding-top: 10px;
  }
`;

export const CommentInput = styled.input`
  flex: 1;
  background: #333;
  border: none;
  border-radius: 20px;
  padding: 10px 15px;
  color: white;
  outline: none;
  font-size: 14px;

  @media ${devices.mobile} {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const SendButton = styled.button`
  background: none;
  border: none;
  color: #fe2c55;
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
  padding: 5px;

  @media ${devices.mobile} {
    font-size: 18px;
    margin-left: 8px;
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #aaa;
`;

export const EmptyText = styled.div`
  text-align: center;
  padding: 20px;
  color: #aaa;
`;