/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */

import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import roleService, { RoleResponseData } from '@App/services/role.service';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';

import RoleDetailText from './component/RoleDetailText';
import { ROLES } from './utils';
import RoleDetailTextSection from './component/RoleDetailTextSection';

const breadcrumbs = [
   {
      title: 'Danh sách vai trò',
      link: ROUTE_PATH.ROLES,
   },
];

const RoleDetailScreen = () => {
   const { id: roleId } = useParams();
   const navigate = useNavigate();

   const { data: roleDetail } = useQuery(['getDetailRole'], async () => {
      const res = await roleService.find(roleId as string);
      return res.data as unknown as RoleResponseData;
   });

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết vai trò"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            <Stack>
               <Box sx={{ mt: 2, bgcolor: '#FFFF', p: 2, borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ minHeight: '80px', display: 'flex', gap: 1 }}>
                     <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>Tên vai trò:</Typography>
                     <Typography sx={{ flexGrow: 1, fontWeight: '500' }}>{roleDetail?.name as unknown as string}.</Typography>
                  </Box>

                  <Box sx={{ minHeight: '80px', display: 'flex', gap: 1 }}>
                     <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>Tên vai trò:</Typography>
                     <Typography sx={{ flexGrow: 1, fontWeight: '500' }}>{roleDetail?.describe as unknown as string}.</Typography>
                  </Box>
                  <Box sx={{ position: 'absolute', top: '0', right: '0', p: 3 }}>
                     <PermissionAccessRoute module={MODULE_PAGE.ROLES} action="VIEW_ALL">
                        <Button
                           variant="contained"
                           onClick={() => navigate(ROUTE_PATH.ROLES + '/update/' + roleId)}
                           endIcon={<RateReviewRoundedIcon />}
                        >
                           Chỉnh sửa
                        </Button>
                     </PermissionAccessRoute>
                  </Box>
               </Box>
               <Box sx={{ mt: 3.5, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2 }}>
                  <Typography
                     variant="h2"
                     sx={{
                        fontSize: '1rem',
                        py: '16px',
                        lineHeight: '20px',
                        fontWeight: 500,
                        borderBottom: '1px solid #E8EAEB',
                     }}
                  >
                     Chi tiết vai trò
                     <Box component="span" ml={0.5} color="red">
                        *
                     </Box>
                  </Typography>
                  <Grid container spacing={2}>
                     <Grid item md={12}>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                           {ROLES.map((role, index) => {
                              return (
                                 <Box key={index} sx={{ borderBottom: '1px solid #E8EAEB' }}>
                                    <RoleDetailText roleDetail={roleDetail} role={role} />
                                 </Box>
                              );
                           })}
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
            </Stack>
         </BaseBreadcrumbs>
      </Box>
   );
};

export default RoleDetailScreen;
