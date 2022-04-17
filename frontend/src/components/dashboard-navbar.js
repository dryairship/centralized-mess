import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  const [topbarData, setTopbarData] = useState(null);

  useEffect(() => {
    if (window.location.pathname.startsWith('/student')) {
      setTopbarData({
        title: "Student Console",
        name: localStorage.getItem("name"),
        image: `https://oa.cc.iitk.ac.in/Oa/Jsp/Photo/${localStorage.getItem("rollNumber")}_0.jpg`
      });
    } else {
      setTopbarData({
        title: `Hall ${localStorage.getItem("messId")} Mess Management Console`,
        name: localStorage.getItem("name"),
        image: `https://thispersondoesnotexist.com/image`
      })
    }
  }, []);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        {topbarData && 
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography 
            color="textPrimary"
            gutterBottom
            variant="h5">
            {topbarData.title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            src={topbarData.image}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
          <Typography 
            color="textPrimary"
            margin={2}
            variant="h6">
            {topbarData.name}
          </Typography>
        </Toolbar>
        }
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
