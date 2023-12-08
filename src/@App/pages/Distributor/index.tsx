import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import distributorService from '@App/services/distributor.service';
import { useQuery } from '@tanstack/react-query';
import { Box, TextField } from '@mui/material';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
const Distributor = () => {
   const { data: distributor, isFetching: isLoading } = useQuery(['distributor'], async () => {
      try {
         const res = await distributorService.get();
         console.log('API Response:', res);
         return res.data;
      } catch (error) {
         console.error('API Error:', error);
         throw error;
      }
   });
   const columns = useMemo(() => {
      return [
         columnHelper.accessor('name', {
            header: 'Tên',
         }),
         columnHelper.accessor('address', {
            header: 'Địa chỉ',
         }),
         columnHelper.accessor('phone', {
            header: 'SĐT',
         }),
         columnHelper.accessor('email', {
            header: 'Email',
         }),
         columnHelper.accessor('bank-acount-name', {
            header: 'Bank Acount Name',
         }),
         columnHelper.accessor('bank-number', {
            header: 'Bank Number',
         }),
         columnHelper.accessor('bank-name', {
            header: 'Bank Name',
         }),
         columnHelper.accessor('bank-branch', {
            header: 'Bank Branch',
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const res: any = row.original;

               return (
                  <Box>
                     {/* <CoreTableActionDelete /> */}
                     {/* <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.PERMISSIONS + '/' + res?.id)} /> */}
                  </Box>
               );
            },
         }),
      ]
   }, []);
   return (
      <BaseBreadcrumbs arialabel="Danh sách nhà phân phối">
         <Box>
            <TextField size="small" />
         </Box>
         <TableCore columns={columns} data={(distributor as any) || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default Distributor;
