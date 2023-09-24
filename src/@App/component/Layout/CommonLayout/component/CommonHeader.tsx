import { Stack, styled } from '@mui/material';

function CommonHeader() {
   return (
      <CommonHeaderNav>
         <Stack padding={24} spacing={2}></Stack>
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
   zIndex: 99999,
}));

export default CommonHeader;
