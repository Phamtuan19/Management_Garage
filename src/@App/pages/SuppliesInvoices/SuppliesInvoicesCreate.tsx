/* eslint-disable @typescript-eslint/naming-convention */
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
      defaultValues: {
         details: [
            {
               supplies_detail_id: '',
               quantity_received: '0',
               cost_price: '0',
               selling_price: '0',
               describe: '',
            },
         ],
      },
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
