/* eslint-disable @typescript-eslint/naming-convention */
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, styled, Stack } from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@App/redux/slices/auth.slice';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ROUTE_PATH from '@App/configs/router-path';
import SettingsIcon from '@mui/icons-material/Settings';
const logo: string = 'https://react.vristo.sbthemes.com/assets/images/logo.svg';

interface HeaderProps {
   setisOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
   isOpenSidebar: boolean;
}

const Header = ({ setisOpenSidebar, isOpenSidebar }: HeaderProps) => {
   const { authLogout, user } = useAuth();
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const navigate = useNavigate();
   const coreConfirm = useConfirm();
   const isOpen = Boolean(anchorEl);
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
      navigate(ROUTE_PATH.USER_PROFILE);
   };
   const handleResetPassword = () => {
      handleClose();
      navigate(ROUTE_PATH.RESET_PASSWORD);
   };

   const handleRedirectProfile = () => {
      handleClose();
   };

   const handleClickLogout = () => {
      handleClose();
      coreConfirm({
         title: 'Đăng xuất',
         confirmOk: 'Đăng xuất',
         content: 'Bạn có chắc muốn đăng xuất',
         callbackOK: authLogout,
      });
   };

   return (
      <Nav>
         <AsideBrand>
            <Stack
               sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}
            >
               <Box
                  component={Link}
                  to="/"
                  sx={{ display: 'flex', textDecoration: 'none', alignItems: 'center', gap: 1 }}
               >
                  <Box sx={{ width: 32, height: 28 }}>
                     <LazyLoadingImage src={logo} />
                  </Box>
                  <Box sx={{ fontWeight: 600, fontSize: 32 }}>Gara</Box>
               </Box>
               <Box
                  sx={{
                     cursor: 'pointer',
                     transform: isOpenSidebar ? 'rotate(0deg)' : 'rotate(180deg)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
                  onClick={() => setisOpenSidebar((prev: boolean) => !prev)}
               >
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
                        aria-controls={isOpen ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isOpen ? 'true' : undefined}
                     >
                        <Avatar sx={{ width: 28, height: 28 }} src={user?.avatar_url}>
                           {user?.full_name.split('')[0]}
                        </Avatar>
                     </IconButton>
                  </Tooltip>
               </Box>
               <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={isOpen}
                  onClose={handleClose}
                  sx={{ zIndex: 999999 }}
                  PaperProps={stylePaperProps}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
               >
                  <MenuItem onClick={handleRedirectProfile}>
                     <ListItemIcon>
                        <AccountCircleOutlinedIcon fontSize="small" />
                     </ListItemIcon>
                     Tài khoản
                  </MenuItem>
                  <MenuItem onClick={handleResetPassword}>
                     <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                     </ListItemIcon>
                     Cài đặt
                  </MenuItem>
                  <MenuItem onClick={handleClickLogout}>
                     <ListItemIcon>
                        <Logout fontSize="small" />
                     </ListItemIcon>
                     Đăng xuất
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
   left: 0,
   display: 'flex',
   //  width: `calc(100% - ${theme.base.sidebar.width}px)`,
   width: '100%',
   height: theme.base.header.height + 'px',
   zIndex: theme.base.header.zIndex,
   backgroundColor: theme.base.header.backgroundColor,
}));

const AsideBrand = styled(Box)(({ theme }) => ({
   flex: 1,
   maxWidth: theme.base.sidebar.width + 'px',
   padding: '6px 0px 6px 24px',
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
