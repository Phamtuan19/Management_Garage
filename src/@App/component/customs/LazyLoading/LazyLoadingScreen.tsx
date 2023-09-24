import { CircularProgress, Stack } from '@mui/material';
import NProgress from 'nprogress';
import { useEffect } from 'react';

function LazyLoadingScreen() {
   NProgress.configure({ showSpinner: false });

   useEffect(() => {
      NProgress.start();
      return () => {
         NProgress.done();
      };
   }, []);

   return (
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <CircularProgress />
      </Stack>
   );
}

export default LazyLoadingScreen;
