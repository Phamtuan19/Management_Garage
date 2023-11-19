import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import BaseFormPersonnel from './components/BaseFormPersonnel';

const PersonnelCreate = () => {
   return (
      <BaseBreadcrumbs arialabel="Personnels">
         <BaseFormPersonnel />
      </BaseBreadcrumbs>
   );
};

export default PersonnelCreate;
