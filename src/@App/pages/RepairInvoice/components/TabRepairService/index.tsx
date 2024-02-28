/* eslint-disable @typescript-eslint/naming-convention */
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, IconButton } from '@mui/material';
import handlePrice from '@Core/Helper/hendlePrice';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { RepairInvoiceSchema } from '../../utils/repair-invoice';

interface TabSuppliesServicePropType {
   form: UseFormReturn<RepairInvoiceSchema>;
   // isLoading: boolean;
   // onSubmitForm: SubmitHandler<RepairInvoiceSchema>;
   fieldArray: UseFieldArrayReturn<RepairInvoiceSchema>;
}

const TabRepairService = ({ form, fieldArray }: TabSuppliesServicePropType) => {
   const { watch } = form;

   const { fields, remove } = fieldArray;

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
            return (
               <Box display="flex" justifyContent="right" gap="6px">
                  {/* {serviceOrder.length === row.index + 1 && ( */}
                  <IconButton color="warning" onClick={() => {}}>
                     <EditIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => {}}>
                     <AddIcon />
                  </IconButton>
                  {/* )} */}
                  <IconButton
                     color="error"
                     onClick={() => {
                        remove(row.index);
                     }}
                  >
                     <DeleteIcon />
                  </IconButton>
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
