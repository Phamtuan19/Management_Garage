/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import repairInvoiceService from '@App/services/repair-invoice';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ArrowRight from '@App/component/common/ArrowRight';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import { Box, Grid, Typography } from '@mui/material';
import PageContent from '@App/component/customs/PageContent';
import { useState } from 'react';
import { STATUS_DELIVERY } from '@App/configs/status-config';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

import RepairInvoiceInformation from './components/RepairDetail/RepairInvoiceInformation';
import { arrowRightOption } from './utils';
import RepairDetailAction from './components/RepairDetail/RepairDetailAction';
import DetailRepairInvoiceSupplies from './components/RepairDetail/DetailRepairInvoiceSupplies';
import DetailRepairInvoiceService from './components/RepairDetail/DetailRepairInvoiceService';
import ModalPayComplete from './components/RepairDetail/ModalPayComplete';
import Transaction from './components/RepairDetail/Transaction';
import ModalPay from './components/RepairDetail/ModalPay';

const breadcrumbs = [
   {
      title: 'Phiếu Sửa Chữa',
      link: ROUTE_PATH.REPAIR_INVOICE,
   },
];

const RepairInvoiceDetail = () => {
   const { id: repairInvoiceId } = useParams();
   const [open, setOpen] = useState<boolean>(false);
   const [openModalPay, setOpenModalPay] = useState<boolean>(false);

   const {
      data: repairInvoice,
      refetch,
      isLoading,
   } = useQuery(['findOneRepairInvoice', repairInvoiceId], async () => {
      const res = await repairInvoiceService.find(repairInvoiceId as string);
      return res.data as ResponseFindOneRepairInvoice;
   });

   return (
      <BaseBreadcrumbs
         arialabel={`#${repairInvoice?.code}`}
         breadcrumbs={breadcrumbs}
         isCheck
         data={repairInvoice}
         isLoading={isLoading}
      >
         <RepairDetailAction
            refetchRepairInvoice={refetch}
            data={repairInvoice}
            setOpen={setOpen}
            setOpenModalPay={setOpenModalPay}
         />

         <ArrowRight options={arrowRightOption} check={(repairInvoice?.status as string) ?? 'create'} />
         <RepairInvoiceInformation data={repairInvoice} />
         {repairInvoice?.transactions_id && (repairInvoice?.status as never) === STATUS_DELIVERY.complete.key && (
            <Transaction repairInvoice={repairInvoice} />
         )}
         <PageContent>
            <Box pb={1} borderBottom="1px solid #DADADA">
               <Typography variant="h3" fontSize={24}>
                  Dịch vụ & Vật tư sử dụng
               </Typography>
            </Box>
            <ScrollbarBase sx={{ mt: 4, maxHeight: 680 }}>
               <Grid container spacing={2}>
                  <DetailRepairInvoiceService data={repairInvoice?.repairInvoiceService ?? []} />
                  <DetailRepairInvoiceSupplies data={repairInvoice?.repairInvoiceSupplies ?? []} />
               </Grid>
            </ScrollbarBase>
         </PageContent>
         <ModalPayComplete open={open} setOpen={setOpen} refetchRepairInvoice={refetch} repairInvoice={repairInvoice} />
         <ModalPay open={openModalPay} setOpen={setOpenModalPay} refetchRepairInvoice={refetch} />
      </BaseBreadcrumbs>
   );
};

export default RepairInvoiceDetail;
