/* eslint-disable @typescript-eslint/naming-convention */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Button, Grid, Tab, Chip } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import suppliesService, { SuppliesFindOne } from '@App/services/supplies.service';
import { useMemo } from 'react';
import formatDateTime from '@Core/Helper/formatDateTime';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatPrice from '@Core/Helper/handlePrice';

const breadcrumbs = [
   {
      title: 'Vật tư',
      link: ROUTE_PATH.SUPPLIES_DETAILS,
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

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name_detail', {
            header: () => <Box sx={{ textAlign: 'center' }}>Tên biến thể</Box>,
            cell: (info) => (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{info.getValue()}</Box>
            ),
         }),

         columnHelper.accessor('distributor_name', {
            header: 'Nhà cung cấp',
         }),
         columnHelper.accessor('imported_price', {
            header: () => <Box>Giá nhập dự kiến</Box>,
            cell: (info) => <Box sx={{ display: 'flex', alignItems: 'center' }}>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('isInStock', {
            header: () => <Box textAlign="center">Trạng thái</Box>,
            cell: (info) => {
               return (
                  <Box display="flex" justifyContent="center">
                     <Chip
                        label={info.getValue() ? 'Còn hàng' : 'Hết hàng'}
                        color={!info.getValue() ? 'error' : 'success'}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Mô tả</Box>,
            cell: (info) => {
               return (
                  <Box display="flex" justifyContent="center">
                     {formatDateTime(info.getValue())}
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <Box>
         <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel="Chi tiết vật tư">
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="UPDATE">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.SUPPLIES + '/' + suppliesId + '/update')}
                  endIcon={<RateReviewRoundedIcon />}
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
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
                        <TableCore height={370} columns={columns} data={supplies?.details ?? []} isPagination={false} />
                     </TabPanel>
                  </ScrollbarBase>
               </TabContext>
            </PageContent>
         </BaseBreadcrumbs>
      </Box>
   );
};

export default SuppliesDetails;
