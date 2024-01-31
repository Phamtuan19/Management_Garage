/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
// import { format } from 'date-fns';
import suppliesService, { Supplies } from '@App/services/supplies.service';

const breadcrumbs = [
   {
      title: 'Vật tư',
      link: ROUTE_PATH.SUPPLIES,
   },
];
const DistributorDetails = () => {
   const { id: suppliesId } = useParams();
   const navigate = useNavigate();
   const { data: supplies } = useQuery<Supplies, Error>(['getSuppliesDetails'], async () => {
      const suppliesRes = await suppliesService.find(suppliesId as string);
      return suppliesRes.data as Supplies;
   });
   //    const formatDate = (dateString: string | number | Date) => {
   //       return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   //    };
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
      details.map((detail, index) => (
         <Grid key={index}>
            <DetailsItem label={detail.label} value={detail.value} />
         </Grid>
      ));
   const suppliesDetails = [
      { label: 'Tên vật tư', value: supplies?.name },
      { label: 'Danh mục', value: supplies?.materials_catalog_id.name },
      { label: 'Đơn vị', value: supplies?.unit },
      { label: 'Giảm giá', value: supplies?.discount },
      { label: 'Mô tả', value: supplies?.describe },
   ];
   const materialsCatalogDetails = [
      { label: 'Mã danh mục', value: supplies?.materials_catalog_id.code },
      { label: 'Tên danh mục', value: supplies?.materials_catalog_id.name },
      { label: 'Mô tả danh mục', value: supplies?.materials_catalog_id.describe },
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
                           <DetailsSection details={suppliesDetails} />
                        </Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin danh mục vật tư
                              </Typography>
                           </Box>
                           <DetailsSection details={materialsCatalogDetails} />
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};
export default DistributorDetails;
