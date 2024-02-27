import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import BaseFormRepairInvoice from './components/BaseFormRepairInvoice';
import { RepairInvoiceSchema, repairInvoiceSchema } from './utils/repair-invoice';

const RepairInvoiceCreate = () => {
   const form = useForm<RepairInvoiceSchema>({
      resolver: yupResolver(repairInvoiceSchema),
      defaultValues: repairInvoiceSchema.getDefault(),
   });

   const onSubmitForm: SubmitHandler<RepairInvoiceSchema> = (data) => {
      console.log(data);
   };

   return (
      <BaseBreadcrumbs arialabel="Phiếu sửa chữa">
         <BaseFormRepairInvoice form={form} isLoading={false} onSubmitForm={onSubmitForm} />
      </BaseBreadcrumbs>
   );
};

export default RepairInvoiceCreate;
