import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PAGE_ACTION from '@App/configs/page-action';
import { useSetting } from '@App/redux/slices/setting.slice';
import PermissionAccess from '@App/routes/components/PermissionAccess';
import { Button } from '@mui/material';

const Doashboard = () => {
   const { permissions } = useSetting();

   return (
      <BaseBreadcrumbs arialabel="Doashboard">
         <PermissionAccess module={permissions.PERSONNELS} action={PAGE_ACTION.VIEW} type="component">
            <Button>Permission Access - VIEW</Button>
         </PermissionAccess>
         <PermissionAccess module={permissions.PERSONNELS} action={PAGE_ACTION.CREATE} type="component">
            <Button>Permission Access - CREATE</Button>
         </PermissionAccess>
         <PermissionAccess module={permissions.PERSONNELS} action={PAGE_ACTION.EDIT} type="component">
            <Button>Permission Access - EDIT</Button>
         </PermissionAccess>
         <PermissionAccess module={permissions.PERSONNELS} action={PAGE_ACTION.UPDATE} type="component">
            <Button>Permission Access - UPDATE</Button>
         </PermissionAccess>
         <PermissionAccess module={permissions.PERSONNELS} action={PAGE_ACTION.SHOW} type="component">
            <Button>Permission Access - SHOW</Button>
         </PermissionAccess>
      </BaseBreadcrumbs>
   );
};

export default Doashboard;
