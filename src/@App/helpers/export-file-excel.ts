/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from 'xlsx';

const exportFileExcel = ({ data }: any) => {
   const service = data?.repairInvoiceService.map((item: { service_name: any; price: number; discount: number }) => {
      return {
         name: item.service_name,
         price: item.price,
         discount: item.discount,
         quantity: 1,
         type: 'Dịch vụ',
      };
   });

   const supplies = data?.repairInvoiceSupplies.map(
      (item: { supplies_detail_name: any; quantity: any; discount: any; min_price: string; max_price: string }) => {
         return {
            name: item.supplies_detail_name,
            quantity: item.quantity,
            discount: item.discount,
            price: item.min_price + ' - ' + item.max_price,
            type: 'Vật tư thay thế',
         };
      },
   );

   const renderTable = [...service, ...supplies];

   const ws = XLSX.utils.json_to_sheet(renderTable);
   const wb = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
   XLSX.writeFile(wb, `hoa-don-sua-chua-${data.code}.xlsx`);
};

export default exportFileExcel;
