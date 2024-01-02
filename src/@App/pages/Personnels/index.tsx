
import { Avatar, Box,  TextField } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { useQuery } from '@tanstack/react-query';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import { useNavigate } from 'react-router-dom';
import personnelService from '@App/services/personnel.service';

export default function Personnels() {
   const navigate = useNavigate();
   const { data: personnel, isFetching: isLoading } = useQuery(['getPersonnelList'], async () => {
      const res = await personnelService.get();      
      return res.data;
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('avatar', {
            header: 'Hình ảnh',
            cell: ({ row }) => {
               const res: any = row.original;

               return (
                  <Avatar src={res?.avatar}/>
               );
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
                     <CoreTableActionDelete />
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
         <TableCore columns={columns} data={(personnel?.data as any) || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
}
