import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #000;
  color: white;
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fe2c55;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ActionButton = styled.button`
  background-color: #fe2c55;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  margin: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e41e4a;
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Oops! The page you're looking for doesn't exist.</Message>
      <Message>Maybe the URL is wrong or the content was removed.</Message>

      <ButtonContainer>
        <ActionButton onClick={() => navigate('/')}>
          <FaHome /> Go Home
        </ActionButton>
        <ActionButton onClick={() => navigate('/explore')}>
          <FaSearch /> Explore Videos
        </ActionButton>
      </ButtonContainer>
    </NotFoundContainer>
  );
}

export default NotFoundPage;