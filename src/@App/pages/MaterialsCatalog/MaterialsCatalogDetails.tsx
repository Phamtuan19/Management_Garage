/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import materialsCatalogService, { IMaterialsCatalog } from '@App/services/materialsCatalog.service';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { format } from 'date-fns';

const breadcrumbs = [
   {
      title: 'Danh mục vật tư',
      link: ROUTE_PATH.MATERIALS_CATALOGS,
   },
];
const MaterialsCatalogDetails = () => {
   const { id: materialId } = useParams();
   const navigate = useNavigate();

   const { data: material } = useQuery<IMaterialsCatalog, Error>(['getMaterialsCatalogDetails'], async () => {
      const res = await materialsCatalogService.find(materialId as string);
      return res.data as IMaterialsCatalog;
   });
   const formDate = (dateString: string | undefined) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };
   const materialCatalogDetails = [
      { label: 'Mã vật tư', value: material?.code },
      { label: 'Tên vật tư', value: material?.name },
      { label: 'Mô tả', value: material?.describe },
      { label: 'Ngày tạo', value: formDate(material?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formDate(material?.updatedAt) },
   ];

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết danh mục vật tư"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            <Box sx={{ p: 1 }}>
               <PermissionAccessRoute module={MODULE_PAGE.MATERIALS_CATALOGS} action="VIEW_ALL">
                  <Button
                     variant="contained"
                     onClick={() => navigate(ROUTE_PATH.MATERIALS_CATALOGS + '/' + materialId + '/update')}
                     endIcon={<RateReviewRoundedIcon />}
                  >
                     Chỉnh sửa
                  </Button>
               </PermissionAccessRoute>
            </Box>
            {material && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box>
                        <Box sx={{ mt: 2, p: 2, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin danh mục vật tư
                              </Typography>
                           </Box>
                           {materialCatalogDetails.map((detail, index) => (
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
const DetailsItem = ({ label, value }: { label: string; value: string | undefined }) => (
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
         <Typography sx={{ p: 1, fontSize: '1rem', color: theme.palette.grey[800] }}>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
         <Typography sx={{ p: 1, fontWeight: '700', flexGrow: 1, fontSize: '1rem' }}>{value}</Typography>
      </Grid>
   </Grid>
);
export default MaterialsCatalogDetails;
