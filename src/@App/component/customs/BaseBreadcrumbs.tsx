import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, Typography, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

interface BaseBreadcrumbsPropsType {
   arialabel: string;
   breadcrumbs?: { title: string; link: string }[];
   children?: React.ReactNode;
}

const BaseBreadcrumbs = ({ arialabel, breadcrumbs, children }: BaseBreadcrumbsPropsType) => {
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
                        sx={({ base }) => ({
                           textDecoration: 'none',
                           textTransform: 'capitalize',
                           color: base.text.gray2,
                           fontSize: '16px',
                           '&:hover': {
                              textDecoration: 'underline',
                              color: base.text.black,
                           },
                        })}
                     >
                        {path.title}
                     </Box>
                  );
               })}

            <Typography color="text.primary" sx={{ textTransform: 'capitalize', fontSize: '16px' }}>
               {arialabel}
            </Typography>
         </Breadcrumbs>
         <Content>{children}</Content>
      </WarrperContainer>
   );
};

const WarrperContainer = styled('div')({
   width: '100%',
});

const Content = styled('div')(({ theme }) => ({
   marginTop: 8,
   padding: 12,
   border: '1px solid  #d1d5db5e',
   borderRadius: 5,
   backgroundColor: theme.base.background.white,
}));

export default BaseBreadcrumbs;
