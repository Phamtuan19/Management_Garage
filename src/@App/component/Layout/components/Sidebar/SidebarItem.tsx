import { AccordionDetails, Box, Stack, Typography, styled } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { NavLink, useLocation } from 'react-router-dom';
import menuConfig from '@App/configs/menuConfig';
import { useEffect, useState } from 'react';

const SidebarItem = () => {
   const location = useLocation();

   const [expanded, setExpanded] = useState<string[]>([]);

   const handleChange = (panel: string) => {
      setExpanded((prevExpanded) => {
         const index = prevExpanded.indexOf(panel);
         if (index === -1) {
            return [...prevExpanded, panel];
         } else {
            return [...prevExpanded.slice(0, index), ...prevExpanded.slice(index + 1)];
         }
      });
   };

   useEffect(() => {
      setExpanded([location.pathname.split('/')[1]]);
   }, [location.pathname]);

   return (
      <Stack sx={{ gap: 0.5, pt: 1 }}>
         {menuConfig.map((item) => {
            const Icon = item.icon;
            if (item.children) {
               const locationPath = location.pathname.includes(item.link);

               return (
                  <Accordion
                     key={item.id}
                     expanded={expanded.includes(item.link)}
                     onChange={() => handleChange(item.link)}
                  >
                     <AccordionSummary locationpath={locationPath.toString()}>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 2,
                              py: 1,
                           }}
                        >
                           <Icon sx={{ width: '20px', height: '20px' }} />
                           <Typography sx={{ fontSize: '16px', fontWeight: locationPath ? 600 : 400 }}>
                              {item.title}
                           </Typography>
                        </Box>
                     </AccordionSummary>
                     <AccordionDetails sx={{ pt: 0.5 }}>
                        {item.children.map((item) => {
                           return (
                              <Box
                                 component={NavLink}
                                 key={item.id}
                                 to={item.link}
                                 sx={({ base }) => ({
                                    py: 1,
                                    pl: 2,
                                    ml: 1,
                                    display: 'flex',
                                    gap: '0 8px',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    color: base.color.text,
                                    borderRadius: '5px',
                                    '&:hover': {
                                       // '& .MuiSvgIcon-root': {
                                       //    color: '#0072E5',
                                       // },
                                    },
                                    '&.active': {
                                       backgroundColor: '#f3f5f7',
                                    },
                                 })}
                                 end
                              >
                                 <FiberManualRecordIcon sx={{ fontSize: '8px' }} />
                                 <Typography
                                    sx={({ base }) => ({
                                       color: base.color.text,
                                       fontSize: '16px',
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
               <Box component={ExtendNavLink} to={item.link} key={item.id} end>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'start',
                        alignItems: 'center',
                        py: 1,
                        pl: 1,
                        gap: 2,
                        width: '100%',
                        borderRadius: '5px',
                     }}
                  >
                     <Icon sx={{ width: '20px', height: '20px' }} />
                     <Typography sx={{ display: 'block', fontSize: '16px' }}>{item.title}</Typography>
                  </Box>
               </Box>
            );
         })}
      </Stack>
   );
};

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
   ({ theme }) => ({
      gap: 0,
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

const AccordionSummary = styled((props: AccordionSummaryProps & { locationpath: string }) => (
   <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ locationpath }) => ({
   minHeight: 'auto ',
   boxShadow: 'unset',
   flexDirection: 'row',
   margin: '0px 16px',
   padding: '0px 8px 0px',
   borderRadius: '5px',
   textDecoration: 'none',
   cursor: 'pointer',
   backgroundColor: locationpath === 'true' ? '#f3f5f7 !important' : 'inherit',
   '&:hover': {
      backgroundColor: '#f3f5f7 !important',
   },
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      backgroundColor: '#f3f5f7 !important',
      transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-content': {
      margin: '1px !important',
   },
   '& .css-635bne-MuiPaper-root-MuiAccordion-root .Mui-expanded': {
      backgroundColor: '#f3f5f7 !important',
   },
}));

const ExtendNavLink = styled(NavLink)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   // height: '49.7px',
   padding: '0 16px',
   textDecoration: 'none',
   color: theme.base.color.text,
   '&.active': {
      '.MuiBox-root': {
         backgroundColor: '#f3f5f7',
      },
      '.MuiTypography-root ': {
         fontWeight: '600',
      },
   },
}));

export default SidebarItem;
