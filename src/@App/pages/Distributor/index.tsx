import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
const Distributor = () => {
   // const { data: distributor, isFetching: isLoading } = useQuery(['distributor'], async () => {
   //    try {
   //       const res = await distributorService.get();
   //       return res.data;
   //    } catch (error) {
   //       throw error;
   //    }
   // });
   // const columns = useMemo(() => {
   //    return [
   //       columnHelper.accessor('name', {
   //          header: 'Tên',
   //       }),
   //       columnHelper.accessor('address', {
   //          header: 'Địa chỉ',
   //       }),
   //       columnHelper.accessor('phone', {
   //          header: 'SĐT',
   //       }),
   //       columnHelper.accessor('email', {
   //          header: 'Email',
   //       }),
   //       columnHelper.accessor('bank-acount-name', {
   //          header: 'Bank Acount Name',
   //       }),
   //       columnHelper.accessor('bank-number', {
   //          header: 'Bank Number',
   //       }),
   //       columnHelper.accessor('bank-name', {
   //          header: 'Bank Name',
   //       }),
   //       columnHelper.accessor('bank-branch', {
   //          header: 'Bank Branch',
   //       }),
   //       columnHelper.accessor('', {
   //          header: 'Thao tác',
   //          cell: () => {
   //             return (
   //                <Box>
   //                   {/* <CoreTableActionDelete /> */}
   //                   {/* <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.PERMISSIONS + '/' + res?.id)} /> */}
   //                </Box>
   //             );
   //          },
   //       }),
   //    ];
   // }, []);
   return (
      <BaseBreadcrumbs arialabel="Danh sách nhà phân phối">
         <Box>
            <TextField size="small" />
         </Box>
         <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action={PAGE_ACTION.CREATE}>
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>
         {/* <TableCore columns={columns} data={(distributor as never) || []} isLoading={isLoading} /> */}
      </BaseBreadcrumbs>
   );
};

export default Distributor;
