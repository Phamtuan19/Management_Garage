/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import repairInvoiceService from '@App/services/repair-invoice';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosResponseData } from '@Core/Api/axios-config';

import BaseFormRepairInvoiceUpdate from './components/BaseFormRepairInvoiceUpdate';
import { RepairInvoiceUpdateSchema, repairInvoiceUpdateSchema } from './utils/repair-invoice-update';

const breadcrumbs = [
   {
      title: 'Phiếu Sửa Chữa',
      link: ROUTE_PATH.REPAIR_INVOICE,
   },
];

const RepairInvoiceUpdate = () => {
   const { id: repairInvoiceId } = useParams();
   const navigate = useNavigate();
   const form = useForm<RepairInvoiceUpdateSchema>({
      resolver: yupResolver(repairInvoiceUpdateSchema),
      defaultValues: repairInvoiceUpdateSchema.getDefault(),
   });

   const { data: repairInvoice, isLoading: isLoadingGetRepairInvoice } = useQuery(
      ['findOneRepairInvoice', repairInvoiceId],
      async () => {
         const res = await repairInvoiceService.find(repairInvoiceId as string);
         return res.data as ResponseFindOneRepairInvoice;
      },
      {
         onSuccess(data) {
            form.setValue('customer.customer_id', data.customer_id._id);
            form.setValue('customer.email', data.customer_id.email);
            form.setValue('customer.phone', data.customer_id.phone);

            form.setValue('car.car_id', data.car_id._id);
            form.setValue('car.car_name', data.car_id.name);
            form.setValue('car.car_color', data.car_id.car_color);
            form.setValue('car.car_type', data.car_id.car_type);
            form.setValue('car.brand_car', data.car_id.brand_car);
            form.setValue('car.license_plate', data.car_id.license_plate);
            form.setValue('car.kilometer', data.kilometer);

            const repairService = data.repairInvoiceService.map((item) => ({
               _id: item._id,
               repair_invoice_id: item.supplies_service_id,
               price: item.price,
               discount: (item.price * item.discount) / 100,
               type: item.type,
               describe: item.describe,

               repair_service_code: item.service_code,
               repair_service_name: item.service_name,
               repair_service_category_id: item.category_id,
               repair_service_category_name: item.category_name,
               details: item.details,
            }));

            form.setValue('repairService', repairService as never);

            const suppliesInvoices = data.repairInvoiceSupplies.map((item) => ({
               _id: item._id,
               repair_invoice_id: item.supplies_service_id,
               quantity: item.quantity,
               price:
                  item.price ?? item.min_price === item.max_price
                     ? item.max_price
                     : `${item.min_price} - ${item.max_price}`,
               discount: (item.price && item.discount && item.price - (item.price * item.discount) / 100) || 0,
               type: item.type,
               describe: item.describe,

               repair_staff_id: item.repair_staff_id,
               status_repair: item.status_repair,

               inventory: item.total_quantity_inventory,
               supplies_detail_code: item.supplies_detail_code,
               supplies_detail_name: item.supplies_detail_name,
               distributor_name: item.distributors_name,
            }));

            form.setValue('suppliesInvoices', suppliesInvoices as never);

            return data;
         },
      },
   );

   const { mutate: handleUpdateRepairInvoice, isLoading } = useMutation({
      mutationFn: async (repairInvoice) => {
         const data = repairInvoice as unknown as RepairInvoiceUpdateSchema;
         const newData = {
            car_id: data.car.car_id,
            customer_id: data.customer.customer_id,
            kilometer: data.car.kilometer,
            describe: '',
            repairService: data.repairService.map((item) => ({
               _id: item._id,
               supplies_service_id: item.repair_invoice_id,
               price: item.price,
               discount: item.discount,
               describe: '',
               type: item.type,
               details: item.details,
            })),
            repairSupplies: data.suppliesInvoices.map((item) => ({
               _id: item._id,
               supplies_service_id: item.repair_invoice_id,
               describe: '',
               quantity: item.quantity,
               repair_staff_id: item.repair_staff_id,
               status_repair: item.status_repair,
               type: item.type,
            })),
         };
         return await repairInvoiceService.update(newData, repairInvoiceId);
      },
      onSuccess: (data: AxiosResponseData) => {
         successMessage(data.message);
         return navigate(ROUTE_PATH.REPAIR_INVOICE);
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const handleSubmitForm: SubmitHandler<RepairInvoiceUpdateSchema> = (data) =>
      handleUpdateRepairInvoice(data as never);

   return (
      <BaseBreadcrumbs
         arialabel="Chỉnh sửa"
         breadcrumbs={breadcrumbs}
         isCheck
         data={repairInvoice}
         isLoading={isLoadingGetRepairInvoice}
      >
         <Box>
            <LoadingButton variant="contained" loading={isLoading} onClick={form.handleSubmit(handleSubmitForm)}>
               Lưu
            </LoadingButton>
         </Box>
         <BaseFormRepairInvoiceUpdate form={form} />
      </BaseBreadcrumbs>
   );
};

export default RepairInvoiceUpdate;