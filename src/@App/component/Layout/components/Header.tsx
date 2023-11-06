import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, styled, Stack } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useState } from 'react';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useAuth } from '@App/redux/slices/auth.slice';

const logo: string =
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5yXcK1TTWq6lnf487hNmzxalkYg03kFgL-A&usqp=CAU';

interface HeaderProps {
   setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setOpenSidebar }: HeaderProps) => {
   const { authLogout } = useAuth();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleClickLogout = () => {
      authLogout();
      handleClose();
   };

   return (
      <Nav>
         <AsideBrand>
            <Stack
               sx={{
                  width: '100%',
                  pl: 3,
                  py: '6px',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}
            >
               <Box component={Link} to="/">
                  <LazyLoadingImage src={logo as string} w="70" h="50" />
               </Box>
               <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenSidebar((prev: boolean) => !prev)}>
                  <KeyboardDoubleArrowLeftIcon />
               </Box>
            </Stack>
         </AsideBrand>
         {/* hedaer  */}
         <AsideHeader>
            <Stack sx={{ flexDirection: 'row', px: 3 }}>
               <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Account settings">
                     <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                     >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                     </IconButton>
                  </Tooltip>
               </Box>
               <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClickLogout}
                  sx={{ zIndex: 999999 }}
                  PaperProps={stylePaperProps}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
               >
                  <MenuItem onClick={handleClose}>
                     <ListItemIcon>
                        <Settings fontSize="small" />
                     </ListItemIcon>
                     Settings
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                     <ListItemIcon>
                        <Logout fontSize="small" />
                     </ListItemIcon>
                     Logout
                  </MenuItem>
               </Menu>
            </Stack>
         </AsideHeader>
      </Nav>
   );
};

const Nav = styled('div')(({ theme }) => ({
   position: 'fixed',
   top: 0,
   right: 0,
   display: 'flex',
   //  width: `calc(100% - ${theme.base.sidebar.width}px)`,
   width: '100%',
   height: theme.base.header.height + 'px',
   zIndex: theme.base.header.zIndex,
   backgroundColor: theme.base.header.backgroundColor,
}));

const AsideBrand = styled('div')(({ theme }) => ({
   width: theme.base.sidebar.width + 'px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
}));

const AsideHeader = styled('div')(({ theme }) => ({
   width: `calc(100% - ${theme.base.sidebar.width}px)`,
   borderBottom: '1px solid #eff0f6',
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'center',
}));

const stylePaperProps = {
   elevation: 0,
   sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
         width: 32,
         height: 32,
         ml: -0.5,
         mr: 1,
      },
      '&:before': {
         content: '""',
         display: 'block',
         position: 'absolute',
         top: 0,
         right: 14,
         width: 10,
         height: 10,
         bgcolor: 'background.paper',
         transform: 'translateY(-50%) rotate(45deg)',
         zIndex: 0,
      },
   },
};

export default Header;
