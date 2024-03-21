import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { Box, Typography, Button, Grid } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import suppliesService, { SuppliesFindOne } from '@App/services/supplies.service';
import { useMemo } from 'react';
import formatDateTime from '@Core/Helper/formatDateTime';

import DetailTableSupplies from './component/DetailTableSupplies';

const breadcrumbs = [
   {
      title: 'Vật tư',
      link: ROUTE_PATH.SUPPLIES,
   },
];

interface RenderSuppliesDetails {
   label: string;
   value: string | number;
   border?: boolean;
}

const SuppliesDetails = () => {
   const { id: suppliesId } = useParams();

   const navigate = useNavigate();
   const { data: supplies, isLoading } = useQuery(['getSuppliesDetails', suppliesId], async () => {
      const res = await suppliesService.find(suppliesId as string);
      return res.data as SuppliesFindOne;
   });

   const { suppliesDetails } = useMemo(() => {
      const suppliesDetails: RenderSuppliesDetails[] = supplies
         ? [
              { label: 'Tên vật tư', value: supplies.name, border: true },
              { label: 'Danh mục', value: supplies.materials_catalog_id.name, border: true },
              { label: 'Đơn vị', value: supplies.unit, border: true },
              { label: 'Mô tả', value: supplies.describe, border: true },
              // { label: 'Trạng thái hàng', value: supplies?.details?.isInStock ? 'Còn hàng' : 'Hết hàng' },
              { label: 'Ngày tạo', value: formatDateTime(supplies.createdAt), border: true },
           ]
         : [];
      return { suppliesDetails };
   }, [supplies]);

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Chi tiết vật tư"
         data={supplies}
         isCheck
         isLoading={isLoading}
      >
         <Box display="flex" gap="12px">
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="UPDATE">
               <Button variant="contained" onClick={() => navigate(ROUTE_PATH.SUPPLIES + ROUTE_PATH.CREATE)}>
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="UPDATE">
               <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(ROUTE_PATH.SUPPLIES + '/' + suppliesId + '/update')}
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            <Grid container spacing={1} columnSpacing={8}>
               {suppliesDetails.map((detail, index) => (
                  <Grid item xs={6}>
                     <Grid container spacing={1}>
                        <Grid item xs={2} paddingBottom={2} key={index}>
                           <Typography sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}>
                              {detail.label}
                           </Typography>
                        </Grid>
                        <Grid item xs={10}>
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
                           {detail.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                        </Grid>
                     </Grid>
                  </Grid>
               ))}
            </Grid>

            <Box mt={4}>
               <DetailTableSupplies supplies={supplies} />
            </Box>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default SuppliesDetails;
