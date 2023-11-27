import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import BaseFormPersonnel from './components/BaseFormPersonnel';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidationFormCreate, validationFormCreate } from './utils/personnel.schema';
import { yupResolver } from '@hookform/resolvers/yup';

const PersonnelCreate = () => {
   const { handleSubmit, control } = useForm<ValidationFormCreate>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => {
      console.log(data);
   };

   return (
      <BaseBreadcrumbs arialabel="Personnels">
         <BaseFormPersonnel handleSubmit={handleSubmit} onSubmitForm={onSubmitForm} control={control} />
      </BaseBreadcrumbs>
   );
};

export default PersonnelCreate;
