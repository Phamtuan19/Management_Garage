/* eslint-disable @typescript-eslint/naming-convention */
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Button, Grid, Chip, Tab } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import PageContent from '@App/component/customs/PageContent';
import { useParams, useNavigate } from 'react-router-dom';
import formatDateTime from '@Core/Helper/formatDateTime';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

import DetailTableSupplies from './components/DetailTableSupplies';

const breadcrumbs = [
   {
      title: 'Nhà phân phối',
      link: ROUTE_PATH.DISTRIBUTORS,
   },
];
const DistributorDetails = () => {
   const { id: distributorId } = useParams();
   const navigate = useNavigate();
   const { searchParams, setParams } = useSearchParamsHook();

   const { data: distributor } = useQuery<IDistributor, Error>(['getDistributorDetails'], async () => {
      const distributorRes = await distributorService.find(distributorId as string);
      return distributorRes.data as IDistributor;
   });

   const ditributordetails = [
      { label: 'Mã nhà phân phối', value: distributor?.code, border: true },
      { label: 'Tên nhà phân phối', value: distributor?.name, border: true },
      { label: 'Email nhà phân phối', value: distributor?.email, border: true },
      { label: 'Số điện thoại', value: distributor?.phone, border: true },

      {
         label: 'Địa chỉ',
         value:
            distributor?.address?.province?.name &&
            distributor?.address?.district?.name &&
            distributor?.address?.wards?.name &&
            distributor?.address?.specific &&
            `${distributor?.address?.province?.name}, ${distributor?.address?.district?.name}, ${distributor?.address?.wards?.name}, ${distributor?.address?.specific || ''}`,
         border: true,
      },
      { label: 'Ngày tạo', value: formatDateTime(distributor?.createdAt ?? ''), border: true },
      {
         label: 'Danh mục',
         value: (
            <Box display="flex" alignItems="center" gap="12px">
               {distributor?.materials_catalogs.map((item) => {
                  return <Chip label={item.name} color="info" />;
               })}
            </Box>
         ),
         border: false,
      },
   ];
   const bankAccountdetails = [
      { label: 'Số tài khoản', value: distributor?.bank_account_id.bank_account_number, border: true },
      { label: 'Người thụ hưởng', value: distributor?.bank_account_id.account_holder_name, border: true },
      { label: 'Tên ngân hàng', value: distributor?.bank_account_id.bank_name, border: true },
      { label: 'Chi nhánh', value: distributor?.bank_account_id.bank_branch, border: true },
   ];

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel={distributor?.name ?? ''}>
         <Box display="flex" gap="12px">
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="CREATE">
               <Button variant="contained" onClick={() => navigate(ROUTE_PATH.DISTRIBUTORS + ROUTE_PATH.CREATE)}>
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="UPDATE">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + distributorId + '/update')}
                  endIcon={<RateReviewRoundedIcon />}
                  color="secondary"
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            <TabContext value={searchParams['tab'] ?? '1'}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                     onChange={(_, v) => {
                        setParams('tab', v as string);
                     }}
                     aria-label="lab API tabs example"
                  >
                     <Tab label="Thông tin" value="1" />
                     <Tab label="Vật tư" value="2" />
                  </TabList>
               </Box>
               <TabPanel value="1">
                  {distributor && (
                     <Grid container spacing={5} sx={{ height: 'calc(100vh - 290px)' }}>
                        <Grid item xs={6}>
                           {ditributordetails.map((detail, index) => (
                              <Grid container spacing={2} key={index}>
                                 <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>
                                       {detail.label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={8}>
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
                           ))}
                        </Grid>
                        <Grid item xs={6}>
                           {bankAccountdetails.map((detail, index) => (
                              <Grid container spacing={2} key={index + 'a'}>
                                 <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Typography
                                       sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}
                                    >
                                       {detail.label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={8}>
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
                           ))}
                        </Grid>
                     </Grid>
                  )}
               </TabPanel>
               <TabPanel value="2" sx={{ p: 0 }}>
                  <DetailTableSupplies />
               </TabPanel>
            </TabContext>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default DistributorDetails;
