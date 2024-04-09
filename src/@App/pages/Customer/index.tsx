/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Chip } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { useQuery } from '@tanstack/react-query';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionEdit, CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import { useMemo } from 'react';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import FilterTable from '@App/component/common/FilterTable';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import customerService, { ICustomer } from '@App/services/customer.service';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';

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
   const navigate = useNavigate();
   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
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
                           color={row.getValue('gender') === 'Nam' ? 'info' : 'secondary'}
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

            cell: ({ row }) => {
               const customer = row.original as ICustomer;
               return (
                  <Box>
                     {/* <CoreTableActionEit /> */}
                     <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action="UPDATE">
                        <CoreTableActionEdit
                           callback={() => navigate(ROUTE_PATH.CUSTOMERS + '/' + customer._id + '/update')}
                        />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.CUSTOMERS + '/' + customer._id + '/details')}
                        />
                     </PermissionAccessRoute>
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
         <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action="CREATE">
            <Button size="medium" component={Link} to="create" sx={{ py: '5px', px: '12px' }} endIcon={<AddIcon />}>
               Thêm mới
            </Button>
         </PermissionAccessRoute>
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

            <TableCore columns={columns as never} {...data} />
         </Box>
      </BaseBreadcrumbs>
   );
};

export default Customer;
