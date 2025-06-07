import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaCompass, FaPlusSquare, FaInbox, FaUser, FaBell } from 'react-icons/fa';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import NotificationCenter from '../Notification/NotificationCenter';
import { useAuth } from '../../context/AuthContext';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.bgSecondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme, active }) => active ? theme.primary : theme.textPrimary};
  font-size: 20px;
  cursor: pointer;
  position: relative;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 20px;
  cursor: pointer;
`;

const Navbar = ({ toggleTheme, theme }) => {
  const { user } = useAuth();
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchNotificationCount = async () => {
        try {
          const res = await axios.get('/users/notifications/count');
          setNotificationCount(res.data.count);
        } catch (err) {
          console.error(err);
        }
      };

      fetchNotificationCount();

      // Set up polling for new notifications
      const interval = setInterval(fetchNotificationCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <>
      <NavbarContainer>
        <Logo to="/">TikTok</Logo>

        <NavItems>
          <ThemeToggle onClick={toggleTheme}>
            {theme === 'light' ? <IoMdMoon /> : <IoMdSunny />}
          </ThemeToggle>

          <NavButton as={Link} to="/" active={window.location.pathname === '/'}>
            <FaHome />
          </NavButton>

          <NavButton as={Link} to="/discover" active={window.location.pathname === '/discover'}>
            <FaCompass />
          </NavButton>

          <NavButton as={Link} to="/upload" active={window.location.pathname === '/upload'}>
            <FaPlusSquare />
          </NavButton>

          {user && (
            <>
              <NavButton
                onClick={() => setShowNotifications(!showNotifications)}
                active={showNotifications}
              >
                <FaBell />
                {notificationCount > 0 && (
                  <NotificationBadge>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </NotificationBadge>
                )}
              </NavButton>

              <NavButton as={Link} to="/inbox" active={window.location.pathname === '/inbox'}>
                <FaInbox />
              </NavButton>

              <NavButton as={Link} to={`/@${user.username}`}>
                <UserAvatar src={user.avatar} alt={user.username} />
              </NavButton>
            </>
          )}
        </NavItems>
      </NavbarContainer>

      {user && (
        <NotificationCenter
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};

export default Navbar;