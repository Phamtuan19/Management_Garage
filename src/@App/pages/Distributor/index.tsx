import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import distributorService from '@App/services/distributor.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import { Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Distributor = () => {
   const navigate = useNavigate();

   const { data: distributors, isLoading } = useQuery(['getListDistributor'], async () => {
      const res = await distributorService.get();

      return res.data;
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => (
               <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>STT</Box>
            ),
            cell: (info) => (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('name', {
            header: 'Tên nhà phân phối',
         }),
         columnHelper.accessor('phone', {
            header: 'Số điên thoại',
         }),
         columnHelper.accessor('email', {
            header: 'Email',
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const res: any = row.original;

               return (
                  <Box>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + res?.id)} />
                  </Box>
               );
            },
         }),
      ];
   }, []);
   return (
      <BaseBreadcrumbs arialabel="Nhà phân phối">
         <Box>
            <TextField size="small" label="Tìm kiếm" />
         </Box>
         <TableCore columns={columns} data={(distributors?.data as any) || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default Distributor;
