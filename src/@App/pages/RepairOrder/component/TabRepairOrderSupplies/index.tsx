/* eslint-disable @typescript-eslint/naming-convention */
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, ButtonBase, IconButton, InputBase, Typography, styled } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import handlePrice from '@Core/Helper/hendlePrice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useQuery } from '@tanstack/react-query';
import suppliesInvoiceService from '@App/services/supplies-invoice';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ReadSupplies } from '@App/services/supplies.service';

import { RepairorderSchema } from '../../utils/repairorderSchema';

import FilterSearchSupplies from './FilterSearchSupplies';

interface TabRepairOrderSuppliesPropType {
   form: UseFormReturn<RepairorderSchema>;
}

const TabRepairOrderSupplies = ({ form }: TabRepairOrderSuppliesPropType) => {
   const { watch, control, setValue } = form;
   const coreConfirm = useConfirm();

   const serviceOrder = watch('suppliesOrder');

   const { remove } = useFieldArray({
      control,
      name: 'suppliesOrder',
   });

   // Tăng số lượng vật tư
   const handleIncrease = (index: number) => {
      const quantity = watch(`suppliesOrder.${index}.quantity`) + 1;

      if (quantity > watch(`suppliesOrder.${index}.total_supplies_crrent`)) {
         return coreConfirm({
            icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
            title: 'Cảnh báo',
            confirmOk: 'Xác nhận',
            content: 'Sản phẩm này trong lô hàng không đủ số lượng.',
            callbackOK: () => {},
            isIcon: true,
         });
      }

      return setValue(`suppliesOrder.${index}.quantity`, watch(`suppliesOrder.${index}.quantity`) + 1);
   };

   const { data: suppliesDetails } = useQuery(
      ['getListSuppliesDetails'],
      async () => {
         const res = await suppliesInvoiceService.getListSuppliesInvoiceDetails();
         return res.data;
      },
      {},
   );

   // Giảm số lượng vật tư
   const handleReduced = (index: number) => {
      setValue(
         `suppliesOrder.${index}.quantity`,
         watch(`suppliesOrder.${index}.quantity`) <= 1 ? 1 : watch(`suppliesOrder.${index}.quantity`) - 1,
      );
   };

   const columnsService = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('code', {
         id: 'code',
         header: () => <Box sx={{ textAlign: 'center' }}>Mã VT</Box>,
         cell: ({ row }) => {
            const supllies = row.original as Record<string, string | number>;
            return <Box sx={{ textAlign: 'center' }}>#{supllies.code}</Box>;
         },
      }),
      columnHelper.accessor('distributor_name', {
         id: 'distributor_name',
         header: () => <Box>Nhà phân phối</Box>,
         cell: ({ row }) => {
            return (
               <Box sx={{ textAlign: 'left', maxWidth: '200px' }}>
                  <Typography>{watch(`suppliesOrder.${row.index}.distributor_name`)}</Typography>
               </Box>
            );
         },
      }),
      columnHelper.accessor('supplies_detail_name', {
         id: 'supplies_detail_name',
         header: () => <Box>Vật tư</Box>,
         cell: ({ row }) => {
            return (
               <Box sx={{ textAlign: 'left', maxWidth: '200px' }}>
                  <Typography>{watch(`suppliesOrder.${row.index}.name_detail`)}</Typography>
               </Box>
            );
         },
      }),
      columnHelper.accessor('supplies_invoices_code', {
         id: 'supplies_invoices_code',
         header: () => <Box sx={{ textAlign: 'center' }}>Mã Lô hàng</Box>,
         cell: ({ row }) => {
            const dataSuppliesDetails = suppliesDetails
               ? suppliesDetails.filter(
                    (item) => item.supplies_detail_id === watch(`suppliesOrder.${row.index}.supplies_detail_id`),
                 )
               : [];
            return (
               <Box sx={{ textAlign: 'center', minWidth: '150px' }}>
                  <ControllerAutoComplate
                     name={`suppliesOrder.${row.index}.supplies_invoices_id`}
                     options={dataSuppliesDetails as never}
                     valuePath="supplies_invoice_id"
                     titlePath="code"
                     control={control}
                     onChange={(e: ReadSupplies) => {
                        if (e.quantity_received < watch(`suppliesOrder.${row.index}.total_supplies_crrent`)) {
                           setValue(`suppliesOrder.${row.index}.quantity`, e.quantity_received);
                        }

                        if (e.quantity_received === 0) {
                           setValue(`suppliesOrder.${row.index}.quantity`, e.quantity_received);
                        }
                        setValue(`suppliesOrder.${row.index}.selling_price`, e.selling_price);
                        setValue(`suppliesOrder.${row.index}.discount`, e.discount);
                        setValue(`suppliesOrder.${row.index}.total_supplies_crrent`, e.quantity_received);
                     }}
                  />
               </Box>
            );
         },
      }),
      columnHelper.accessor('price', {
         id: 'price',
         header: () => <Box sx={{ textAlign: 'center' }}>Tòn kho</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center', width: '100px' }}>
               <Typography>{watch(`suppliesOrder.${row.index}.total_supplies_crrent`) ?? 0}</Typography>
            </Box>
         ),
      }),
      columnHelper.accessor('quantity', {
         id: 'quantity',
         header: () => <Box sx={{ textAlign: 'center' }}>SL</Box>,
         cell: ({ row }) => (
            <Box display="flex" width="100px" justifyContent="space-between" gap="6px">
               <ButtonAddQuantity onClick={() => handleIncrease(row.index)}>
                  <AddIcon sx={{ fontSize: '16px' }} />
               </ButtonAddQuantity>
               <Box display="flex" justifyContent="center">
                  <ExtendInputBase value={watch(`suppliesOrder.${row.index}.quantity`)} />
               </Box>
               <ButtonAddQuantity
                  sx={({ palette }) => ({
                     bgcolor: palette.error.main,
                  })}
                  onClick={() => {
                     handleReduced(row.index);
                  }}
               >
                  <RemoveIcon sx={{ fontSize: '16px' }} />
               </ButtonAddQuantity>
            </Box>
         ),
      }),
      columnHelper.accessor('price', {
         id: 'price',
         header: () => <Box sx={{ textAlign: 'center' }}>Giá</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center', width: '100px' }}>
               <Typography>{handlePrice(watch(`suppliesOrder.${row.index}.selling_price`) ?? 0)}</Typography>
            </Box>
         ),
      }),
      columnHelper.accessor('discount', {
         id: 'discount',
         header: () => <Box sx={{ textAlign: 'center', width: '100px' }}>Giảm giá</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>
               <Typography>{handlePrice(watch(`suppliesOrder.${row.index}.discount`) ?? 0)}</Typography>
            </Box>
         ),
      }),
      columnHelper.accessor('total_price', {
         id: 'total_price',
         header: () => <Box sx={{ textAlign: 'center', width: '100px' }}>Tổng</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>
               <Typography>
                  {handlePrice(
                     Number(watch(`suppliesOrder.${row.index}.quantity`)) *
                        Number(watch(`suppliesOrder.${row.index}.selling_price`)),
                  )}
               </Typography>
            </Box>
         ),
      }),
      columnHelper.accessor('describe', {
         id: 'describe',
         header: () => <Box sx={{ textAlign: 'center' }}></Box>,
         cell: ({ row }) => {
            return (
               <Box display="flex" justifyContent="right" gap="6px">
                  {serviceOrder.length === row.index + 1 && (
                     <IconButton color="primary" onClick={() => {}}>
                        <AddIcon />
                     </IconButton>
                  )}
                  <IconButton color="error" onClick={() => remove(row.index)}>
                     <DeleteIcon />
                  </IconButton>
               </Box>
            );
         },
      }),
   ];

   return (
      <Box>
         <FilterSearchSupplies form={form} />
         <TableCore height={380} columns={columnsService} data={serviceOrder ?? []} isPagination={false} />
      </Box>
   );
};

const ExtendInputBase = styled(InputBase)({
   '.css-yz9k0d-MuiInputBase-input': {
      padding: '0px',
      textAlign: 'center',
      maxWidth: '70px',
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

export default TabRepairOrderSupplies;
