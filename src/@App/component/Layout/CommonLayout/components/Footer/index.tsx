import { Box, Typography, styled, TextField, Stack, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';

const footerList = [
   {
      title: 'Product',
      children: ['Computer', 'CPU', 'Earphone', 'Programming', 'Javascript'],
   },
   {
      title: 'Product',
      children: ['Computer', 'CPU', 'Earphone', 'Programming', 'Javascript'],
   },
   {
      title: 'Product',
      children: ['Computer', 'CPU', 'Earphone', 'Programming', 'Javascript'],
   },
   {
      title: 'Product',
      children: ['Computer', 'CPU', 'Earphone', 'Programming', 'Javascript'],
   },
];

const Footer = () => {
   return (
      <FooterNav>
         <Grid container spacing={2} sx={{ gap: '32px 0' }}>
            <Grid item xs={3}>
               <Typography>
                  <img src="https://picsum.photos/200/200" alt="" />
               </Typography>
            </Grid>
            <Grid item xs={9}>
               <Grid container spacing={2}>
                  {footerList.map((item, index) => {
                     return (
                        <Grid item xs={12} md={3} key={index} component={Stack} gap={2} flexDirection="column">
                           <Typography variant="h6" sx={{ color: 'white', fontWeight: 400 }}>
                              {item.title}
                           </Typography>
                           {item.children.map((child, index) => {
                              return (
                                 <Box sx={{ color: '#CCC' }} key={index}>
                                    {child}
                                 </Box>
                              );
                           })}
                        </Grid>
                     );
                  })}
               </Grid>
            </Grid>

            <Grid item xs={12}>
               <Grid container spacing={2} justifyContent="center" alignItems="center" textAlign={'center'}>
                  <Grid item xs={3}>
                     <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                        Social Media
                     </Typography>
                     <Stack direction="row" spacing={4} justifyContent="center" alignItems="center">
                        <Avatar>
                           <FacebookOutlinedIcon />
                        </Avatar>
                        <Avatar>
                           <YouTubeIcon />
                        </Avatar>
                        <Avatar>
                           <GitHubIcon />
                        </Avatar>
                     </Stack>
                  </Grid>
                  <Grid item xs={6}>
                     <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                        Đăng Ký bằng email
                     </Typography>
                     <Box
                        component="form"
                        sx={{
                           '& > :not(style)': { width: '41ch' },
                        }}
                     >
                        <TextField color="warning" id="outlined-basic" label="Email" variant="outlined" />
                     </Box>
                  </Grid>
                  <Grid item xs={3} sx={{ marginTop: '40px' }}>
                     <img src="https://picsum.photos/250/100" alt="" />
                  </Grid>
               </Grid>
            </Grid>

            <Grid item xs={12}>
               <Typography sx={{ color: '#808080', textAlign: 'center', marginTop: '30px' }}>
                  Copyright © 2023 anh thiên đẹp trai vãi ò. All rights reserved.
               </Typography>
            </Grid>
         </Grid>
      </FooterNav>
   );
};

const FooterNav = styled('nav')(({ theme }) => ({
   marginTop: 50,
   backgroundColor: '#4c4c4c',
   zIndex: 500,
   padding: '120px 60px',
}));
export default Footer;
