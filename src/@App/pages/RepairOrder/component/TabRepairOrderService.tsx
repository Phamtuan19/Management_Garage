/* eslint-disable @typescript-eslint/naming-convention */
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete } from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button } from '@mui/material';
import React, { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { RepairorderSchema } from '../utils/repairorderSchema';

interface TabRepairOrderServicePropType {
   form: UseFormReturn<RepairorderSchema>;
}

const TabRepairOrderService = ({ form }: TabRepairOrderServicePropType) => {
   const { watch } = form;

   const serviceOrder = watch('serviceOrder');

   const columnsService = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_detail_name', {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>Tên Dịch vụ</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('quantity', {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>Số lượng</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('price', {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>Giá</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('surcharge', {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>Thu thêm</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('discount', {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>Giảm giá</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('describe', {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>Mô tả</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('', {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}></Box>,
            cell: () => {
               //    const service = row.original as ServiceOrderSchema;
               return (
                  <Box>
                     <CoreTableActionDelete />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <>
         <Button>Thêm</Button>
         <TableCore columns={columnsService} data={serviceOrder ?? []} isPagination={false} />
      </>
   );
};

export default TabRepairOrderService;
