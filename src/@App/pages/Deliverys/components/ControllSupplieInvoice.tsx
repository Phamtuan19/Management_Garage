/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import React, { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SupplieInvoiceDetailBySupplieId } from '@App/types/supplies-invoice-detail';
import { DeliveryNoteDataDetail } from '@App/types/delivery';
import { useQuery } from '@tanstack/react-query';
import suppliesInvoiceDetailService from '@App/services/supplies-invoice-detail';
import formatDateTime from '@Core/Helper/formatDateTime';

import { DeliveryUpdateExportQuantity } from '../utils/delivery';

interface ControllSupplieInvoiceProps {
   form: UseFormReturn<DeliveryUpdateExportQuantity>;
   data: DeliveryNoteDataDetail | null;
   index: number;
}

const ControllSupplieInvoice = ({ form, data, index }: ControllSupplieInvoiceProps) => {
   const { control, setValue, watch } = form;

   const { data: suppliesInvoices } = useQuery(
      ['getSuppliesInvoiceDetailsBySuppliesDetailId', data?.supplies_service_id],
      async () => {
         const res = await suppliesInvoiceDetailService.getBySupplieDetail(data?.supplies_service_id as string);
         return res.data;
      },
   );

   const data_exports = watch('exports');
   const supplies_invoice_code = watch(`exports.${index}.supplies_invoice_code`);
   //    const dataExportIndex = watch(`exports.${index}`);

   const handleOnchangeAutoComplete = (v: SupplieInvoiceDetailBySupplieId, index: number) => {
      const dataOptionFind = data
         ? data?.options.length > 0
            ? data?.options.find((item) => item.supplies_invoice_code === v.supplies_invoice_code)
                 ?.supplies_invoice_code
            : ''
         : '';

      setValue(`exports.${index}.supplies_invoice_id`, v.supplies_invoice_id);
      setValue(`exports.${index}.selling_price`, v.selling_price);
      setValue(`exports.${index}.quantity_sold`, v.quantity_sold);
      setValue(`exports.${index}.discount`, v.discount);
      setValue(`exports.${index}.supplies_invoice_detail_id`, v._id);
      setValue(`exports.${index}.delivery_detail_id`, data?._id ?? '');
      setValue(`exports.${index}.repair_invoice_detail_id`, data?.repair_invoice_detail_id ?? '');
      setValue(`exports.${index}.supplies_service_id`, data?.supplies_service_id ?? '');
      setValue(`exports.${index}._id`, dataOptionFind ?? '');
   };

   useEffect(() => {
      if (data_exports && suppliesInvoices && suppliesInvoices.length > 0) {
         data_exports.map((item, index) => {
            const invoice = suppliesInvoices.find((v) => v.supplies_invoice_code === item.supplies_invoice_code);

            setValue(`exports.${index}.quantity_sold`, invoice?.quantity_sold ?? 0);
            return;
         });
      }
   }, [data_exports, suppliesInvoices]);

   const dataSupplieInvoices = useMemo(() => {
      if (suppliesInvoices) {
         if (data_exports.length > 0) {
            const filterDataExport = data_exports.filter(
               (item) => item.supplies_invoice_code !== supplies_invoice_code,
            );

            const data: SupplieInvoiceDetailBySupplieId[] = suppliesInvoices.filter(
               (item) =>
                  !filterDataExport
                     .filter((item2) => item2.supplies_invoice_code === item.supplies_invoice_code)
                     .some((v) => v.supplies_invoice_code === item.supplies_invoice_code),
            );

            return data.length > 0
               ? data.map((item) => ({
                    key: item.supplies_invoice_code,
                    title: `#${item.supplies_invoice_code} - ${formatDateTime(item.createdAt)}`,
                    ...item,
                 }))
               : [];
         }

         return suppliesInvoices?.map((item) => ({
            key: item.supplies_invoice_code,
            title: item.supplies_invoice_code,
            ...item,
         }));
      }
      return [];
   }, [suppliesInvoices, data_exports]);

   //    useEffect(() => {
   //       if (dataExportIndex && dataExportIndex?.supplies_invoice_code === '' && dataSupplieInvoices) {
   //          const newSupplieInvoices = dataSupplieInvoices.sort((a, b) => {
   //             return (new Date(b.createdAt) as never) - (new Date(a.createdAt) as never);
   //          });

   //          return setValue(`exports.${index}.supplies_invoice_code`, newSupplieInvoices[0].supplies_invoice_code);
   //       }
   //       return;
   //    }, [dataExportIndex, dataSupplieInvoices]);

   return (
      <>
         <ControllerLabel title="Mã lô hàng" required />
         <ControllerAutoComplate
            name={`exports.${index}.supplies_invoice_code`}
            options={dataSupplieInvoices as never}
            valuePath="key"
            titlePath="title"
            control={control}
            onChange={(e: SupplieInvoiceDetailBySupplieId) => {
               handleOnchangeAutoComplete(e, index);
            }}
         />
      </>
   );
};

export default React.memo(ControllSupplieInvoice);
