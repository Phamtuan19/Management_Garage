import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function Layout() {
   const [openSidebar, setOpenSidebar] = useState<boolean>(false);

   return (
      <Box>
         <React.Fragment>
            <Header setOpenSidebar={setOpenSidebar} />
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
         </React.Fragment>
         <WrapperContent>
            <Content>
               <Outlet />
            </Content>
            <Footer />
         </WrapperContent>
      </Box>
   );
}

const WrapperContent = styled('main')(({ theme }) => ({
   marginTop: theme.base.header.height,
   marginLeft: theme.base.sidebar.width,
   width: `calc(100% - ${theme.base.sidebar.width}px)`,

   backgroundColor: theme.base.background.default,
   boxSizing: 'border-box',
   [theme.breakpoints.down('lg')]: {
      width: '100%',
      marginLeft: 0,
   },
}));

const Content = styled('div')(({theme}) => ({
   padding: '24px',
   minHeight: `calc(100vh - ${theme.base.header.height}px - 111px)`,
}));

export default Layout;
