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
import { format } from 'date-fns';
import repairServiceService from '@App/services/repairService.service';
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

   const formatDate = (dateString: string | number | Date) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };
   const DetailsItem = ({ label, value }: { label: string; value: string }) => (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         <Grid item xs={3}>
            <Typography sx={{ p: 1, fontWeight: '700', fontSize: '1rem', color: theme.palette.grey[800] }}>
               {label}
            </Typography>
         </Grid>
         <Grid item xs={9}>
            <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem' }}>{value}</Typography>
            <Divider variant="inset" sx={{ m: 0 }} />
         </Grid>
      </Grid>
   );
   const DetailsSection = ({ details }: { details: { label: string; value: string }[] }) =>
      details.map((detail: { label: string; value: string }, index: React.Key | null | undefined) => (
         <Grid key={index}>
            <DetailsItem label={detail.label} value={detail.value} />
         </Grid>
      ));
   const repairServiceDetails = [
      { label: 'Tên dịch vụ sửa chữa', value: repairService?.name },
      { label: 'Giá', value: repairService?.price },
      { label: 'Giảm giá', value: repairService?.discount },
      { label: 'Mô tả', value: repairService?.describe },
      { label: 'Ngày tạo', value: formatDate(repairService?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formatDate(repairService?.updatedAt) },
   ];

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết dịch vụ sửa chữa"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            {repairService && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
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
                     <Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin dịch vụ sửa chữa
                              </Typography>
                           </Box>
                           <DetailsSection details={repairServiceDetails as any} />
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};
export default RepairServiceDetails;
