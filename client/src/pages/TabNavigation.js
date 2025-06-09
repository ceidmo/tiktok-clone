import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Box, Fab } from '@mui/material';

const StyledBottomNavigation = styled(BottomNavigation)({
  position: 'fixed',
  bottom: 20,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'calc(100% - 40px)',
  maxWidth: 500,
  borderRadius: 15,
  height: 70,
  backgroundColor: '#111',
  '& .Mui-selected': {
    color: '#fff !important',
  },
});

const CustomFab = styled(Fab)({
  position: 'absolute',
  top: -30,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#fe2c55',
  color: 'white',
  width: 60,
  height: 60,
  '&:hover': {
    backgroundColor: '#fe2c55',
  },
});

const TabNavigation = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  return (
    <Box sx={{ position: 'relative', pb: 10 }}>
      {/* Your screen content would go here */}
      
      <StyledBottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          value="/"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/discover"
          value="/discover"
          icon={<SearchIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/create"
          value="/create"
          icon={
            <CustomFab aria-label="add">
              <AddCircleIcon fontSize="large" />
            </CustomFab>
          }
          sx={{ opacity: 1 }}
        />
        <BottomNavigationAction
          component={Link}
          to="/inbox"
          value="/inbox"
          icon={<ChatBubbleOutlineIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/profile"
          value="/profile"
          icon={<PersonOutlineIcon />}
        />
      </StyledBottomNavigation>
    </Box>
  );
};

export default TabNavigation;
