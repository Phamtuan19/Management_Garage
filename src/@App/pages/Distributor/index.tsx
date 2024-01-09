import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { Box, TextField } from '@mui/material';
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
         {/* <TableCore columns={columns} data={(distributor as never) || []} isLoading={isLoading} /> */}
      </BaseBreadcrumbs>
   );
};

export default Distributor;
