/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import useCoreTable from '@App/hooks/useCoreTable';
import roleService, { RoleResponseData } from '@App/services/role.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button, Chip } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import { format } from 'date-fns';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosResponseData, HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import PageContent from '@App/component/customs/PageContent';
import FilterTable from '@App/component/common/FilterTable';

const sortList = [
   {
      title: 'Tên',
      value: 'full_name',
   },
   {
      title: 'Email',
      value: 'email',
   },
   {
      title: 'Số điện thoại',
      value: 'phone',
   },
];

const Role = () => {
   const navigate = useNavigate();
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getPermissionList', searchParams], async () => {
      const res = await roleService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const { mutate: handleDelete } = useMutation({
      mutationFn: async (id: string) => {
         const res = await roleService.delete(id);
         return res;
      },
      onSuccess: (data: AxiosResponseData) => {
         successMessage(data.message || 'Xóa thành công');
         const refetch = queryTable.refetch;
         return refetch();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         return errorMessage((dataError?.message as unknown as string) || 'Xóa thất bại');
      },
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: 'STT',
            cell: ({ getValue }) => {
               return <Box>{getValue()}</Box>;
            },
         }),
         columnHelper.accessor('name', {
            header: 'Tên quyền',
            cell: ({ row }) => {
               return <Box>{row.getValue('name')}</Box>;
            },
         }),
         columnHelper.accessor('userCount', {
            header: () => <Box textAlign="center">NV đang làm việc</Box>,
            cell: ({ row }) => {
               return (
                  <Box textAlign="center">
                     <Chip variant="filled" label={row.getValue('userCount')} sx={{ textTransform: 'capitalize' }} />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('describe', {
            header: 'Mô tả',
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Ngày tạo</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{format(row.getValue('createdAt'), 'yyyy-MM-dd')}</Box>;
            },
         }),
         columnHelper.accessor('updatedAt', {
            header: () => <Box textAlign="center">Cập nhật lần cuối</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{format(row.getValue('updatedAt'), 'yyyy-MM-dd')}</Box>;
            },
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const role = row.original as RoleResponseData;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.ROLES} action="DELETE">
                        <CoreTableActionDelete callback={() => handleDelete(role._id)} />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.ROLES} action="VIEW_ALL">
                        <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.ROLES + '/' + role._id + '/update')} />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.ROLES} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.ROLES + '/' + role._id + '/details')}
                        />
                     </PermissionAccessRoute>
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách vai trò">
         <PermissionAccessRoute module={MODULE_PAGE.ROLES} action={PAGE_ACTION.CREATE}>
            <Button component={Link} to="create" size="medium">
               Thêm mới
            </Button>
         </PermissionAccessRoute>

         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortList} searchType={sortList} />
            </Box>

            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default Role;
