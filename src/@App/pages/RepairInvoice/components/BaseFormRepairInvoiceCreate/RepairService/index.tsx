/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box } from '@mui/material';
import { useMemo, useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete } from '@Core/Component/Table/components/CoreTableAction';
import formatPrice from '@Core/Helper/formatPrice';
import { RepairInvoiceSchema } from '@App/pages/RepairInvoice/utils/repair-invoice-create';

import FilterService from './FilterService';

interface RepairServiceProps {
   form: UseFormReturn<RepairInvoiceSchema>;
}

const columnVisibilityData: Record<string, string> = {
   Stt: 'Số thứ tự',
   supplies_detail_code: 'Mã vật tư',
   supplies_detail_name: 'Tên vật tư',
   distributor_name: 'Nhà phân phối',
   inventory: 'tồn kho',
   quantity: 'Số lượng',
   action: 'thao tác',
} as const;

const RepairService = ({ form }: RepairServiceProps) => {
   const { watch, control } = form;

   const { fields, append, remove } = useFieldArray({
      name: 'repairService',
      control: control,
   });

   const [columnVisibility, setColumnVisibility] = useState({
      Stt: true,
      supplies_detail_code: true,
      supplies_detail_name: true,
      distributor_name: true,
      inventory: true,
      quantity: true,
      action: true,
   });

   const columnsService = useMemo(() => {
      return [
         columnHelper.accessor('Stt', {
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
         }),
         columnHelper.accessor('repair_service_code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã Dv</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('repair_service_name', {
            header: () => <Box>Tên Dv</Box>,
            cell: (info) => (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('repair_service_category_name', {
            header: () => <Box>Danh mục</Box>,
            cell: (info) => (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('price', {
            header: () => <Box>Giá</Box>,
            cell: (info) => {
               return <Box>{formatPrice(info.getValue())}</Box>;
            },
         }),
         columnHelper.accessor('discount', {
            header: () => <Box>Giá Km</Box>,
            cell: (info) => <Box>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('total_price', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thành tiền</Box>,
            cell: ({ row }) => {
               const price = watch(`repairService.${row.index}.price`);
               const discount = watch(`repairService.${row.index}.discount`);

               const total_price = price - discount;

               return <Box sx={{ textAlign: 'center' }}>{formatPrice(total_price)}</Box>;
            },
         }),
         columnHelper.accessor('action', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
            cell: ({ row }) => {
               return (
                  <Box display="flex" justifyContent="right" gap="6px" px={1}>
                     <CoreTableActionDelete
                        isConfirm={false}
                        callback={() => {
                           remove(row.index);
                        }}
                     />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <Box>
         <FilterService
            append={append as never}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            form={form}
            columnVisibilityData={columnVisibilityData}
         />
         <TableCore
            height={340}
            columns={columnsService as never}
            data={fields}
            isPagination={false}
            noData="Chưa có dịch vụ sửa chữa."
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
         />
      </Box>
   );
};

export default RepairService;
