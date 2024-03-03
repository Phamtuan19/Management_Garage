import { Box } from '@mui/material';
import { RepairOrderServiceFind } from '@App/services/repairorder.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import React from 'react';

const RepairOrderDetails = ({ services }: { services: RepairOrderServiceFind[] }) => {
   const columnsService = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('repair_service_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã DV</Box>,
         cell: ({ row }) => {
            const service = row.original as RepairOrderServiceFind;
            return <Box sx={{ width: '100%', textAlign: 'center', p: 1 }}>#{service.repair_service.code}</Box>;
         },
      }),
      columnHelper.accessor('repair_service_name', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tên Dịch vụ</Box>,
         cell: ({ row }) => {
            const service = row.original as RepairOrderServiceFind;

            return <Box sx={{ textAlign: 'center', width: '180px' }}>{service.repair_service.name}</Box>;
         },
      }),
      columnHelper.accessor('price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá</Box>,
         cell: (info) => {
            return <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>;
         },
      }),
      columnHelper.accessor('discount', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá Km</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}%</Box>,
      }),
      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>Số lượng</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
      }),
      columnHelper.accessor('total_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tổng</Box>,
         cell: (info) => {
            return <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>;
         },
      }),
   ];

   return <TableCore height={320} columns={columnsService} data={services} isPagination={false} />;
};
export default React.memo(RepairOrderDetails);
