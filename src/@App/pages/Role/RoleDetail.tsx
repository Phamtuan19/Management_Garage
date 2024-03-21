import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { Box, Button, Grid, Typography } from '@mui/material';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import roleService, { RoleResponseData } from '@App/services/role.service';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import PageContent from '@App/component/customs/PageContent';

import RoleAccordionDetail from './component/RoleAccordionDetail';
import { ROLES, RolePropsTypeConfig } from './utils';

const breadcrumbs = [
   {
      title: 'Danh sách vai trò',
      link: ROUTE_PATH.ROLES,
   },
];

const RoleDetailScreen = () => {
   const { id: roleId } = useParams();
   const navigate = useNavigate();

   const { data: roleDetail, isLoading } = useQuery<RoleResponseData, Error>(['getDetailRole'], async () => {
      const res = await roleService.find(roleId as string);
      return res.data as RoleResponseData;
   });

   const render = [
      { label: 'Tên vai trò:', value: roleDetail?.name },
      { label: 'Mô tả', value: roleDetail?.describe },
   ];

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết vai trò"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
            isCheck={true}
            data={roleDetail}
            isLoading={isLoading}
         >
            <PermissionAccessRoute module={MODULE_PAGE.ROLES} action="VIEW_ALL">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.ROLES + '/' + roleId + '/update/')}
                  endIcon={<RateReviewRoundedIcon />}
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
            {roleDetail && (
               <>
                  <PageContent>
                     <Grid container spacing={1} columnSpacing={4}>
                        {render.map((info, index) => (
                           <Grid item xs={6} key={index}>
                              <Grid container spacing={1}>
                                 <Grid item xs={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Typography
                                       sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}
                                    >
                                       {info.label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={10}>
                                    <Typography
                                       sx={{
                                          p: 1,
                                          pb: 0,
                                          fontWeight: '500',
                                          flexGrow: 1,
                                          fontSize: '1rem',
                                          lineHeight: '2rem',
                                          minHeight: '40px',
                                       }}
                                    >
                                       {info.value}
                                    </Typography>
                                    <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
                                 </Grid>
                              </Grid>
                           </Grid>
                        ))}
                     </Grid>
                  </PageContent>
                  <PageContent>
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
                              {ROLES.map((role: RolePropsTypeConfig, index: number) => {
                                 return (
                                    <Box key={index} sx={{ borderBottom: '1px solid #E8EAEB' }}>
                                       <RoleAccordionDetail roleDetail={roleDetail} role={role} />
                                    </Box>
                                 );
                              })}
                           </Box>
                        </Grid>
                     </Grid>
                  </PageContent>
               </>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};

export default RoleDetailScreen;
