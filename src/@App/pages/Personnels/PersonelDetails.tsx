/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Button, Grid } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import personnelService from '@App/services/personnel.service';
import PageContent from '@App/component/customs/PageContent';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';

import { positions } from './utils';

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
      return personnelRes.data[0];
   });

   const personnelDetails = [
      { label: 'Mã nhân viên', value: `#${personnels?.code}` },
      { label: 'Giới tính', value: personnels?.gender },
      { label: 'Họ và tên', value: personnels?.full_name },
      { label: 'Ngày sinh', value: personnels?.birth_day },
      { label: 'Vị trí làm việc', value: positions.find((item) => item.key === personnels?.position)?.label },
      { label: 'Ngày nhận việc', value: personnels?.hire_date },
      { label: 'CCCD', value: personnels?.cccd_number },
      { label: 'Số điện thoại', value: personnels?.phone },
      { label: 'Vai trò', value: personnels?.role_id.name },
      { label: 'Địa chỉ', value: '' },
   ];

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Chi tiết nhân viên"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action="UPDATE">
            <Button
               variant="contained"
               onClick={() => navigate(ROUTE_PATH.PERSONNELS + '/' + personnelId + '/update')}
               endIcon={<RateReviewRoundedIcon />}
               sx={{ py: '5px', px: '12px' }}
            >
               Chỉnh sửa
            </Button>
         </PermissionAccessRoute>
         <PageContent>
            {personnels && (
               <Grid container spacing={2}>
                  {personnelDetails.map((item, index) => {
                     return (
                        <Grid item xs={6} key={index}>
                           <Grid container spacing={1}>
                              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                 <ControllerLabel title={item.label} />
                              </Grid>
                              <Grid item xs={8}>
                                 <Typography
                                    sx={{
                                       p: 1,
                                       pb: 0,
                                       fontWeight: '500',
                                       flexGrow: 1,
                                       fontSize: '1rem',
                                       minHeight: '24px',
                                       lineHeight: '1.5rem',
                                    }}
                                 >
                                    {item.value}
                                 </Typography>
                                 <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
                              </Grid>
                           </Grid>
                        </Grid>
                     );
                  })}
               </Grid>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default PersonnelDetails;
