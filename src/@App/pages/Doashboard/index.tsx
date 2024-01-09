import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import PermissionAccess from '@App/routes/components/PermissionAccessRoute';
import { Button } from '@mui/material';

const Doashboard = () => {
   return (
      <BaseBreadcrumbs arialabel="Doashboard">
         <PermissionAccess module={MODULE_PAGE.PERSONNELS} action={PAGE_ACTION.VIEW_ALL}>
            <Button>Permission Access - VIEW</Button>
         </PermissionAccess>
         <PermissionAccess module={MODULE_PAGE.ROLES} action={PAGE_ACTION.CREATE}>
            <Button>Permission Access - CREATE</Button>
         </PermissionAccess>
         <PermissionAccess module={MODULE_PAGE.ROLES} action={PAGE_ACTION.UPDATE}>
            <Button>Permission Access - EDIT</Button>
         </PermissionAccess>
         <PermissionAccess module={MODULE_PAGE.ROLES} action={PAGE_ACTION.UPDATE}>
            <Button>Permission Access - UPDATE</Button>
         </PermissionAccess>
         <PermissionAccess module={MODULE_PAGE.ROLES} action={PAGE_ACTION.VIEW_ONE}>
            <Button>Permission Access - SHOW</Button>
         </PermissionAccess>
      </BaseBreadcrumbs>
   );
};

export default Doashboard;
