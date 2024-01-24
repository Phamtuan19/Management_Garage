import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import materialsCatalogService, { IMaterialsCatalog } from '@App/services/materialsCatalog.service';
import { Box, Typography, Stack, Button } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';

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
   const formatDate = (dateString: string | number | Date) => {
      return new Date(dateString).toLocaleString('en-US', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
      });
   };

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết danh mục vật tư"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            {material && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
                        <PermissionAccessRoute module={MODULE_PAGE.MATERIALS_CATALOGS} action="VIEW_ALL">
                           <Button
                              variant="contained"
                              onClick={() => navigate(ROUTE_PATH.MATERIALS_CATALOGS + '/update/' + materialId)}
                              endIcon={<RateReviewRoundedIcon />}
                           >
                              Chỉnh sửa
                           </Button>
                        </PermissionAccessRoute>
                     </Box>
                     <Box sx={{ mt: 4, p: 2, borderRadius: 2, position: 'relative' }}>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 32 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Mã vật tư
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>{material.code}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 21 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Tên danh mục vật tư
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>{material.name}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 32 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Ngày tạo
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>
                              {formatDate(material.createdAt)}
                           </Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 22 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Ngày cập nhật cuối
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>
                              {formatDate(material.updatedAt)}
                           </Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 35 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Mô tả
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>{material.describe}</Typography>
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};
export default MaterialsCatalogDetails;
