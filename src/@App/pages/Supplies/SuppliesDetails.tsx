/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
// eslint-disable-next-line import/order
import Divider from '@mui/material/Divider';

import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import suppliesdetailsServices from '@App/services/supplies-details.service';
import { format } from 'date-fns';

const breadcrumbs = [
   {
      title: 'Vật tư',
      link: ROUTE_PATH.SUPPLIES_DETAILS,
   },
];
const SuppliesDetails = () => {
   const { id: suppliesId } = useParams();

   const navigate = useNavigate();
   const { data: supplies } = useQuery(['getSuppliesDetails', suppliesId], async () => {
      const suppliesRes = await suppliesdetailsServices.get();
      const suppliesDetailData = suppliesRes.data;
      const relatedDetails = suppliesDetailData?.data.filter(
         (detail: { supplies_id: { _id: string | undefined } }) => detail.supplies_id._id === suppliesId,
      );

      return { details: relatedDetails };
   });
   const formatDate = (dateString: string | number | Date) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };
   const suppliesDetails = [
      { label: 'Tên vật tư', value: supplies?.details[0]?.name_detail },
      { label: 'Tên nhà phân phối', value: supplies?.details[0]?.distributor_id.name },
      { label: 'Danh mục', value: (supplies?.details[0]?.supplies_id.materials_catalog_id!.name as string) || '' },
      { label: 'Đơn vị', value: supplies?.details[0]?.supplies_id.unit },
      { label: 'Giảm giá', value: supplies?.details[0]?.supplies_id.discount },
      { label: 'Mô tả', value: supplies?.details[0]?.supplies_id.describe },
      { label: 'Trạng thái hàng', value: supplies?.details[0]?.isInStock ? 'Còn hàng' : 'Hết hàng' },
      { label: 'Ngày tạo', value: formatDate(supplies?.details[0]?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formatDate(supplies?.details[0]?.updatedAt) },
   ];
   const distributorDetails = [
      { label: 'Tên nhà phân phối', value: supplies?.details[0]?.distributor_id.name },
      { label: 'Mã nhà phân phối', value: supplies?.details[0]?.distributor_id.code },
      { label: 'Email', value: supplies?.details[0]?.distributor_id.email },
      { label: 'Số điện thoại', value: supplies?.details[0]?.distributor_id.phone },
   ];

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết vật tư"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            {supplies && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
                        <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="VIEW_ALL">
                           <Button
                              variant="contained"
                              onClick={() => navigate(ROUTE_PATH.SUPPLIES + '/' + suppliesId + '/update')}
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
                                 Thông tin vật tư
                              </Typography>
                           </Box>

                           {suppliesDetails.map((detail, index) => (
                              <Grid key={index}>
                                 <DetailsItem label={detail.label} value={detail.value} />
                              </Grid>
                           ))}
                        </Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin nhà phân phối
                              </Typography>
                           </Box>

                           {distributorDetails.map((detail, index) => (
                              <Grid key={index}>
                                 <DetailsItem label={detail.label} value={detail.value} />
                              </Grid>
                           ))}
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
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
export default SuppliesDetails;
