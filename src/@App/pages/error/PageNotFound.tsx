import images from '@App/assets/image';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { Box, Button, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import { Link } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';

const PageNotFound = () => {
   return (
      <Box width="100%" px={3} height="100vh" display="flex" justifyContent="space-between" alignItems="center">
         <Box width="50%" height="100%" display="flex" justifyContent="center" flexDirection="column">
            <Typography variant="h1" fontSize={63} fontWeight={600} textAlign="center">
               404 Page not found
            </Typography>
            <Box mt={5} display="flex" justifyContent="center" gap={5}>
               <Box
                  sx={({ base }) => ({
                     width: '63px',
                     height: '63px',
                     padding: 1,
                     borderRadius: '50%',
                     bgcolor: base.text.black,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                  })}
               >
                  <WestIcon sx={{ width: '42px', height: '42px', color: 'white' }} />
               </Box>
               <Button
                  component={Link}
                  to={ROUTE_PATH.DOASHBOARD}
                  size="large"
                  sx={{ fontSize: '24px', borderRadius: '32px', px: 5 }}
               >
                  Trở về trang chủ
               </Button>
            </Box>
         </Box>
         <LazyLoadingImage w="50%" h="90%" src={images.pageNotFound} alt="page-not-found" />
      </Box>
   );
};

export default PageNotFound;
