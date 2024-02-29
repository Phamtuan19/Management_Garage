/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import suppliesInvoiceService from '@App/services/supplies-invoice';
import { UseFormReturn } from 'react-hook-form';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';

import { RepairInvoiceSchema } from '../../utils/repair-invoice';

import { SuppliesInvoiceItem } from './TabRepairInvoiceSupplies';

interface ColumnSuppliesInvoicesCodePropsType {
   form: UseFormReturn<RepairInvoiceSchema>;
   supplies: SuppliesInvoiceItem;
   index: number;
}

const ColumnSuppliesInvoicesCode = ({ form, index, supplies }: ColumnSuppliesInvoicesCodePropsType) => {
   const { setValue, control } = form;

   const { data, isLoading } = useQuery(['getSuppliesInvoice', supplies.supplies_detail_id], async () => {
      const res = await suppliesInvoiceService.getListDeatilsSort({
         supplies_detail_id: supplies.supplies_detail_id,
      });
      return res.data;
   });

   return (
      <ControllerAutoComplate
         loading={isLoading}
         name={`suppliesInvoice.${index}.supplies_invoices_code`}
         options={(data as never) || []}
         valuePath="supplies_invoice_code"
         titlePath="supplies_invoice_code"
         onChange={(e: { inventory: number; selling_price: number; supplies_invoice_code: string; _id: string }) => {
            console.log(e);
            setValue(`suppliesInvoice.${index}.inventory`, e.inventory);
            setValue(`suppliesInvoice.${index}.selling_price`, e.selling_price);
            setValue(`suppliesInvoice.${index}.quantity`, e.inventory > 0 ? 1 : 0);
            // form.setValue(`suppliesInvoice.${row.index}.supplies_invoices_id`, e._id);
         }}
         control={control}
      />
   );
};

export default React.memo(ColumnSuppliesInvoicesCode);
