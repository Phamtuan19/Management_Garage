import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import materialsCatalogService, { MaterialsCatalog } from '@App/services/materialsCatalog.service';
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

   const { data: material } = useQuery<MaterialsCatalog, Error>(['getMaterialsCatalogDetails'], async () => {
      const res = await materialsCatalogService.find(materialId as string);
      return res.data as MaterialsCatalog;
   });
   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết danh mục vật tư"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            {material && (
               <Stack>
                  <Box sx={{ mt: 5, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Typography
                        variant="h2"
                        sx={{
                           fontSize: '1rem',
                           py: '16px',
                           lineHeight: '20px',
                           fontWeight: 500,
                           borderBottom: '1px solid #E8EAEB',
                        }}
                     >
                        Chi tiết danh mục vật tư
                        <Box component="span" ml={0.5} color="red">
                           *
                        </Box>
                     </Typography>
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
                     <Box sx={{ mt: 2, bgcolor: '#FFFF', p: 2, borderRadius: 2, position: 'relative' }}>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 32 }}>
                           <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>Mã vật tư</Typography>
                           <Typography sx={{ flexGrow: 1, fontWeight: '500' }}>{material.code}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 21 }}>
                           <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Tên danh mục vật tư
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontWeight: '500' }}>{material.name}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 32 }}>
                           <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>Ngày tạo</Typography>
                           <Typography sx={{ flexGrow: 1, fontWeight: '500' }}>{material.createdAt}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 22 }}>
                           <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Ngày cập nhật cuối
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontWeight: '500' }}>{material.updatedAt}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 35 }}>
                           <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>Mô tả</Typography>
                           <Typography sx={{ flexGrow: 1, fontWeight: '500' }}>{material.describe}</Typography>
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
