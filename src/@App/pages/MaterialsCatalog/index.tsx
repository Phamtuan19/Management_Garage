/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import { Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MaterialsCatalog = () => {
   const navigate = useNavigate();

   const { data: materialsCatalog, isLoading } = useQuery(['getListDistributor'], async () => {
      const res = await materialsCatalogService.get();

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
            header: 'Tên danh mục',
         }),
         columnHelper.accessor('description', {
            header: 'Mô tả',
            cell: (info) => (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px' }}>
                  {info.getValue()}
               </Box>
            ),
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const res: any = row.original;

               return (
                  <Box>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.MATERIALSCATALOG + '/' + res?.id)} />
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
         <TableCore columns={columns} data={(materialsCatalog?.data as never) || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalog;
