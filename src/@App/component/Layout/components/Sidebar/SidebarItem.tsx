import { AccordionDetails, Box, Stack, Typography, styled } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { NavLink } from 'react-router-dom';
import menuConfig from '@App/configs/menuConfig';

const SidebarItem = () => {
   return (
      <Stack>
         {menuConfig.map((item) => {
            const Icon = item.icon;
            if (item.children) {
               return (
                  <Accordion key={item.id}>
                     <AccordionSummary>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                           <Icon sx={{ width: '24px', height: '24px' }} />
                           <Typography sx={{ fontSize: '17px' }}>{item.title}</Typography>
                        </Box>
                     </AccordionSummary>
                     <AccordionDetails>
                        {item.children.map((item) => {
                           return (
                              <Box
                                 sx={{
                                    py: 1,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    ml: 2,
                                 }}
                              >
                                 <Typography
                                    component={NavLink}
                                    to={item.link}
                                    sx={({ theme }) => ({
                                       '&:hover': {
                                          color: '#0072E5',
                                       },
                                       ':hover': {
                                          color: '#0072E5',
                                       },
                                       textDecoration: 'none',
                                       color: '#050505',
                                       fontSize: '17px',
                                       fontWeight: '400',
                                    })}
                                 >
                                    {item.title}
                                 </Typography>
                              </Box>
                           );
                        })}
                     </AccordionDetails>
                  </Accordion>
               );
            }

            return (
               <Box component={ExtendNavLink} to={item.link} key={item.id}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        my: '12px',
                        ml: '8px',
                        gap: 2,
                     }}
                  >
                     <Icon sx={{ width: '24px', height: '24px' }} />
                     <Typography sx={{ display: 'block', fontSize: '17px' }}>{item.title}</Typography>
                  </Box>
               </Box>
            );
         })}
      </Stack>
   );
};

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
   ({ theme }) => ({
      '&:not(:last-child)': {
         borderBottom: 0,
      },
      '&:before': {
         display: 'none',
      },
      '& .Mui-expanded': {
         backgroundColor: theme.palette.background.default,
      },
   }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
   <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
   boxShadow: 'unset',
   flexDirection: 'row',
   paddingLeft: theme.spacing(2),
   textDecoration: 'none',
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
   },
}));

const ExtendNavLink = styled(NavLink)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   height: '49.7px',
   padding: '0 16px',
   textDecoration: 'none',
   color: theme.base.color.text,
   '&.active': {
      backgroundColor: '#f3f5f7',
   },
}));

export default SidebarItem;
