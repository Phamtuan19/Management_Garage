/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';
import useCoreTable from '@App/hooks/useCoreTable';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import materialsCatalogService, { MaterialsCatalogResponse } from '@App/services/materialsCatalog.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const MaterialsCatalog = () => {
   const navigate = useNavigate();
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
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name', {
            header: 'Tên danh mục',
         }),
         columnHelper.accessor('describe', {
            header: 'Mô tả',
            cell: (info) => (
               <Box sx={{ maxWidth: '400px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const materialsCatalog = row.original as MaterialsCatalogResponse;

               return (
                  <Box>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit
                        callback={() =>
                           navigate(ROUTE_PATH.MATERIALS_CATALOGS + '/' + materialsCatalog._id + '/update')
                        }
                     />
                     <CoreTableActionViewDetail
                        callback={() =>
                           navigate(ROUTE_PATH.MATERIALS_CATALOGS + '/' + materialsCatalog._id + '/details')
                        }
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
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action="CREATE">
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalog;
