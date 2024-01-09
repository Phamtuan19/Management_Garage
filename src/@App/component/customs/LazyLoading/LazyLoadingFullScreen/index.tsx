import { useEffect } from 'react';
import NProgress from 'nprogress';

import './style.css';

function LazyLoadingFullScreen() {
   NProgress.configure({ showSpinner: false });
   useEffect(() => {
      NProgress.start();

      return () => {
         NProgress.done();
      };
   }, []);

   // return (
   //    <Box width="100%" height="100vh">
   //       <Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
   //          <Box sx={{ width: '400px' }}>
   //             <Typography textAlign="center" marginBottom={1}>
   //                Loading
   //             </Typography>
   //             <LinearProgress color="primary" />
   //          </Box>
   //       </Box>
   //    </Box>
   // );

   return (
      <div className="container">
         <div className="dot"></div>
         <div className="dot"></div>
         <div className="dot"></div>
         <div className="dot"></div>
         <div className="dot"></div>
      </div>
   );
}
export default LazyLoadingFullScreen;
