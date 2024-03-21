/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Chip } from '@mui/material';
import { ResponseFindOneRepairInvoiceService } from '@App/types/repair-invoice';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatPrice from '@Core/Helper/formatPrice';
import { STATUS_DELIVERY } from '@App/configs/status-config';

import RenderSubComponent from './RenderSubComponent';

interface DetailRepairInvoiceServiceProps {
   data: ResponseFindOneRepairInvoiceService[];
   personnels:
      | {
           _id: string;
           full_name: string;
        }[]
      | undefined;
}

const DetailRepairInvoiceService = ({ data, personnels }: DetailRepairInvoiceServiceProps) => {
   const columns = useMemo(() => {
      return [
         columnHelper.accessor('expander', {
            header: '',
            cell: ({ row }) => {
               return (
                  <Box textAlign="center" width="25px" py={1}>
                     {row.getCanExpand() ? (
                        <Button
                           variant="text"
                           sx={{ p: '1px 2px', minWidth: 'auto' }}
                           {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: { cursor: 'pointer' },
                           }}
                        >
                           {row.getIsExpanded() ? '👇' : '👉'}
                        </Button>
                     ) : (
                        '🔵'
                     )}{' '}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('service_code', {
            header: 'Mã Dv',
            cell: (info) => {
               return <Box>#{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('service_name', {
            header: 'Tên dịch vụ',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
            size: 500,
         }),
         columnHelper.accessor('category_name', {
            header: 'Danh mục',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('price', {
            header: 'Đơn giá',
            cell: (info) => {
               return <Box>{formatPrice(info.getValue())}</Box>;
            },
         }),
         columnHelper.accessor('discount', {
            header: () => <Box textAlign="center">Giảm giá</Box>,
            cell: (info) => {
               return <Box textAlign="center">{info.getValue()}%</Box>;
            },
         }),
         columnHelper.accessor('repair_staff_id', {
            header: 'Nhân viên Sc',
            cell: (info) => {
               const personnel = personnels?.find((item) => item._id === info.getValue());

               return <Box>{personnel?.full_name}</Box>;
            },
         }),
         columnHelper.accessor('status_repair', {
            header: 'Trạng thái Sc',
            cell: (info) => {
               const status: {
                  title: string;
                  color: string;
               } = info.getValue() ? STATUS_DELIVERY[info.getValue()] : STATUS_DELIVERY.empty;
               return (
                  <Box>
                     <Chip label={status.title} color={status.color as never} />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <>
         <TableCore
            data={data}
            columns={columns}
            isPagination={false}
            getRowCanExpand={() => true}
            renderSubComponent={RenderSubComponent as never}
         />
      </>
   );
};

export default DetailRepairInvoiceService;
