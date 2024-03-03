/* eslint-disable @typescript-eslint/naming-convention */
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, IconButton } from '@mui/material';
import handlePrice from '@Core/Helper/hendlePrice';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import repairOrderDetailService from '@App/services/repairOrderDetail.service';
import { AxiosResponseData, HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { CoreTableActionDelete } from '@Core/Component/Table/components/CoreTableAction';

import { RepairInvoiceSchema } from '../../utils/repair-invoice';

interface TabSuppliesServicePropType {
   form: UseFormReturn<RepairInvoiceSchema>;
   // isLoading: boolean;
   // onSubmitForm: SubmitHandler<RepairInvoiceSchema>;
   fieldArray: UseFieldArrayReturn<RepairInvoiceSchema>;
}
interface ReapirService {
   _id: string;
   repair_service_id: string;
   repair_service_code: string;
   repair_service_name: string;
   quantity: number;
   price: number;
   discount: number;
   describe: string;
}

const TabRepairService = ({ form, fieldArray }: TabSuppliesServicePropType) => {
   const { id: repairOrderId } = useParams();
   const { watch } = form;

   const { fields, remove } = fieldArray;

   const { mutate: handleDeleteRepairDetailsSupplies } = useMutation({
      mutationFn: async (id: string) => {
         const res = await repairOrderDetailService.delete(id);
         return res;
      },
      onSuccess: (data: AxiosResponseData) => {
         successMessage(data.message || 'Xóa thành công');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         return errorMessage((dataError?.message as unknown as string) || 'Xóa thất bại');
      },
   });

   const handleDeleteItem = (invoice: ReapirService, index: number) => {
      if (repairOrderId) {
         if (invoice._id) {
            handleDeleteRepairDetailsSupplies(invoice._id);
         }
      }

      return remove(index);
   };

   const columnsService = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('repair_service_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã DV</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
      }),
      columnHelper.accessor('repair_service_name', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tên VT</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center', width: '180px' }}>{info.getValue()}</Box>,
      }),
      columnHelper.accessor('price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá</Box>,
         cell: ({ row }) => {
            const price = watch(`suppliesService.${row.index}.price`);
            return <Box sx={{ textAlign: 'center' }}>{handlePrice(price)}</Box>;
         },
      }),
      columnHelper.accessor('discount', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá Km</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}%</Box>,
      }),
      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>Số lượng</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
      }),
      columnHelper.accessor('total_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tổng</Box>,
         cell: ({ row }) => {
            const price = form.watch(`suppliesService.${row.index}.price`);
            const discount = form.watch(`suppliesService.${row.index}.discount`);

            const total_price = price - (price * discount) / 100;

            return <Box sx={{ textAlign: 'center' }}>{handlePrice(total_price)}</Box>;
         },
      }),
      columnHelper.accessor('action', {
         header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
         cell: ({ row }) => {
            const invoice = row.original as ReapirService;

            return (
               <Box display="flex" justifyContent="right" gap="6px">
                  <IconButton color="warning" onClick={() => {}}>
                     <EditIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => {}}>
                     <AddIcon />
                  </IconButton>

                  <CoreTableActionDelete callback={() => handleDeleteItem(invoice, row.index)} />
               </Box>
            );
         },
      }),
   ];

   return (
      <>
         <TableCore height={340} columns={columnsService} data={fields} isPagination={false} />
      </>
   );
};

export default TabRepairService;
