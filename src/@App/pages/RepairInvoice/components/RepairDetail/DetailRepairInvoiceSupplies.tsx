import { ResponseFindOneRepairInvoiceSupplies } from '@App/types/repair-invoice';
import { Box, Button } from '@mui/material';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Row } from '@tanstack/react-table';

interface DetailRepairInvoiceSuppliesProps {
   data: ResponseFindOneRepairInvoiceSupplies[];
}

const DetailRepairInvoiceSupplies = ({ data }: DetailRepairInvoiceSuppliesProps) => {
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
            size: 500,
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
            header: 'Số lượng',
            cell: (info) => {
               return <Box textAlign="center">{info.getValue()}</Box>;
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
            renderSubComponent={renderSubComponent as never}
            onClickRow={(row) => {
               row.getToggleExpandedHandler();
            }}
         />
      </Box>
   );
};
const renderSubComponent = (row: Row<ResponseFindOneRepairInvoiceSupplies>) => {
   return (
      <pre style={{ fontSize: '10px' }}>
         <code>{JSON.stringify(row.original, null, 2)}</code>
      </pre>
   );
};

export default DetailRepairInvoiceSupplies;
