
import { Box, Typography, styled, TextField, Stack, Avatar } from "@mui/material";
import Grid from '@mui/material/Grid';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
    return (
        <FooterNav>
            <Box>
                <Grid container justifyContent="center"
                    alignItems="center" spacing={6}>
                    <Grid item xs={3} >
                        <Typography >
                            <img src="https://picsum.photos/200/200" alt="" />
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" sx={{ margin: "15px", color: 'white' }}>
                            Product
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Computer
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            CPU
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Earphone
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Programming
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Javascript
                        </Typography>
                    </Grid>
                    <Grid item >
                        <Typography variant="h4" sx={{ margin: "15px", color: 'white' }}>
                            Service
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Computer
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            CPU
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Earphone
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Programming
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Javascript
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" sx={{ margin: "15px", color: 'white' }}>
                            About US
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Computer
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            CPU
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Earphone
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Programming
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Javascript
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" sx={{ margin: "15px", color: 'white' }}>
                            Social Media
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Computer
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            CPU
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Earphone
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Programming
                        </Typography>
                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Javascript
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center" textAlign={'center'}>
                    <Grid item xs={3}>

                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Social Media
                        </Typography>
                        <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" >
                            <Avatar> <FacebookOutlinedIcon /></Avatar>
                            <Avatar><YouTubeIcon /></Avatar>
                            <Avatar><GitHubIcon /></Avatar>
                        </Stack>

                    </Grid>
                    <Grid item xs={5}>

                        <Typography variant="h6" sx={{ margin: "15px", color: 'white' }}>
                            {" "}
                            Đăng Ký bằng email
                        </Typography>
                        <Box component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' }
                            }}>
                            <TextField color="warning" id="outlined-basic" label="Email" variant="outlined" />
                        </Box>

                    </Grid>
                    <Grid item xs={3} sx={{ marginTop: '40px' }}>

                        <img src="https://picsum.photos/250/100" alt="" />

                    </Grid>
                </Grid>
                <Typography sx={{ margin: "15px", color: '#808080', textAlign: 'center', marginTop: '30px' }}>
                    {" "}
                    Copyright © 2023 anh thiên đẹp trai vãi ò. All rights reserved.
                </Typography>
            </Box >
        </FooterNav>
    );
};

const FooterNav = styled('nav')(({ theme }) => ({
    height: '600px',
    width: '100%',
    marginTop: '50px',
    backgroundColor: '#4c4c4c',
    zIndex: 500,
}));
export default Footer;
