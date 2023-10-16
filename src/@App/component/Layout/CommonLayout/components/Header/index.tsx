import { Avatar, Box, Button, Container, IconButton, Toolbar, Typography, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Link, NavLink } from 'react-router-dom';
import routePath from '@App/configs/routerPath';
import { menuCommonConfig } from '@App/configs/menuConfig';
function CommonHeader() {
   const [isLogin, setLogin] = useState(true);
   return (
      <CommonHeaderNav>
         <Container maxWidth={'xl'}>
            <Toolbar disableGutters>
               <Typography
                  variant={'h6'}
                  component="a"
                  href=""
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     textDecoration: 'none',
                     color: 'inherit',
                     alignItems: 'center',
                  }}
               >
                  Elearning
               </Typography>
               <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton size="large">
                     <MenuIcon />
                  </IconButton>
               </Box>
               <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                     mr: 2,
                     display: { xs: 'flex', md: 'none' },
                     fontFamily: 'monospace',
                     flexGrow: 1,
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
                     justifyContent: 'center',
                  }}
               >
                  Elearning
               </Typography>

               <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {menuCommonConfig.map((page) => (
                     <Button
                        key={page.id}
                        sx={{
                           my: 0,
                           color: '#000',
                           backgroundColor: '#fff',
                           display: 'block',

                           ':hover': { backgroundColor: '#fff' },
                           mx: '5px',
                        }}
                        component={NavLink}
                        to={page.link}
                     >
                        {page.title}
                     </Button>
                  ))}
               </Box>
               {isLogin ? (
                  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
                     <Typography
                        variant="caption"
                        sx={{
                           mr: 5,
                           fontSize: 15,
                           fontWeight: 500,
                        }}
                     >
                        Khóa học của tôi
                     </Typography>
                     <Avatar
                        variant="square"
                        sx={{
                           bgcolor: '#fff',
                           borderRadius: 10,
                           color: 'black',
                           cursor: 'pointer',
                           ':hover': {
                              bgcolor: '#c7d0dd47',
                           },
                        }}
                     >
                        <NotificationsActiveIcon />
                     </Avatar>
                  </Box>
               ) : (
                  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                     <Button
                        sx={{
                           mb: 0,
                           fontSize: 15,
                           fontWeight: 500,
                           backgroundColor: 'gray',
                           borderRadius: 10,
                        }}
                        component={NavLink}
                        to={routePath.account.path + '/' + routePath.account.login}
                     >
                        Đăng nhập
                     </Button>
                  </Box>
               )}
            </Toolbar>
         </Container>
      </CommonHeaderNav>
   );
}

const CommonHeaderNav = styled('nav')(({ theme }) => ({
   height: theme.base.header.height,
   width: '100%',
   position: 'fixed',
   top: 0,
   left: 0,
   display: 'flex',
   alignItems: 'center',
   backgroundColor: '#fff',
   boxShadow: theme.base.header.boxShadow,
   zIndex: 500,
}));

export default CommonHeader;
