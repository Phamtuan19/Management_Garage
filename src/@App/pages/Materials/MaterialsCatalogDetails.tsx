import { useParams } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import { Box, Typography } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';

const breadcrumbs = [
   {
      title: 'Danh mục chi tiết sản phẩm',
      link: ROUTE_PATH.MATERIALS_CATALOGS,
   },
];
export default function MaterialDetail() {
   const { id: materialId } = useParams();

   const queryMaterial = useQuery(['getMaterialsCatalogDetails', materialId], async () => {
      const res = await materialsCatalogService.find(materialId!);
      return res.data;
   });

   const material = queryMaterial.data;

   if (queryMaterial.isLoading) {
      return <div>Loading...</div>;
   }

   if (queryMaterial.isError) {
      return <div>Error loading material</div>;
   }

   return (
      <BaseBreadcrumbs arialabel={material.name} breadcrumbs={breadcrumbs}>
         <Box>
            <Typography>Mã:{material.code}</Typography>
            <Typography>Tên danh mục:{material.name}</Typography>
            <Typography>Mô tả:{material.describe}</Typography>
            <Typography>Ngày tạo:{material.createdAt}</Typography>
            <Typography>Ngày cập nhật :{material.updatedAt}</Typography>
         </Box>
      </BaseBreadcrumbs>
   );
}
