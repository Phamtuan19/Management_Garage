import FilterTable from '@App/component/common/FilterTable';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const sortList = [
   {
      title: 'Tên dịch vụ sửa chữa',
      value: 'name',
   },
   {
      title: 'Giá',
      value: 'price',
   },
   {
      title: 'Giảm giá',
      value: 'brand_car',
   },
   {
      title: 'Mô tả',
      value: 'describe',
   },
];

const Repairorder = () => {
   return (
      <BaseBreadcrumbs arialabel="Phiếu sửa chữa">
         <Box>
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action={PAGE_ACTION.CREATE}>
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortList} searchType={sortList} />
            </Box>
         </PageContent>
      </BaseBreadcrumbs>
   );
};
export default Repairorder;
