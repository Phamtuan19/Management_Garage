/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import Divider from '@mui/material/Divider';
import hendleDateTime from '@Core/Helper/hendleDateTime';

const breadcrumbs = [
   {
      title: 'Danh mục vật tư',
      link: ROUTE_PATH.MATERIALS_CATALOGS,
   },
];
const MaterialsCatalogDetails = () => {
   const { id: materialId } = useParams();
   const navigate = useNavigate();

   const { data: material } = useQuery(['getMaterialsCatalogDetails'], async () => {
      const res = await materialsCatalogService.find(materialId as string);
      return res.data;
   });
   const materialCatalogDetails = [
      { label: 'Mã vật tư', value: material?.code },
      { label: 'Tên vật tư', value: material?.name },
      { label: 'Mô tả', value: material?.describe },
      { label: 'Ngày tạo', value: hendleDateTime(material?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: hendleDateTime(material?.updatedAt) },
   ];

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Chi tiết danh mục vật tư"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <Box>
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
         <PageContent>
            {material && (
               <Stack>
                  <Box sx={{ ml: '25px', mr: '25px' }}>
                     <Typography sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}>
                        Thông tin danh mục vật tư
                     </Typography>
                     {materialCatalogDetails.map((detail, index) => (
                        <Grid key={index}>
                           <DetailsItem label={detail.label} value={detail.value} />
                        </Grid>
                     ))}
                  </Box>
               </Stack>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};
const DetailsItem = ({ label, value }: { label: string; value: string | undefined }) => (
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
         <Typography sx={{ p: 1, fontSize: '1rem', color: theme.palette.grey[800] }}>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
         <Typography sx={{ p: 1, fontWeight: '500', flexGrow: 1, fontSize: '1rem', height: '32px' }}>
            {value}
         </Typography>
         <Divider variant="inset" sx={{ m: 0 }} />
      </Grid>
   </Grid>
);
export default MaterialsCatalogDetails;
