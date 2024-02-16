import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import BaseFormSuppliesInvoices from './component/BaseFormSuppliesInvoices';
import { SuppliesInvoicesSchema, suppliesInvoicesSchema } from './utils/suppliesInvoices.schema';

const breadcrumbs = [
   {
      title: 'Nhập vật tư',
      link: ROUTE_PATH.SUPPLIES_INVOICES,
   },
];

const SuppliesInvoicesCreate = () => {
   const form = useForm<SuppliesInvoicesSchema>({
      resolver: yupResolver(suppliesInvoicesSchema),
      defaultValues: suppliesInvoicesSchema.getDefault(),
   });

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         {/* <LoadingButton type="submit" variant="contained">
            Lưu
         </LoadingButton> */}

         <BaseFormSuppliesInvoices form={form} />
      </BaseBreadcrumbs>
   );
};

export default SuppliesInvoicesCreate;
