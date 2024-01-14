import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { Box, TextField } from '@mui/material';

const Supplies = () => {
   // const navigate = useNavigate();
   // const queryTable = useQuery(['getListDistributor'], async () => {
   //    const res = await materialsCatalogService.get();
   //    return res.data;
   // });

   // const data = useCoreTable(queryTable);

   // const columns = useMemo(() => {
   //    return [
   //       columnHelper.accessor((_, index) => index + 1, {
   //          id: 'STT',
   //          header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
   //          cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
   //       }),
   //       columnHelper.accessor('code', {
   //          header: () => <Box sx={{ textAlign: 'center' }}>Mã</Box>,
   //          cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
   //       }),
   //       columnHelper.accessor('name', {
   //          header: 'Tên danh mục',
   //       }),
   //       columnHelper.accessor('describe', {
   //          header: 'Mô tả',
   //       }),
   //       columnHelper.accessor('_id', {
   //          header: 'Thao tác',
   //          cell: ({ row }) => {
   //             return (
   //                <Box>
   //                   <CoreTableActionDelete />
   //                   <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.SUPPLIES + '/' + row.getValue('_id'))} />
   //                </Box>
   //             );
   //          },
   //       }),
   //    ];
   // }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách vật tư">
         <Box>
            <TextField size="small" label="Tìm kiếm" />
         </Box>
         {/* <TableCore columns={columns} data={supplies || []} isLoading={isLoading} /> */}
      </BaseBreadcrumbs>
   );
};

export default Supplies;
