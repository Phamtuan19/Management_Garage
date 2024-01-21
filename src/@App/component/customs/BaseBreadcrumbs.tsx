/* eslint-disable @typescript-eslint/naming-convention */
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, SxProps, Theme, Typography, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface BaseBreadcrumbsPropsType {
   arialabel: string;
   breadcrumbs?: { title: string; link: string }[];
   children?: React.ReactNode;
   sx?: SxProps<Theme>;
}

const BaseBreadcrumbs = ({ arialabel, breadcrumbs, sx, children }: BaseBreadcrumbsPropsType) => {
   return (
      <WarrperContainer>
         <Breadcrumbs>
            {breadcrumbs &&
               breadcrumbs.map((path, index) => {
                  return (
                     <Box
                        key={index}
                        component={NavLink}
                        to={path.link}
                        sx={{
                           textDecoration: 'none',
                           textTransform: 'capitalize',
                           fontSize: '16px',
                           color: '#1976d2',
                           '&:hover': {
                              textDecoration: 'underline',
                              color: '#1976d2',
                           },
                        }}
                     >
                        {path.title}
                     </Box>
                  );
               })}

            <Typography color="text.primary" sx={{ textTransform: 'capitalize', fontSize: '16px', fontWeight: 500 }}>
               {arialabel}
            </Typography>
         </Breadcrumbs>
         <Content sx={sx}>{children}</Content>
      </WarrperContainer>
   );
};

const WarrperContainer = styled('div')({
   width: '100%',
});

const Content = styled('div')(({ theme }) => ({
   marginTop: 12,
   padding: 12,
   border: '1px solid  #d1d5db5e',
   borderRadius: 5,
   backgroundColor: theme.base.background.white,
}));

export default BaseBreadcrumbs;
