import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function Layout() {
   const [isOpenSidebar, setisOpenSidebar] = useState<boolean>(true);

   return (
      <Box>
         <React.Fragment>
            <Header isOpenSidebar={isOpenSidebar} setisOpenSidebar={setisOpenSidebar} />
            <Sidebar openSidebar={isOpenSidebar} />
         </React.Fragment>
         <WrapperContent isOpenSidebar={isOpenSidebar}>
            <Content>
               <Outlet />
            </Content>
            <Footer />
         </WrapperContent>
      </Box>
   );
}

const WrapperContent = styled('main')<{ isOpenSidebar: boolean }>(({ theme, isOpenSidebar }) => ({
   marginTop: theme.base.header.height,
   marginLeft: isOpenSidebar ? theme.base.sidebar.width : 0,
   width: `calc(100% - ${isOpenSidebar ? theme.base.sidebar.width : 0}px)`,
   // transition: 'margin-left 0.5s ease-in-out', // Chuyển động mượt mà trong 0.5 giây với ease-in-out
   transition: 'all 0.5s ease-in-out', // Chuyển động mượt mà trong 0.5 giây với ease-in-out
   backgroundColor: theme.base.background.default,
   boxSizing: 'border-box',
   overflow: 'hidden'
}));

const Content = styled('div')(({ theme }) => ({
   padding: '12px',
   minHeight: `calc(100vh - ${theme.base.header.height}px - 48px)`,
}));

export default Layout;
