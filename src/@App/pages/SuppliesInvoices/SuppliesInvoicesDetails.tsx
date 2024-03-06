/* eslint-disable @typescript-eslint/naming-convention */
import { useNavigate, useParams } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Tab } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import suppliesInvoiceService, { ResponseGetSuppliesInvoice } from '@App/services/supplies-invoice';
import PageContent from '@App/component/customs/PageContent';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import MODULE_PAGE from '@App/configs/module-page';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';

import DetailInformation from './component/detail/DetailInformation';
import DetailTable from './component/detail/DetailTable';

const breadcrumbs = [
   {
      title: 'Hóa Đơn Nhập',
      link: ROUTE_PATH.SUPPLIES_INVOICES,
   },
];
const SuppliesInvoicesDetails = () => {
   const { id: suppliesinvoicesId } = useParams();
   const { searchParams, setParams } = useSearchParamsHook();
   const navigate = useNavigate();

   const { data: suppliesinvoices } = useQuery(['getSuppliesInvoices', suppliesinvoicesId], async () => {
      const suppliesInvoicesRes = await suppliesInvoiceService.find(suppliesinvoicesId as string);
      return suppliesInvoicesRes.data as ResponseGetSuppliesInvoice;
   });

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel={'#' + suppliesinvoices?.code}>
         <Box display="flex" gap="12px">
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action="CREATE">
               <Button variant="contained" onClick={() => navigate(ROUTE_PATH.SUPPLIES_INVOICES + ROUTE_PATH.CREATE)}>
                  Tạo mới
               </Button>
            </PermissionAccessRoute>
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action="UPDATE">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.SUPPLIES_INVOICES + '/' + suppliesinvoicesId + '/update')}
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
                     onChange={(_e, v) => {
                        setParams('tab', v as string);
                     }}
                     aria-label="lab API tabs example"
                  >
                     <Tab label="Thông tin" value="1" />
                     <Tab label="Sản phẩm" value="2" />
                  </TabList>
               </Box>
               <TabPanel value="1">
                  <DetailInformation suppliesinvoices={suppliesinvoices} />
               </TabPanel>
               <TabPanel value="2" sx={{ px: 0, py: 1 }}>
                  <DetailTable suppliesinvoices={suppliesinvoices} />
               </TabPanel>
            </TabContext>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default SuppliesInvoicesDetails;
