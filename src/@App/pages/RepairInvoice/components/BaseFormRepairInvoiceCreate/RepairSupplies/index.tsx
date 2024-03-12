/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, ButtonBase, InputBase, styled } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete } from '@Core/Component/Table/components/CoreTableAction';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { RepairInvoiceSchema } from '@App/pages/RepairInvoice/utils/repair-invoice-create';

import FilterSupplies from './FilterSupplies';

interface RepairSuppliesProps {
   form: UseFormReturn<RepairInvoiceSchema>;
}

const columnVisibilityData: Record<string, string> = {
   Stt: 'Số thứ tự',
   supplies_detail_code: 'Mã vật tư',
   supplies_detail_name: 'Tên vật tư',
   distributor_name: 'Nhà phân phối',
   inventory: 'tồn kho',
   quantity: 'Số lượng',
   action: 'thao tác',
} as const;

const RepairSupplies = ({ form }: RepairSuppliesProps) => {
   const { watch, setValue, control } = form;
   // const { id: repairOrderId } = useParams();

   const { fields, remove, append } = useFieldArray({
      name: 'suppliesInvoices',
      control: control,
   });

   const [columnVisibility, setColumnVisibility] = useState({
      Stt: true,
      supplies_detail_code: true,
      supplies_detail_name: true,
      distributor_name: true,
      inventory: true,
      quantity: true,
      action: true,
   });

   // Tăng số lượng vật tư
   const handleIncrease = (index: number) => {
      return setValue(`suppliesInvoices.${index}.quantity`, watch(`suppliesInvoices.${index}.quantity`) + 1);
   };

   // Giảm số lượng vật tư
   const handleReduced = (index: number) => {
      return setValue(
         `suppliesInvoices.${index}.quantity`,
         watch(`suppliesInvoices.${index}.quantity`) <= 1 ? 1 : watch(`suppliesInvoices.${index}.quantity`) - 1,
      );
   };

   const columnsService = useMemo(() => {
      return [
         columnHelper.accessor('Stt', {
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
         }),
         columnHelper.accessor('supplies_detail_code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã VT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_detail_name', {
            header: () => <Box>Tên VT</Box>,
            cell: (info) => <Box sx={{ width: '180px' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('distributor_name', {
            header: () => <Box>Nhà phân phối</Box>,
            cell: (info) => {
               return (
                  <Box sx={{ width: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.getValue()}</Box>
               );
            },
         }),
         columnHelper.accessor('inventory', {
            header: () => <Box sx={{ textAlign: 'center' }}>Tồn kho</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('price', {
            header: () => <Box sx={{ textAlign: 'center' }}>Đơn giá</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('quantity', {
            header: () => <Box sx={{ textAlign: 'center', width: '100px' }}>Số lượng</Box>,
            cell: ({ row }) => {
               const quantity = form.watch(`suppliesInvoices.${row.index}.quantity`);
               const inventory = form.watch(`suppliesInvoices.${row.index}.inventory`);

               return (
                  <Box sx={{ textAlign: 'center', width: '100px' }}>
                     <Box display="flex" justifyContent="space-between" gap="6px">
                        <ButtonAddQuantity
                           disabled={quantity === inventory}
                           sx={{ bgcolor: quantity === inventory ? '#ccc' : '#1976d2' }}
                           onClick={() => handleIncrease(row.index)}
                        >
                           <AddIcon sx={{ fontSize: '16px' }} />
                        </ButtonAddQuantity>
                        <Box display="flex" justifyContent="center">
                           <ExtendInputBase disabled value={quantity} />
                        </Box>
                        <ButtonAddQuantity
                           disabled={quantity === 1 || inventory === 0}
                           sx={({ palette }) => ({
                              bgcolor: quantity === 1 || inventory === 0 ? '#ccc' : palette.error.main,
                           })}
                           onClick={() => {
                              handleReduced(row.index);
                           }}
                        >
                           <RemoveIcon sx={{ fontSize: '16px' }} />
                        </ButtonAddQuantity>
                     </Box>
                  </Box>
               );
            },
         }),
         columnHelper.accessor('action', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
            cell: ({ row }) => {
               return (
                  <Box display="flex" justifyContent="right" gap="6px">
                     <CoreTableActionDelete isConfirm={false} callback={() => remove(row.index)} />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <Box>
         <FilterSupplies
            append={append as never}
            columnVisibilityData={columnVisibilityData}
            form={form}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
         />

         <Box>
            <TableCore
               height={340}
               columnVisibility={columnVisibility}
               onColumnVisibilityChange={setColumnVisibility}
               columns={columnsService as never}
               data={fields}
               isPagination={false}
               noData="Chưa có vật tư sửa chữa."
            />
         </Box>
      </Box>
   );
};

const ExtendInputBase = styled(InputBase)({
   '.css-yz9k0d-MuiInputBase-input': {
      padding: '0px',
      textAlign: 'center',
      maxWidth: '70px',
      color: 'black !important',
   },
});

const ButtonAddQuantity = styled(ButtonBase)(({ theme }) => ({
   backgroundColor: theme.palette.primary.main,
   color: theme.base.text.white,
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '4px',
}));

export default RepairSupplies;
