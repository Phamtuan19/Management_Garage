import { Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
function CommonHeader() {
   const pages = ['Khóa học', 'Lộ trình', 'Bài viết'];
   const [isLogin, setLogin] = useState(false);
   return (
      <CommonHeaderNav>
         <Container maxWidth={'xl'}>
            <Toolbar disableGutters>
               <Typography
                  variant={'h6'}
                  component="a"
                  href="#"
                  sx={{
                     mr: 2,
                     display: { xs: 'none', md: 'flex' },
                     fontFamily: 'monospace',
                     fontWeight: 700,
                     letterSpacing: '.3rem',
                     color: 'inherit',
                     textDecoration: 'none',
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
                     flexGrow: 1,
                     fontFamily: 'monospace',
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
                  {pages.map((page) => (
                     <Button
                        key={page}
                        sx={{
                           my: 0,
                           color: '#000',
                           backgroundColor: '#fff',
                           display: 'block',
                           ':hover': { backgroundColor: '#fff' },
                           mx: '5px',
                        }}
                     >
                        {page}
                     </Button>
                  ))}
               </Box>
               {isLogin ? (
                  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
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
                     <NotificationsActiveIcon />
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
   backgroundColor: '#fff',
   boxShadow: theme.base.header.boxShadow,
   zIndex: 500,
}));

export default CommonHeader;
