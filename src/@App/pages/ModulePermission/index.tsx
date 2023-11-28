import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import permissionService from '@App/services/modulePermission.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, Button, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const ModulePremission = () => {
   const { data: modulePermissions, isLoading } = useQuery(['getPermissionList'], async () => {
      const res = await permissionService.get();

      return res.data;
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_row, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ maxWidth: 100 }}>STT</Box>,
            cell: ({ getValue }) => <Box>{getValue()}</Box>,
         }),
         columnHelper.accessor('access', {
            header: 'Quyền truy cập',
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               return <Box>{/* <Core row={row} callback={(id) => callback(id)} /> */}</Box>;
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách module permission">
         <Box>
            <TextField size="small" />
         </Box>

         <TableCore columns={columns} data={(modulePermissions as any) || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default ModulePremission;
