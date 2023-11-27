import { Stack, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
   return (
      <Stack
         direction="row"
         justifyContent="space-between"
         alignItems="center"
         sx={{
            height: '46px',
            //  borderTop: '1px solid rgba(162, 162, 162, 0.4)',
            p: 1,
            px: 3,
            backgroundColor: '#fff',
         }}
      >
         <Typography sx={{ fontSize: '13px !important', color: '#7e7e7e' }}>
            TMS Version 1.1.0. Copyright ©
            <Typography sx={{ fontSize: '13px !important', ml: 1 }} color="primary" component="span">
               Gara
            </Typography>
         </Typography>
         <Typography sx={{ fontSize: '13px !important', color: '#7e7e7e' }}>
            Made with <FavoriteIcon sx={{ fontSize: 13, color: 'red', mx: '6px' }} />
            in FPT Polytechnic
         </Typography>
      </Stack>
   );
};

export default Footer;
