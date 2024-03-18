/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { ResponseFindOneRepairInvoiceSupplies } from '@App/types/repair-invoice';
import { Box, Button, Chip } from '@mui/material';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { STATUS_DELIVERY } from '@App/configs/status-config';

import RenderSubComponent from './RenderSubComponent';

interface DetailRepairInvoiceSuppliesProps {
   data: ResponseFindOneRepairInvoiceSupplies[];
   personnels:
      | {
           _id: string;
           full_name: string;
        }[]
      | undefined;
}

const DetailRepairInvoiceSupplies = ({ data, personnels }: DetailRepairInvoiceSuppliesProps) => {
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
         columnHelper.accessor('supplies_detail_code', {
            header: 'Mã VT',
            cell: (info) => {
               return <Box>#{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('supplies_detail_name', {
            header: 'Tên vật tư',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('distributors_name', {
            header: 'Nhà phân phối',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('unit', {
            header: 'Dvt',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('quantity', {
            header: () => <Box textAlign="center">Số lượng</Box>,
            cell: (info) => {
               return <Box textAlign="center">{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('repair_staff_id', {
            header: () => <Box>Nhân viên sửa chữa</Box>,
            cell: (info) => {
               const personnel = personnels?.find((item) => item._id === info.getValue());

               return <Box>{personnel?.full_name}</Box>;
            },
         }),
         columnHelper.accessor('status_repair', {
            header: () => <Box textAlign="center">Trạng thái SC</Box>,
            cell: (info) => {
               const status: {
                  title: string;
                  color: string;
               } = info.getValue() ? STATUS_DELIVERY[info.getValue()] : STATUS_DELIVERY.empty;

               return (
                  <Box textAlign="center">
                     <Chip label={status.title} color={status.color as never} />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('status_supplies', {
            header: () => <Box textAlign="center">Trạng thái lấy VT</Box>,
            cell: (info) => {
               const status: {
                  title: string;
                  color: string;
               } = info.getValue() ? STATUS_DELIVERY[info.getValue()] : STATUS_DELIVERY.empty;
               return (
                  <Box textAlign="center">
                     <Chip label={status.title} color={status.color as never} />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <Box>
         <TableCore
            data={data}
            columns={columns}
            isPagination={false}
            getRowCanExpand={() => true}
            renderSubComponent={(row) => <RenderSubComponent row={row} />}
            // onClickRow={(row) => {
            //    row.getToggleExpandedHandler();
            // }}
         />
      </Box>
   );
};

export default DetailRepairInvoiceSupplies;
