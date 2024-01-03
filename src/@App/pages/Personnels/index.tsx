import { Box, TextField, Chip } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import personnelService from '@App/services/personnel.service';
import { useQuery } from '@tanstack/react-query';
import TableCore, { columnHelper } from '@Core/Component/Table';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import Switch from '@App/component/customs/Switch';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import { useMemo } from 'react';

export default function Personnels() {
   const { data: personnels, isFetching: isLoading } = useQuery(['getPersonnelList'], async () => {
      const res = await personnelService.get();
      return res.data;
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('avatar', {
            header: 'Hình ảnh',
            cell: ({ row }) => (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <LazyLoadingImage src={row.getValue('avatar')} w="35" h="35" style={{ borderRadius: '50%' }} />
               </Box>
            ),
         }),
         columnHelper.accessor('full_name', {
            header: 'Tên nhân viên',
         }),
         columnHelper.accessor('email', {
            header: 'Email',
         }),
         columnHelper.accessor('phone', {
            header: 'Số điện thoại',
         }),
         columnHelper.accessor('address', {
            header: 'Địa chỉ',
         }),
         columnHelper.accessor('gender', {
            header: 'Giới tính',
            cell: ({ row }) => {
               return (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     {row.getValue('gender') ? (
                        <Chip
                           key={row.getValue('gender')}
                           color={row.getValue('gender') === 'MAN' ? 'secondary' : 'info'}
                           variant="outlined"
                           label={row.getValue('gender')}
                           sx={{ textTransform: 'capitalize' }}
                        />
                     ) : (
                        <></>
                     )}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('is_lock', {
            header: () => (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Trạng thái</Box>
            ),
            cell: ({ row }) => {
               return (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     <Switch sx={{ m: 1 }} checked={!row.getValue('is_lock')} />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('action', {
            header: 'Thao tác',
            cell: () => {
               return (
                  <Box>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit callback={() => {}} />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách nhân viên">
         <Box>
            <TextField size="small" />
         </Box>

         <TableCore columns={columns} data={personnels?.data || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
}
