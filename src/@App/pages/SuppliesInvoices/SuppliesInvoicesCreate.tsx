import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import suppliesInvoiceService from '@App/services/supplies-invoice';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';

import { SuppliesInvoicesSchema, suppliesInvoicesSchema } from './utils/suppliesInvoices.schema';
import BaseFormSuppliesInvoices from './component/BaseFormSuppliesInvoices';

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

   const coreConfirm = useConfirm();

   const { mutate: createSuppliesInvoice } = useMutation({
      mutationFn: async (data: SuppliesInvoicesSchema) => {
         return await suppliesInvoiceService.create(data);
      },
      onSuccess: () => {
         successMessage('Tạo mới nhà thành công.');
      },
      onError: () => {
         return errorMessage('Đã có lỗi xảy ra');
      },
   });

   const handleSubmitSuppliesInvoice = (data: SuppliesInvoicesSchema) => {
      coreConfirm({
         content: 'Xác nhận lưu hóa đơn nhập hàng',
         isIcon: true,
         color: 'error',
         callbackOK: () => {
            createSuppliesInvoice(data);
         },
      });
   };

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         {/* <LoadingButton type="submit" variant="contained">
            Lưu
         </LoadingButton> */}

         <BaseFormSuppliesInvoices form={form} handleSubmitSuppliesInvoice={handleSubmitSuppliesInvoice} />
      </BaseBreadcrumbs>
   );
};

export default SuppliesInvoicesCreate;
