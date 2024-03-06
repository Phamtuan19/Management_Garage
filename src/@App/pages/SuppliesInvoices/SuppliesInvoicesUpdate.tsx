/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ROUTE_PATH from '@App/configs/router-path';
import { useMutation, useQuery } from '@tanstack/react-query';
import suppliesInvoiceService, { ResponseGetSuppliesInvoice } from '@App/services/supplies-invoice';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';

import BaseFormSuppliesInvoices from './component/BaseFormSuppliesInvoices';
import { SuppliesInvoicesSchema, suppliesInvoicesSchema } from './utils/suppliesInvoices.schema';

const breadcrumbs = [
   {
      title: 'Nhập vật tư',
      link: ROUTE_PATH.SUPPLIES_INVOICES,
   },
];

const SuppliesInvoicesUpdate = () => {
   const { id: suppliesInvoiceId } = useParams();
   const navigate = useNavigate();

   const coreConfirm = useConfirm();

   if (!suppliesInvoiceId) {
      return <h1>Sản phẩm không tồn tại</h1>;
   }

   const form = useForm<SuppliesInvoicesSchema>({
      resolver: yupResolver(suppliesInvoicesSchema),
      defaultValues: suppliesInvoicesSchema.getDefault(),
   });

   const { data: suppliesInvoice, refetch: getSuppliesInvoice } = useQuery(
      ['getSuppliesInvoice', suppliesInvoiceId],
      async () => {
         const res = await suppliesInvoiceService.find(suppliesInvoiceId);
         return res.data;
      },
      {
         onSuccess: (data: ResponseGetSuppliesInvoice) => {
            form.setValue('personnel_id', data.personnel._id);
            form.setValue('transaction', {
               cash_money: data.transactions.cash_money,
               payment_type: data.transactions.payment_type,
               total_price: data.transactions.total_price,
               transfer_money: data.transactions.transfer_money,
            });
            form.setValue('describe', data.describe);
            form.setValue('image', '');

            const details = data.details.map((item) => {
               return {
                  describe: item.describe,
                  code: item.supplies_detail.code,
                  name_detail: item.supplies_detail.name,
                  unit: item.supplies_detail.unit,
                  supplies_detail_id: item.supplies_detail._id,
                  quantity_received: item.quantity_received,
                  cost_price: item.cost_price,
                  selling_price: item.selling_price,
                  discount: item.discount,
               };
            });

            form.setValue('details', details);

            return data;
         },
      },
   );

   const { mutate: updateSuppliesInvoice } = useMutation({
      mutationFn: async (data: SuppliesInvoicesSchema) => {
         const newData = {
            ...data,
            transaction: {
               ...data.transaction,
               _id: suppliesInvoice?.transactions._id,
            },
         };

         return await suppliesInvoiceService.update(newData, suppliesInvoiceId);
      },
      onSuccess: async () => {
         await getSuppliesInvoice();
         successMessage('Chỉnh sửa thành công.');
         return navigate(ROUTE_PATH.SUPPLIES_INVOICES);
      },
      onError: () => {
         return errorMessage('Đã có lỗi xảy ra');
      },
   });

   const handleSubmitSuppliesInvoice = (data: SuppliesInvoicesSchema) => {
      const textComfirm =
         Number(form.watch('transaction.total_price')) -
            (Number(form.watch('transaction.cash_money')) + Number(form.watch('transaction.transfer_money'))) <=
         0
            ? 'Xác nhận lưu hóa đơn nhập hàng'
            : 'Đơn hàng chưa được thanh toán. bạn có muốn lưu lại?';

      coreConfirm({
         content: textComfirm,
         isIcon: true,
         callbackOK: () => {
            updateSuppliesInvoice(data);
         },
      });
   };
   return (
      <BaseBreadcrumbs arialabel="Chỉnh sửa" breadcrumbs={breadcrumbs}>
         {/* <LoadingButton type="submit" variant="contained">
      Lưu
   </LoadingButton> */}

         <BaseFormSuppliesInvoices form={form} handleSubmitSuppliesInvoice={handleSubmitSuppliesInvoice} />
      </BaseBreadcrumbs>
   );
};

export default SuppliesInvoicesUpdate;
