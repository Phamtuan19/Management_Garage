/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import repairInvoiceService from '@App/services/repair-invoice';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ArrowRight from '@App/component/common/ArrowRight';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import { Tab, Tabs, styled } from '@mui/material';
import PageContent from '@App/component/customs/PageContent';
import { TabContext, TabPanel } from '@mui/lab';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

import RepairInvoiceInformation from './components/RepairDetail/RepairInvoiceInformation';
import { arrowRightOption } from './utils';
import RepairDetailAction from './components/RepairDetail/RepairDetailAction';
import DetailRepairInvoiceSupplies from './components/RepairDetail/DetailRepairInvoiceSupplies';
import DetailRepairInvoiceService from './components/RepairDetail/DetailRepairInvoiceService';

const breadcrumbs = [
   {
      title: 'Phiếu Sửa Chữa',
      link: ROUTE_PATH.REPAIR_INVOICE,
   },
];

const RepairInvoiceDetail = () => {
   const { id: repairInvoiceId } = useParams();

   const { searchParams, setParams } = useSearchParamsHook();

   const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
      setParams('tab', newValue);
   };

   const { data: repairInvoice, isLoading } = useQuery(['findOneRepairInvoice', repairInvoiceId], async () => {
      const res = await repairInvoiceService.find(repairInvoiceId as string);
      return res.data as ResponseFindOneRepairInvoice;
   });

   return (
      <BaseBreadcrumbs
         arialabel="Chi tiết"
         breadcrumbs={breadcrumbs}
         isCheck
         data={repairInvoice}
         isLoading={isLoading}
      >
         <RepairDetailAction data={repairInvoice} />

         <ArrowRight options={arrowRightOption} check={(repairInvoice?.status as string) ?? 'create'} />
         <RepairInvoiceInformation data={repairInvoice} />
         <PageContent>
            <TabContext value={searchParams['tab'] ?? '1'}>
               <Tabs
                  value={searchParams['tab'] ?? '1'}
                  onChange={handleChange}
                  sx={{
                     minHeight: '36px',
                     borderBottom: '1px solid #90909080',
                     '& .css-1aquho2-MuiTabs-indicator': {
                        height: '1px',
                     },
                  }}
               >
                  <ExtendTab label="Dịch vụ" value="1" />
                  <ExtendTab label="Vật tư" value="2" />
               </Tabs>
               <ExtendTabPanel value="1">
                  <DetailRepairInvoiceService data={repairInvoice?.repairInvoiceService ?? []} />
               </ExtendTabPanel>
               <ExtendTabPanel value="2">
                  <DetailRepairInvoiceSupplies data={repairInvoice?.repairInvoiceSupplies ?? []} />
               </ExtendTabPanel>
            </TabContext>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

const ExtendTabPanel = styled(TabPanel)({
   padding: '12px 0px',
});

const ExtendTab = styled(Tab)({
   padding: '6px 12px',
   minHeight: 'auto',
});

export default RepairInvoiceDetail;
