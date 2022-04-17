import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { 
  Box, 
  Button, 
  Divider, 
  Drawer, 
  Typography, 
  useMediaQuery, 
  Avatar,
  List, 
  ListSubheader, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  ExpandLess,
  ExpandMore,
  ListItem,
  Collapse,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { Search as SearchIcon } from '../icons/search';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Logo } from './logo';
import { NavItem } from './nav-item';

const managerSections = [
  {
    type: 'item',
    title: 'Dashboard',
    icon: (<HomeIcon fontSize="small" />),
    href: '/manager/dashboard'
  },
  {
    type: 'section',
    title: "Real-Time Management",
    icon: (<ListAltIcon fontSize="small" />),
    items: [
      {
        href: '/manager/student-entry',
        icon: (<LoginIcon fontSize="small" />),
        title: 'Student Entry'
      },
      {
        href: '/manager/view-extras-requests',
        icon: (<ListIcon fontSize="small" />),
        title: 'View Extras Requests'
      },
    ]
  },
  {
    type: 'section',
    title: "Menu Management",
    icon: (<ListAltIcon fontSize="small" />),
    items: [
      {
        href: '/manager/add-menus',
        icon: (<AddBoxIcon fontSize="small" />),
        title: 'Add Menus'
      },
      {
        href: '/manager/manage-menus',
        icon: (<ListIcon fontSize="small" />),
        title: 'Manage Menus'
      },
      {
        href: '/manager/manage-extras',
        icon: (<FastfoodIcon fontSize="small" />),
        title: 'Manage Extras'
      },
    ]
  },
  {
    type: 'section',
    title: "Meals Management",
    icon: (<LocalDiningIcon fontSize="small" />),
    items: [
      {
        href: '/manager/add-meals',
        icon: (<AddBoxIcon fontSize="small" />),
        title: 'Add Meals'
      },
      {
        href: '/manager/manage-meals',
        icon: (<ListIcon fontSize="small" />),
        title: 'Upcoming Meals'
      },
    ],
  },
  {
    type: 'section',
    title: "Finance Management",
    icon: (<CurrencyRupeeIcon fontSize="small" />),
    items: [
      {
        href: '/manager/manage-meal-costs',
        icon: (<LocalDiningIcon fontSize="small" />),
        title: 'Manage Meal Costs'
      },
      {
        href: '/manager/view-extras-costs',
        icon: (<FastfoodIcon fontSize="small" />),
        title: 'View Extras Costs'
      },
      {
        href: '/manager/view-student-bills',
        icon: (<PersonSearchIcon fontSize="small" />),
        title: 'View Student Bills'
      },
      {
        href: '/manager/view-meals-records',
        icon: (<ReceiptLongIcon fontSize="small" />),
        title: 'View Meals Records'
      },
      {
        href: '/manager/view-extras-records',
        icon: (<ReceiptLongIcon fontSize="small" />),
        title: 'View Extras Records'
      },
    ],
  },
  {
    type: 'item',
    title: 'Logout',
    icon: (<LogoutIcon fontSize="small" />),
    href: '/manager/logout'
  },
];

const studentSections = [
  {
    type: 'item',
    title: 'Dashboard',
    icon: (<HomeIcon fontSize="small" />),
    href: '/student/dashboard'
  },
  {
    type: 'item',
    title: 'View Upcoming Meals',
    icon: (<SearchIcon fontSize="small" />),
    href: '/student/view-upcoming-meals'
  },
  {
    type: 'item',
    title: 'Purchase Extra Items',
    icon: (<FastfoodIcon fontSize="small" />),
    href: '/student/purchase-extra-items',
  },
  {
    type: 'item',
    title: 'Logout',
    icon: (<LogoutIcon fontSize="small" />),
    href: '/student/logout'
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const [menuOpen, setMenuOpen] = useState(managerSections.map(() => false));
  const [sections, setSections] = useState([]);
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const toggleNavBarMenu = (index) => {
    setMenuOpen([
      ...menuOpen.slice(0, index),
      !menuOpen[index],
      ...menuOpen.slice(index+1),
    ])
  }

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  useEffect(() => {
    if (window.location.pathname.startsWith("/student")) {
      setSections(studentSections);
    } else {
      setSections(managerSections);
    }
  }, []);

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3, justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
            <Avatar
              src={`/static/images/iitk-white.png`}
              sx={{ width: 152, height: 150 }} />
              
          </Box>
          <Box sx={{ px: 2, justifyContent: 'center', display: 'flex', alignItems: 'center' }}>          
            <Typography
              color="inherit"
              variant="subtitle1"
            >
              Centralized Mess @ IITK
            </Typography>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {sections.map((section, index) => 
            section.type == 'section' ?
            <div key={index}>
              <ListItem>
                <Button
                  component="a"
                  startIcon={section.icon}
                  disableRipple
                  sx={{
                    borderRadius: 1,
                    color: menuOpen[index] ? 'neutral.200' : 'neutral.300',
                    fontWeight: menuOpen[index] && 'fontWeightBold',
                    justifyContent: 'flex-start',
                    px: 3,
                    textAlign: 'left',
                    textTransform: 'none',
                    width: '100%',
                    '& .MuiButton-startIcon': {
                      color: menuOpen[index] ? 'secondary.main' : 'neutral.400'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255, 0.2)'
                    }
                  }}
                  onClick={() => toggleNavBarMenu(index)}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    {section.title}
                  </Box>
                </Button>
              </ListItem>
              <Collapse in={menuOpen[index]} timeout="auto" unmountOnExit>
                {section.items.map((item) => (
                  <NavItem
                    subMenu
                    key={item.title}
                    icon={item.icon}
                    href={item.href}
                    title={item.title}
                  />
                ))}
              </Collapse>
            </div>
            :
            <NavItem
              key={index}
              icon={section.icon}
              href={section.href}
              title={section.title}
            />
          )}
          </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
            align='center'
          >
            Built by <br/> Priydarshi and Saumya
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
