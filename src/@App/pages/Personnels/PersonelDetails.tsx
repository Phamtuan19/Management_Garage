/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid, Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import personnelService from '@App/services/personnel.service';

const breadcrumbs = [
   {
      title: 'Nhân sự',
      link: ROUTE_PATH.PERSONNELS,
   },
];
const PersonnelDetails = () => {
   const { id: personnelId } = useParams();
   const navigate = useNavigate();
   const { data: personnels } = useQuery(['getPersonnelDetails'], async () => {
      const personnelRes = await personnelService.find(personnelId as string);
      return personnelRes.data;
   });

   const personnelDetails = [
      { label: 'Mã nhân viên', value: 'code' },
      { label: 'Họ và tên', value: 'full_name' },
      { label: 'Số điện thoại', value: 'phone' },
      { label: 'Ngày sinh', value: 'birth_day' },
      { label: 'Giới tính', value: 'gender' },
      { label: 'CCCD', value: 'cccd_number' },
      { label: 'Ngày nhận việc', value: 'hire_date' },
   ];

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết nhân viên"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action="VIEW_ALL">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.PERSONNELS + '/' + personnelId + '/update')}
                  endIcon={<RateReviewRoundedIcon />}
                  sx={{ py: '5px', px: '12px' }}
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
            {personnels && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 // sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                                 variant="h6"
                              >
                                 Thông tin nhân viên
                              </Typography>
                           </Box>
                           <Grid container spacing={2}>
                              {personnelDetails.map((detail: { label: string; value: string }, index: number) => {
                                 return (
                                    <Grid item key={index} xs={12}>
                                       <DetailsItem label={detail.label} value={personnels[0][detail.value]} />
                                    </Grid>
                                 );
                              })}
                              <Grid item xs={12}>
                                 <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={2}>
                                       <Typography
                                          sx={{
                                             p: 1,

                                             fontSize: '1rem',
                                             color: theme.palette.grey[800],
                                          }}
                                       >
                                          Vai trò
                                       </Typography>
                                    </Grid>
                                    <Grid item xs={10}>
                                       <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem', fontWeight: '700' }}>
                                          <Chip label={personnels[0].role_id.name} color="success" />
                                       </Typography>
                                       <Divider variant="inset" sx={{ m: 0 }} />
                                    </Grid>
                                    <Grid item md={12}></Grid>
                                 </Grid>
                              </Grid>
                           </Grid>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}></Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};

const DetailsItem = ({ label, value }: { label: string; value: string }) => (
   <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={2}>
         <Typography
            sx={{
               p: 1,
               fontSize: '1rem',
               color: theme.palette.grey[800],
               height: '35px',
               display: 'flex',
               alignItems: 'center',
            }}
         >
            {label}
         </Typography>
      </Grid>
      <Grid item xs={10}>
         <Typography
            sx={{
               p: 1,
               flexGrow: 1,
               fontSize: '1rem',
               height: '35px',
               fontWeight: '700',
               display: 'flex',
               alignItems: 'center',
            }}
         >
            {value || ''}
         </Typography>
         <Divider variant="inset" sx={{ m: 0 }} />
      </Grid>
      <Grid item md={12}></Grid>
   </Grid>
);

export default PersonnelDetails;
