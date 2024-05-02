/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import repairInvoiceService from '@App/services/repair-invoice';
import transactionService from '@App/services/transaction-service';
import formatPrice from '@Core/Helper/formatPrice';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const PDFExportRepairInvoice = () => {
   const { id: repairInvoiceId } = useParams();
   const { data: repairInvoice } = useQuery(['findOneRepairInvoice', repairInvoiceId], async () => {
      const res = await repairInvoiceService.find(repairInvoiceId as string);
      return res.data as any;
   });

   const { data: transaction } = useQuery(['getTransaction', repairInvoice.transactions_id], async () => {
      const res = await transactionService.find(repairInvoice?.transactions_id);
      return res.data;
   });

   const renderInfo = [
      {
         title: 'Khach hàng:',
         value: repairInvoice?.customer_id.name,
      },
      {
         title: 'Dien Thoai:',
         value: repairInvoice?.customer_id.phone,
      },
      {
         title: 'Email:',
         value: repairInvoice?.customer_id.email,
      },
      {
         title: 'Xe:',
         value: repairInvoice?.car_id.name,
      },
      {
         title: 'So Km:',
         value: repairInvoice?.kilometer,
      },
      {
         title: 'Bien So Xe:',
         value: repairInvoice?.car_id.license_plate,
      },
      {
         title: 'Hãng xe:',
         value: repairInvoice?.car_id.brand_car,
      },
      {
         title: 'Tổng tiền:',
         value: formatPrice(transaction?.total_price ?? 0),
      },
   ];

   const service = repairInvoice?.repairInvoiceService.map(
      (item: { service_name: any; price: number; discount: number }) => {
         return {
            name: item.service_name,
            price: item.price,
            discount: item.discount,
            quantity: 1,
            type: 'Dịch vụ',
         };
      },
   );

   const supplies = repairInvoice?.repairInvoiceSupplies.map(
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
   return (
      <PDFViewer width="100%" height="600px">
         <Document>
            <Page size="A4" style={styles.page}>
               <View style={styles.section}>
                  <Text style={styles.h1}>Hoa Don Sua Chua</Text>
                  {renderInfo.map((item) => {
                     return (
                        <Text style={styles.h3}>
                           <Text style={styles.label}>{item.title}</Text>
                           <Text style={styles.value}>{item.value}</Text>
                        </Text>
                     );
                  })}

                  {renderTable.map((item, index) => (
                     <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{item.name}</Text>
                        <Text style={styles.cell}>{item.price}</Text>
                        <Text style={styles.cell}>{item.discount}</Text>
                        <Text style={styles.cell}>{item.quantity}</Text>
                        <Text style={styles.cell}>{item.type}</Text>
                     </View>
                  ))}
               </View>
            </Page>
         </Document>
      </PDFViewer>
   );
};

const styles = StyleSheet.create({
   header: {
      fontSize: 20,
      marginBottom: 10,
   },
   row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
   },
   cell: {
      padding: 5,
   },
   page: {
      flexDirection: 'row',
      backgroundColor: 'white',
   },
   section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
   },
   title: {
      fontSize: 24,
      marginBottom: 20,
   },
   content: {
      fontSize: 16,
   },
   h3: {
      display: 'flex',
      gap: 52,
   },
   label: {
      marginRight: 24,
   },
   value: {},
   h1: {
      fontSize: 32,
      textAlign: 'center',
      marginBottom: 12,
   },
});

export default PDFExportRepairInvoice;
