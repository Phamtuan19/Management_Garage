/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import { Box, Typography, Button, Grid } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';

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
      { label: 'Mô tả', value: material?.describe, xs: 12 },
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
               <Grid container spacing={1} columnSpacing={8}>
                  {materialCatalogDetails.map((detail, index) => (
                     <Grid item xs={detail.xs ? detail.xs : 6}>
                        <Grid container spacing={1}>
                           <Grid item xs={detail.xs ? 1.4 : 3} paddingBottom={2} key={index}>
                              <Typography
                                 sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}
                              >
                                 {detail.label}
                              </Typography>
                           </Grid>
                           <Grid item xs={detail.xs ? 10.6 : 9}>
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
                                 {detail.value}
                              </Typography>
                              <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
                           </Grid>
                        </Grid>
                     </Grid>
                  ))}
               </Grid>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};
export default MaterialsCatalogDetails;
