import { useEffect } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import NProgress from 'nprogress';

function LazyLoadingFullScreen() {
   NProgress.configure({ showSpinner: false });
   useEffect(() => {
      NProgress.start();

      return () => {
         NProgress.done();
      };
   }, []);

   return (
      <Box width="100%" height="100vh">
         <Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: '400px' }}>
               <Typography textAlign="center" marginBottom={1}>
                  Loading
               </Typography>
               <LinearProgress color="primary" />
            </Box>
         </Box>
      </Box>
   );
}
export default LazyLoadingFullScreen;
