/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import useCoreTable from '@App/hooks/useCoreTable';
import ervice, { RoleResponseData } from '@App/services/role.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button } from '@mui/material';
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
import repairServiceService from '@App/services/repairService.service';
import PageContent from '@App/component/customs/PageContent';
import FilterTable from '@App/component/common/FilterTable';

const sortList = [
   {
      title: 'Tên',
      value: 'name',
   },
];

const sortOptions = [
   {
      title: 'Tên',
      value: 'name',
   },
   {
      title: 'Giá',
      value: 'price',
   },
   {
      title: 'Giảm giá',
      value: 'discount',
   },
   {
      title: 'Ngày tạo',
      value: 'createdAt',
   },
];

const RepairServices = () => {
   const navigate = useNavigate();
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getRepairServicesList', searchParams], async () => {
      const res = await repairServiceService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const { mutate: handleDelete } = useMutation({
      mutationFn: async (id: string) => {
         const res = await ervice.delete(id);
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
            header: 'Tên dịch vụ sửa chữa',
            cell: ({ row }) => {
               return <Box>{row.getValue('name')}</Box>;
            },
         }),
         columnHelper.accessor('price', {
            header: 'Giá',
            cell: ({ row }) => {
               return <Box>{row.getValue('price')}</Box>;
            },
         }),
         columnHelper.accessor('discount', {
            header: 'Giảm giá',
            cell: ({ row }) => {
               return <Box>{row.getValue('discount')}</Box>;
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
               const repairService = row.original as RoleResponseData;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action="DELETE">
                        <CoreTableActionDelete callback={() => handleDelete(repairService._id)} />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action="VIEW_ALL">
                        <CoreTableActionEdit
                           callback={() => navigate(ROUTE_PATH.REPAIR_SERVICES + '/' + repairService._id + '/update')}
                        />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.REPAIR_SERVICES + '/' + repairService._id + '/details')}
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
         <Box>
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action={PAGE_ACTION.CREATE}>
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>

         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortOptions} searchType={sortList} />

               {/* <Button component={Link} to="create" endIcon={<AddIcon />}>
               Thêm mới
            </Button> */}
            </Box>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default RepairServices;
