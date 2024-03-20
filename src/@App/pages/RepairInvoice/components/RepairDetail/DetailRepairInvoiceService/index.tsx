import { Box, Button, Chip } from '@mui/material';
import { ResponseFindOneRepairInvoiceService } from '@App/types/repair-invoice';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatPrice from '@Core/Helper/formatPrice';
import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';

import RenderSubComponent from './RenderSubComponent';

interface DetailRepairInvoiceServiceProps {
   data: ResponseFindOneRepairInvoiceService[];
}

const DetailRepairInvoiceService = ({ data }: DetailRepairInvoiceServiceProps) => {
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
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('discount', {
            header: 'giảm giá',
            cell: ({ row }) => {
               const data = row.original as ResponseFindOneRepairInvoiceService;
               const discountPrice = data.price - (data.price * data.discount) / 100;
               return <Box>{formatPrice(discountPrice)}</Box>;
            },
         }),
         columnHelper.accessor('status', {
            header: 'Số lượng',
            cell: ({ row }) => {
               const data = row.original as ResponseFindOneRepairInvoiceService;
               const isCheck =
                  data.status_repair !== STATUS_REPAIR_DETAIL.empty.key &&
                  data.status_repair !== STATUS_REPAIR_DETAIL.check.key;
               return (
                  <Box>
                     <Chip label={isCheck ? 'Hoàn thành' : 'Chưa hoàn thành'} color={isCheck ? 'success' : 'error'} />
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
