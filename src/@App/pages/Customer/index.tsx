import { Box, Button, Chip } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { useQuery } from '@tanstack/react-query';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import { useMemo } from 'react';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import FilterTable from '@App/component/common/FilterTable';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import customerService from '@App/services/customer.service';

const sortList = [
   {
      title: 'Tên',
      value: 'name',
   },
   {
      title: 'Số điện thoại',
      value: 'phone',
   },
   {
      title: 'Email',
      value: 'email',
   },
];
const Customer = () => {
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getCustomerlList', searchParams], async () => {
      const res = await customerService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('name', {
            header: 'Tên khách hàng',
         }),
         columnHelper.accessor('email', {
            header: 'Email',
         }),
         columnHelper.accessor('phone', {
            header: 'Số điện thoại',
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
      <BaseBreadcrumbs
         arialabel="Danh sách khách hàng"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <Button size="medium" component={Link} to="create" sx={{ py: '5px', px: '12px' }} endIcon={<AddIcon />}>
            Thêm mới
         </Button>

         <Box
            sx={({ base }) => ({
               marginTop: '12px',
               padding: '12px',
               borderRadius: '5px',
               backgroundColor: base.background.white as string,
            })}
         >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortList} searchType={sortList} />
            </Box>

            <TableCore columns={columns} {...data} />
         </Box>
      </BaseBreadcrumbs>
   );
};

export default Customer;
