import images from '@App/assets/image';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { Box, Typography } from '@mui/material';

const Unauthorized = () => {
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
               401 Unauthorized
            </Typography>
            <Typography mt={2} variant="h1" fontSize={24} fontWeight={500} textAlign="center">
               Bạn không có quyền truy cập vào trang này. <br /> vui lòng liên hệ với quản trị viên.
            </Typography>
         </Box>
         <LazyLoadingImage w="50%" h="90%" src={images.pageNullData} alt="page-not-found" />
      </Box>
   );
};

export default Unauthorized;
