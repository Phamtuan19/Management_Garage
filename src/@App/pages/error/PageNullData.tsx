import images from '@App/assets/image';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { Box, Button, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import { useNavigate } from 'react-router-dom';

const PageNullData = () => {
   const navigate = useNavigate();

   return (
      <Box
         sx={({ base }) => ({
            width: '100%',
            px: 3,
            height: `calc(100vh - ${base.header.height}px - 70px)`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
         })}
      >
         <Box width="50%" height="100%" display="flex" justifyContent="center" flexDirection="column">
            <Typography variant="h1" fontSize={63} fontWeight={600} textAlign="center">
               Dữ liệu không tồn tại.
            </Typography>
            <Box mt={5} display="flex" justifyContent="center" gap={5}>
               <Box
                  sx={({ palette }) => ({
                     width: '56px',
                     height: '56px',
                     padding: 1,
                     borderRadius: '50%',
                     bgcolor: palette.primary.main,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                  })}
               >
                  <WestIcon sx={{ width: '28px', height: '28px', color: 'white' }} />
               </Box>
               <Button
                  size="large"
                  sx={{ fontSize: '24px', borderRadius: '32px', px: 5 }}
                  onClick={() => {
                     navigate(-1);
                  }}
               >
                  Trở về trang chủ
               </Button>
            </Box>
         </Box>
         <LazyLoadingImage w="50%" h="90%" src={images.pageNullData} alt="page-not-found" />
      </Box>
   );
};

export default PageNullData;
