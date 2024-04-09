/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import FilterTable from '@App/component/common/FilterTable';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import dashboardService from '@App/services/dashboard-service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatDateTime from '@Core/Helper/formatDateTime';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const searchType = [
   {
      title: 'Mã vật tư',
      value: 'supplies_details_code',
   },
   {
      title: 'Tên vật tư',
      value: 'supplies_details_name',
   },
   {
      title: 'Mã lô hàng',
      value: 'supplies_invoice_code',
   },
];

const sortList = [
   {
      title: 'Mã vật tư',
      value: 'supplies_details_code',
   },
   {
      title: 'Tên vật tư',
      value: 'supplies_details_name',
   },
   {
      title: 'Thồi gian',
      value: 'createdAt',
   },
];

const SuppliesExport = () => {
   const { searchParams } = useSearchParamsHook();

   const { export: omit, ...params } = searchParams;

   const queryTable = useQuery(['getListSupplies', params], async () => {
      const res = await dashboardService.getExportSupplies(params);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_details_code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã vật tư</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_details_name', {
            header: 'Tên vật tư',
            cell: (info) => (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '250px' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('supplies_invoice_code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã lô hàng</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('export_quantity', {
            header: 'Số lượng',
            cell: (info) => <Box>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('discount', {
            header: 'Giảm giá',
            cell: (info) => <Box>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Thời gian</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{formatDateTime(row.getValue('createdAt'))}</Box>;
            },
         }),
      ];
   }, []);

   return (
      <>
         <FilterTable searchType={searchType} sortList={sortList} isDate={true} />
         <TableCore height={420} columns={columns as never} {...data} />
      </>
   );
};

export default SuppliesExport;
