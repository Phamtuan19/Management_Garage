import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import { MaterialsCatalog } from '@App/services/materialsCatalog.service';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { Box, TextField } from '@mui/material';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const MaterialsCatalog = () => {
   const navigate = useNavigate();
   const { data: materialsCatalog, isLoading } = useQuery(['getListMaterialsCatalog'], async () => {
      const res = await materialsCatalogService.get();
      return res.data;
   });

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
               const material = row.original as MaterialsCatalog;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.MATERIALS_CATALOGS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.MATERIALS_CATALOGS + '/' + material._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit
                        callback={() => navigate(ROUTE_PATH.MATERIALS_CATALOGS + '/' + material._id)}
                     />
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
         <TableCore columns={columns} data={materialsCatalog || []} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalog;