import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import PermissionAccess from '@App/routes/components/PermissionAccess';
import { Button } from '@mui/material';

const Doashboard = () => {
   return (
      <BaseBreadcrumbs arialabel="Doashboard">
         <PermissionAccess module={MODULE_PAGE.PERSONNELS} action={PAGE_ACTION.VIEW} type="component">
            <Button>Permission Access</Button>
         </PermissionAccess>
      </BaseBreadcrumbs>
   );
};

export default Doashboard;
