import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import CommonHeader from './component/CommonHeader';

function CommonLayout() {
   return (
      <WapperCommonLayout>
         <CommonHeader />
         <WrapperContent>
            <Outlet />
         </WrapperContent>
      </WapperCommonLayout>
   );
}

const WapperCommonLayout = styled(Box)(({ theme }) => ({
   // backgroundColor: theme.base.background.default,
   backgroundColor: '#FFFFFF',
   minHeight: '100vh',
}));

const WrapperContent = styled(Box)(({ theme }) => ({
   marginTop: theme.base.header.height,
   padding: 12,
}));

export default CommonLayout;
