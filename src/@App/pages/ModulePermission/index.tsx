import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { Box, TextField } from '@mui/material';

const ModulePremission = () => {
   // const navigate = useNavigate();
   // const { data: modulePermissions, isFetching: isLoading } = useQuery(['getPermissionList'], async () => {
   //    const res = await permissionService.get();
   //    return res.data;
   // });

   // const columns = useMemo(() => {
   //    return [
   //       columnHelper.accessor((_, index) => index + 1, {
   //          id: 'STT',
   //          header: 'STT',
   //          cell: ({ getValue }) => {
   //             return <Box>{getValue()}</Box>;
   //          },
   //       }),
   //       columnHelper.accessor('name', {
   //          header: 'Tên module',
   //       }),
   //       columnHelper.accessor('title', {
   //          header: 'Tên',
   //       }),
   //       columnHelper.accessor('access', {
   //          header: 'Quyền truy cập',
   //          cell: ({ row }) => {
   //             const res: any = row.original;
   //             return (
   //                <Box sx={{ display: 'flex', gap: 0.5 }}>
   //                   {JSON.parse(res?.action!)?.map((action: string) => {
   //                      return (
   //                         <Chip
   //                            key={action}
   //                            color={CHIP_COLOR[action as keyof typeof CHIP_COLOR]}
   //                            variant="outlined"
   //                            label={action}
   //                            sx={{ textTransform: 'capitalize' }}
   //                         />
   //                      );
   //                   })}
   //                </Box>
   //             );
   //          },
   //       }),
   //       columnHelper.accessor('', {
   //          header: 'Thao tác',
   //          cell: ({ row }) => {
   //             const res: any = row.original;

   //             return (
   //                <Box>
   //                   {/* <CoreTableActionDelete /> */}
   //                   <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.PERSONNELS + '/' + res?.id)} />
   //                </Box>
   //             );
   //          },
   //       }),
   //    ];
   // }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách nhóm quyền">
         <Box>
            <TextField size="small" />
         </Box>

         {/* <TableCore columns={columns} data={(modulePermissions?.data as any) || []} isLoading={isLoading} /> */}
      </BaseBreadcrumbs>
   );
};

export default ModulePremission;
