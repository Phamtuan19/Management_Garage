import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import MODULE_PAGE from '@App/configs/module-page';
import { Box, Button } from '@mui/material';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { lazy } from 'react';
import { Link } from 'react-router-dom';
import PageContent from '@App/component/customs/PageContent';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

const SuppliesExport = lazy(() => import(`./SuppliesExport`));
const SuppliesList = lazy(() => import(`./SuppliesList`));

const Supplies = () => {
   const { searchParams, deleteParams, setParams, clearParams } = useSearchParamsHook();

   const handleClickExport = () => {
      if (searchParams['export']) {
         return deleteParams('export');
      }

      clearParams();
      return setParams('export', 'true');
   };

   return (
      <BaseBreadcrumbs arialabel="Vật tư">
         <Box display="flex" gap={1} alignItems="center" justifyContent="space-between">
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="CREATE">
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
            <Button color="warning" size="medium" onClick={handleClickExport}>
               Vật tư đã xuất
            </Button>
         </Box>
         <PageContent>{searchParams['export'] ? <SuppliesExport /> : <SuppliesList />}</PageContent>
      </BaseBreadcrumbs>
   );
};

export default Supplies;
