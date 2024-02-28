/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import repairServiceService from '@App/services/repairService.service';
import PageContent from '@App/component/customs/PageContent';
import hendleDateTime from '@Core/Helper/hendleDateTime';
const breadcrumbs = [
   {
      title: 'Dịch vụ sửa chữa',
      link: ROUTE_PATH.REPAIR_SERVICES,
   },
];
const RepairServiceDetails = () => {
   const { id: repairServiceId } = useParams();
   const navigate = useNavigate();
   const { data: repairService } = useQuery(['getRepairServiceDetails'], async () => {
      const res = await repairServiceService.find(repairServiceId as string);
      return res.data;
   });

   const repairServiceDetails = [
      { label: 'Tên dịch vụ sửa chữa', value: repairService?.name },
      { label: 'Giá', value: repairService?.price },
      { label: 'Giảm giá', value: repairService?.discount },
      { label: 'Mô tả', value: repairService?.describe },
      { label: 'Ngày tạo', value: hendleDateTime(repairService?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: hendleDateTime(repairService?.updatedAt) },
   ];

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Chi tiết dịch vụ sửa chữa"
      >
         <Box >
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action="VIEW_ALL">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.REPAIR_SERVICES + '/' + repairServiceId + '/update')}
                  endIcon={<RateReviewRoundedIcon />}
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>

            {repairService && (
               <Stack>
                  <Box sx={{ ml: '25px', mr: '25px' }}>
                     <Grid container spacing={2} >
                        <Grid item xs={12} >
                           <Typography
                              sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                           >
                              Thông tin khách hàng
                           </Typography>
                        </Grid>

                        {repairServiceDetails?.map((detail, index) => (
                           <>
                              <Grid item xs={2} key={index}>
                                 <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>
                                    {detail.label}
                                 </Typography>
                              </Grid >
                              <Grid item xs={10}>
                                 <Typography sx={{ fontSize: '1rem', lineHeight: '32px', height: '32px', fontWeight: '500' }}>{detail.value}</Typography>
                                 <Divider variant="inset" sx={{ ml: 0 }} />
                              </Grid>
                           </>
                        ))
                        }
                     </Grid>
                  </Box>
               </Stack>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};
export default RepairServiceDetails;
