/* eslint-disable @typescript-eslint/naming-convention */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { Box, Typography, Button, Grid, Tab } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import suppliesService, { SuppliesFindOne } from '@App/services/supplies.service';
import { useMemo } from 'react';
import formatDateTime from '@Core/Helper/formatDateTime';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

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

   const { searchParams, setParams } = useSearchParamsHook();

   const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
      setParams('tab', newValue);
   };

   const navigate = useNavigate();
   const { data: supplies } = useQuery(['getSuppliesDetails', suppliesId], async () => {
      const res = await suppliesService.find(suppliesId as string);

      return res.data as SuppliesFindOne;
   });

   const { suppliesDetails } = useMemo(() => {
      const suppliesDetails: RenderSuppliesDetails[] = supplies
         ? [
              { label: 'Tên vật tư', value: supplies.name, border: true },
              { label: 'Danh mục', value: supplies.materials_catalog_id.name, border: true },
              { label: 'Đơn vị', value: supplies.unit, border: true },
              { label: 'Giảm giá', value: supplies.discount, border: true },
              { label: 'Mô tả', value: supplies.describe, border: true },
              // { label: 'Trạng thái hàng', value: supplies?.details?.isInStock ? 'Còn hàng' : 'Hết hàng' },
              { label: 'Ngày tạo', value: formatDateTime(supplies.createdAt), border: true },
           ]
         : [];
      return { suppliesDetails };
   }, [supplies]);

   return (
      <Box>
         <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel="Chi tiết vật tư">
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
               <TabContext value={searchParams['tab'] ?? '1'}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                     <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Vật tư" value="1" />
                        <Tab label="Biến thể" value="2" />
                     </TabList>
                  </Box>
                  <ScrollbarBase sx={{ px: '12px', maxHeight: 'calc(100vh - 200px)' }}>
                     <TabPanel value="1" sx={{ px: 0 }}>
                        {suppliesDetails.map((detail, index) => (
                           <Grid container spacing={1} key={index}>
                              <Grid item xs={2} paddingBottom={2}>
                                 <Typography
                                    sx={{
                                       fontSize: '1rem',
                                       lineHeight: '2.2rem',
                                       color: theme.palette.grey[800],
                                    }}
                                 >
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
                                       height: '40px',
                                    }}
                                 >
                                    {detail.value}
                                 </Typography>
                                 {detail.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                              </Grid>
                           </Grid>
                        ))}
                     </TabPanel>
                     <TabPanel value="2" sx={{ px: 0 }}>
                        <DetailTableSupplies supplies={supplies} />
                     </TabPanel>
                  </ScrollbarBase>
               </TabContext>
            </PageContent>
         </BaseBreadcrumbs>
      </Box>
   );
};

export default SuppliesDetails;
