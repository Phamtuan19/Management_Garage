// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/naming-convention */
// import React, { useMemo } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import suppliesInvoiceService from '@App/services/supplies-invoice';
// import { UseFormReturn } from 'react-hook-form';
// import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';

// import { RepairInvoiceSchema } from '../../utils/repair-invoice';

// import { SuppliesInvoiceItem } from './TabRepairInvoiceSupplies';

// interface ColumnSuppliesInvoicesCodePropsType {
//    form: UseFormReturn<RepairInvoiceSchema>;
//    supplies: SuppliesInvoiceItem;
//    index: number;
// }

// const ColumnSuppliesInvoicesCode = ({ form, index, supplies }: ColumnSuppliesInvoicesCodePropsType) => {
//    const { setValue, control, watch } = form;

//    const { data, isLoading } = useQuery(['getSuppliesInvoice', supplies.supplies_detail_id], async () => {
//       const res = await suppliesInvoiceService.getListDeatilsSort({
//          supplies_detail_id: supplies.supplies_detail_id,
//       });
//       return res.data;
//    });

//    const suppliesInvoice = watch('suppliesInvoice');

//    const newData = useMemo(() => {
//       if (data) {
//          if (suppliesInvoice.length > 0) {
//             return data.filter(
//                (item1) =>
//                   !suppliesInvoice
//                      .filter((item2) => {
//                         return (
//                            watch(`suppliesInvoice.${index}.supplies_invoices_code`) !== item2.supplies_invoices_code &&
//                            watch(`suppliesInvoice.${index}.supplies_detail_id`) === item2.supplies_detail_id
//                         );
//                      })
//                      .some((item2) => {
//                         return item1.supplies_invoice_code === item2.supplies_invoices_code;
//                      }),
//             );
//          }

//          return data;
//       }
//       return [];
//    }, [data, suppliesInvoice]);

//    return (
//       <ControllerAutoComplate
//          loading={isLoading}
//          name={`suppliesInvoice.${index}.supplies_invoices_code`}
//          options={(newData as never) || []}
//          valuePath="supplies_invoice_code"
//          titlePath="supplies_invoice_code"
//          onChange={(e: {
//             _id: string;
//             inventory: number;
//             selling_price: number;
//             supplies_invoice_code: string;
//             supplies_invoice_id: string;
//          }) => {
//             setValue(`suppliesInvoice.${index}.inventory`, e.inventory);
//             setValue(`suppliesInvoice.${index}.selling_price`, e.selling_price);
//             setValue(`suppliesInvoice.${index}.quantity`, e.inventory > 0 ? 1 : 0);
//             setValue(`suppliesInvoice.${index}.supplies_invoices_id`, e.supplies_invoice_id);
//          }}
//          control={control}
//       />
//    );
// };

// export default React.memo(ColumnSuppliesInvoicesCode);
