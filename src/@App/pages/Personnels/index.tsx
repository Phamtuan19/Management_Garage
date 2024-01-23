import { Box, TextField, Chip, Button, Select, MenuItem } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import personnelService from '@App/services/personnel.service';
import { useQuery } from '@tanstack/react-query';
import TableCore, { columnHelper } from '@Core/Component/Table';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import Switch from '@App/component/customs/Switch';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import { useMemo } from 'react';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function Personnels() {
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getPersonnelList', searchParams], async () => {
      const res = await personnelService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('avatar', {
            header: () => <Box sx={{ textAlign: 'center' }}>Hình ảnh</Box>,
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
            header: () => <Box sx={{ textAlign: 'center' }}>Giới tính</Box>,
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
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: '0px 12px' }}>
               <Box>
                  <TextField label="Tìm kiếm" />
               </Box>
               <Box>
                  <Select sx={{ minWidth: 100 }}>
                     <MenuItem value="">Tất cả</MenuItem>
                     <MenuItem value={10}>Ten</MenuItem>
                     <MenuItem value={20}>Twenty</MenuItem>
                     <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
               </Box>
            </Box>

            <Button component={Link} to="create" endIcon={<AddIcon />}>
               Thêm mới
            </Button>
         </Box>

         <TableCore columns={columns} {...data} />
      </BaseBreadcrumbs>
   );
}
