/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Chip } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import personnelService, { IPersonnel } from '@App/services/personnel.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import TableCore, { columnHelper } from '@Core/Component/Table';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import Switch from '@App/component/customs/Switch';
import {
   CoreTableActionDelete,
   CoreTableActionLock,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { useMemo } from 'react';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import FilterTable from '@App/component/common/FilterTable';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import { AxiosResponseData, HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import { errorMessage, successMessage } from '@Core/Helper/message';

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
      title: 'SĐT',
      value: 'phone',
   },
];

export default function Personnels() {
   const navigate = useNavigate();
   const { searchParams, setParams } = useSearchParamsHook();

   const queryTable = useQuery(['getPersonnelList', searchParams], async () => {
      const res = await personnelService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const handleClickIsLock = (key: string) => {
      const newIsLockValue = key === 'true' ? 'false' : 'true';
      setParams('is_lock', newIsLockValue);
   };

   const { mutate: handleDelete } = useMutation({
      mutationFn: async (id: string) => {
         const res = await personnelService.delete(id);
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

   // 65d8bc35d6b107bb3eb8d390
   // 65bdd1c7d2e36066f7a4f653

   const { mutate: handleIsLock } = useMutation({
      mutationFn: async (id: string) => {
         const res = await personnelService.lockPersonnel(id);
         return res;
      },
      onSuccess: (data: AxiosResponseData) => {
         successMessage(data.message || 'Khóa thành công');
         const refetch = queryTable.refetch;
         return refetch();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;
         return errorMessage((dataError?.message as unknown as string) || 'Khóa thất bại');
      },
   });

   // const handleLockClick = async (personnelId: string) => {
   //    try {
   //       await personnelService.lockPersonnel(personnelId);
   //       const refetch = queryTable.refetch;
   //       return refetch();
   //    } catch (error) {
   //       // console.error('Error locking personnel:', error);
   //    }
   // };

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
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const personnel = row.original as IPersonnel;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.PERSONNELS + '/' + personnel._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     {personnel.isAdmin === false && (
                        <>
                           <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action="IS_LOCK">
                              <CoreTableActionLock callback={() => handleIsLock(personnel._id)} />
                           </PermissionAccessRoute>
                           <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action="DELETE">
                              <CoreTableActionDelete callback={() => handleDelete(personnel._id)} />
                           </PermissionAccessRoute>
                        </>
                     )}
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs
         arialabel="Danh sách nhân viên"
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignItems: 'center' }}>
               <FilterTable sortList={sortList} searchType={sortList} />

               <Button onClick={() => handleClickIsLock(searchParams.is_lock)}>
                  {searchParams.is_lock === 'true' ? 'Tài khoản đã mở' : 'Tài khoản bị khóa'}
               </Button>
            </Box>

            <TableCore columns={columns} {...data} />
         </Box>
      </BaseBreadcrumbs>
   );
}
