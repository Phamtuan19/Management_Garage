/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect, useMemo, useState } from 'react';
import menuConfig from '@App/configs/menu-config';
import { NavLink, useLocation } from 'react-router-dom';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { AccordionDetails, Box, Stack, Typography, styled } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { MenuConfigChildren, MenuConfigItem } from '@App/configs/config';
import { useAuth } from '@App/redux/slices/auth.slice';

const SidebarItem = () => {
   const { userPermission } = useAuth();
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

   const menus = useMemo(() => {
      if (!userPermission) return [];
      return menuConfig.filter((item) => {
         if (userPermission === '*') return true;
         if (item.children) {
            item.children = item.children.filter((child) => {
               const modulePermission = userPermission[child.module];
               return modulePermission && (modulePermission === '*' || modulePermission.includes(child.action));
            });
            return item.children.length > 0;
         }
         return (
            (userPermission[item.module!] && userPermission[item.module!].includes(item.action!)) ||
            userPermission[item.module!] === '*'
         );
      });
   }, []);

   return (
      <Stack sx={{ gap: 0.5, pt: 1 }}>
         {menus.map((item: MenuConfigItem) => {
            const Icon = item.icon as React.FC<{
               sx?: Record<string, unknown>;
            }>;
            if (item.children) {
               const isLocationPath = location.pathname.includes(item.link);

               return (
                  <Accordion
                     key={item.id}
                     expanded={expanded.includes(item.link.split('/')[1])}
                     onChange={() => handleChange(item.link.split('/')[1])}
                  >
                     <AccordionSummary locationpath={isLocationPath.toString()}>
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
                           <Typography sx={{ fontSize: '16px', fontWeight: isLocationPath ? 600 : 400 }}>
                              {item.title}
                           </Typography>
                        </Box>
                     </AccordionSummary>
                     <AccordionDetails sx={{ pt: 0.5 }}>
                        {item.children.map((children: MenuConfigChildren) => {
                           return (
                              <Box
                                 key={children.id}
                                 component={NavLink}
                                 to={children.link}
                                 sx={({ base }) => ({
                                    py: 1,
                                    pl: 2,
                                    ml: 1,
                                    display: 'flex',
                                    gap: '0 8px',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    color: base.color.text as string,
                                    borderRadius: '5px',
                                    '&:hover': {
                                       backgroundColor: '#f3f5f7',
                                    },
                                    '&.active': {
                                       backgroundColor: '#f3f5f7',
                                    },
                                    backgroundColor: location.pathname.split('/').includes(children.link.split('/')[2])
                                       ? '#f3f5f7'
                                       : 'transparent',
                                 })}
                                 end
                              >
                                 <FiberManualRecordIcon sx={{ fontSize: '8px' }} />
                                 <Typography
                                    sx={({ base }) => ({
                                       color: base.color.text as string,
                                       fontSize: '16px',
                                       fontWeight: '400',
                                    })}
                                 >
                                    {children.title}
                                 </Typography>
                              </Box>
                           );
                        })}
                     </AccordionDetails>
                  </Accordion>
               );
            }

            return (
               <Box key={item.id} component={ExtendNavLink} to={item.link} end>
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
