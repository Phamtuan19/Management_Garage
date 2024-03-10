/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import suppliesInvoiceService from '@App/services/supplies-invoice';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@App/redux/slices/auth.slice';
import { useEffect } from 'react';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import svg from '@App/assets/svg';

import { SuppliesInvoicesSchema, suppliesInvoicesSchema } from './utils/suppliesInvoices.schema';
import BaseFormSuppliesInvoices from './component/BaseFormSuppliesInvoices';

const breadcrumbs = [
   {
      title: 'Nhập vật tư',
      link: ROUTE_PATH.SUPPLIES_INVOICES,
   },
];

const SuppliesInvoicesCreate = () => {
   const navigate = useNavigate();
   const { user } = useAuth();

   const form = useForm<SuppliesInvoicesSchema>({
      resolver: yupResolver(suppliesInvoicesSchema),
      defaultValues: suppliesInvoicesSchema.getDefault(),
   });
   const transfer_money = form.watch('transaction.transfer_money');
   const cash_money = form.watch('transaction.cash_money');
   const total_price = form.watch('transaction.total_price');
   useEffect(() => {
      form.setValue('personnel_id', user?._id as string);
   }, [user?._id]);

   const coreConfirm = useConfirm();

   const { mutate: createSuppliesInvoice } = useMutation({
      mutationFn: async (data: SuppliesInvoicesSchema) => {
         return await suppliesInvoiceService.create(data);
      },
      onSuccess: () => {
         successMessage('Tạo mới thành công.');
         return navigate(ROUTE_PATH.SUPPLIES_INVOICES);
      },
      onError: () => {
         return errorMessage('Đã có lỗi xảy ra');
      },
   });

   const handleSubmitSuppliesInvoice = (data: SuppliesInvoicesSchema) => {
      const isCheck = Number(transfer_money) + Number(cash_money) - Number(total_price);

      coreConfirm({
         icon: <LazyLoadingImage src={svg.warning} />,
         title: isCheck === 0 ? 'Xác nhận' : 'Cảnh báo',
         content:
            isCheck === 0
               ? 'Xác nhận lưu hóa đơn nhập hàng'
               : isCheck < 0
                 ? 'Bạn chưa thanh toán hoàn tất đơn hàng.'
                 : 'Số tiền đã trả lớn hơn giá trị hóa đơn.',
         isIcon: true,
         color: 'error',
         callbackOK: () => {
            isCheck === 0 && createSuppliesInvoice(data);
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
