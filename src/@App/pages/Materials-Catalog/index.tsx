import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import materialsCatalogService, { IMaterialsCatalog } from '@App/services/materialsCatalog.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete, CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import { Box, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MaterialsCatalog = () => {
   const navigate = useNavigate();
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getListMaterialsCatalog'], async () => {
      const res = await materialsCatalogService.get();
      return res.data;
   });
   const data = useCoreTable(queryTable);
   
   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name', {
            header: 'Tên danh mục',
         }),
         columnHelper.accessor('describe', {
            header: 'Mô tả',
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const material = row.original as IMaterialsCatalog;
               return (
                  <Box>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit callback={() =>
                        navigate(ROUTE_PATH.MATERIALS_CATALOGS + '/' + material._id + '/details')
                     } />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách vật tư">
         <Box>
            <TextField size="small" label="Tìm kiếm" />
         </Box>
         <TableCore columns={columns} {...data}/>
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalog;
