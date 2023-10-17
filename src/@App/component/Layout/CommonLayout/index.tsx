import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import CommonHeader from './components/Header';
import Footer from './components/Footer';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';


function CommonLayout() {
   return (
      <WapperCommonLayout>
         <CommonHeader />
         <WrapperContent>
            <Outlet />
         </WrapperContent>
         <Footer />
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
