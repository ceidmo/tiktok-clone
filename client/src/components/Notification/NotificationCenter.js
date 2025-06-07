import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaHeart, FaComment, FaUserPlus, FaAt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  width: 350px;
  max-height: 80vh;
  background-color: ${({ theme }) => theme.bgSecondary};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadow};
  overflow: hidden;
  z-index: 1000;
  transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(120%)'};
  transition: transform 0.3s ease;
`;

const NotificationHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
`;

const NotificationList = styled.div`
  max-height: calc(80vh - 60px);
  overflow-y: auto;
`;

const NotificationItem = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ isUnread, theme }) =>
    isUnread ? theme.notificationUnread : 'transparent'};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.notificationHover};
  }
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationText = styled.div`
  font-size: 14px;
`;

const NotificationTime = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 5px;
`;

const NotificationIcon = styled.div`
  color: ${({ type, theme }) =>
    type === 'like' ? theme.primary :
    type === 'comment' ? theme.textPrimary :
    type === 'follow' ? theme.success :
    theme.warning};
`;

const NotificationCenter = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && user) {
      const fetchNotifications = async () => {
        try {
          const res = await axios.get('/users/notifications/all');
          setNotifications(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [isOpen, user]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <FaHeart />;
      case 'comment':
        return <FaComment />;
      case 'follow':
        return <FaUserPlus />;
      case 'mention':
        return <FaAt />;
      default:
        return null;
    }
  };

  const getNotificationText = (notification) => {
    const username = notification.sender.username;

    switch (notification.type) {
      case 'like':
        return `${username} liked your video`;
      case 'comment':
        return `${username} commented: "${notification.comment}"`;
      case 'follow':
        return `${username} started following you`;
      case 'mention':
        return `${username} mentioned you in a comment`;
      default:
        return 'New notification';
    }
  };

  return (
    <NotificationContainer isOpen={isOpen}>
      <NotificationHeader>
        Notifications
        <CloseButton onClick={onClose}>×</CloseButton>
      </NotificationHeader>

      <NotificationList>
        {loading ? (
          <div>Loading...</div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            No notifications yet
          </div>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification._id}
              isUnread={!notification.read}
            >
              <UserAvatar
                src={notification.sender.avatar}
                alt={notification.sender.username}
              />
              <NotificationContent>
                <NotificationText>
                  {getNotificationText(notification)}
                </NotificationText>
                <NotificationTime>
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </NotificationTime>
              </NotificationContent>
              <NotificationIcon type={notification.type}>
                {getNotificationIcon(notification.type)}
              </NotificationIcon>
            </NotificationItem>
          ))
        )}
      </NotificationList>
    </NotificationContainer>
  );
};

export default NotificationCenter;