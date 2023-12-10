import { Box, Chip, Button, Grid, TextField, Avatar } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { useEffect, useMemo } from 'react';
import personnelService from '@App/services/personnel.service';
import { useQuery } from '@tanstack/react-query';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@App/redux/rootReducer';
import { getPersonnel } from '@App/redux/slices/Personnels';

export default function Personnels() {
   const { data: personnels, isFetching: isLoading } = useQuery(['getPersonnelList'], async () => {
      const res = await personnelService.get();
      return res.data;
   });

   console.log(personnels);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('avatar', {
            header: 'Hình ảnh',
            cell: ({ row }) => {
               const personnel: any = row.original;

               return <Avatar src={personnel.avatar} />;
            },
         }),
         columnHelper.accessor('fullname', {
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
         }),
         columnHelper.accessor('working_status', {
            header: 'Trạng thái',
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const res: any = row.original;

               return (
                  <Box>
                     {/* <CoreTableActionDelete /> */}
                     {/* <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.PERMISSIONS + '/' + res?.id)} /> */}
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
         <TableCore columns={columns} data={(personnels?.data as any) || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
}
