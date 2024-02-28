/* eslint-disable @typescript-eslint/naming-convention */
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, Button, ButtonBase, IconButton, InputBase, Typography, styled } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import handlePrice from '@Core/Helper/hendlePrice';
import { useQuery } from '@tanstack/react-query';
import repairServiceService, { IRepairService } from '@App/services/repairService.service';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { RepairorderSchema } from '../utils/repairorderSchema';

interface TabRepairOrderServicePropType {
   form: UseFormReturn<RepairorderSchema>;
}

const TabRepairOrderService = ({ form }: TabRepairOrderServicePropType) => {
   const { watch, control, setValue } = form;

   const { remove, append } = useFieldArray({
      control,
      name: 'serviceOrder',
   });

   const { data: repairService, isLoading } = useQuery(['getAllFieldRepairServices'], async () => {
      const res = await repairServiceService.fieldAll({});
      return res.data;
   });

   const serviceOrder = watch('serviceOrder');

   const handleIncrease = (index: number) => {
      setValue(`serviceOrder.${index}.quantity`, watch(`serviceOrder.${index}.quantity`) + 1);
   };

   const handleReduced = (index: number) => {
      setValue(
         `serviceOrder.${index}.quantity`,
         watch(`serviceOrder.${index}.quantity`) <= 1 ? 1 : watch(`serviceOrder.${index}.quantity`) - 1,
      );
   };

   const columnsService = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('supplies_detail_name', {
         id: 'supplies_detail_name',
         header: () => <Box sx={{ textAlign: 'center' }}>Tên Dịch vụ</Box>,
         cell: ({ row }) => {
            return (
               <Box sx={{ textAlign: 'center', minWidth: '200px' }}>
                  <ControllerAutoComplate
                     name={`serviceOrder.${row.index}.repair_service_id`}
                     options={(repairService as never) || []}
                     valuePath="_id"
                     titlePath="name"
                     control={control}
                     loading={isLoading}
                     onChange={(value: IRepairService) => {
                        setValue(`serviceOrder.${row.index}.repair_service_id`, value._id);
                        setValue(`serviceOrder.${row.index}.repair_service_name`, value._id);
                        setValue(`serviceOrder.${row.index}.price`, value.price);
                        setValue(`serviceOrder.${row.index}.discount`, value.discount);
                     }}
                  />
               </Box>
            );
         },
      }),
      columnHelper.accessor('quantity', {
         id: 'quantity',
         header: () => <Box sx={{ textAlign: 'center' }}>SL</Box>,
         cell: ({ row }) => (
            <Box display="flex" width="90px" justifyContent="space-between" gap="6px">
               <ButtonAddQuantity onClick={() => handleIncrease(row.index)}>
                  <AddIcon sx={{ fontSize: '16px' }} />
               </ButtonAddQuantity>
               <Box display="flex" justifyContent="center">
                  <ExtendInputBase value={watch(`serviceOrder.${row.index}.quantity`)} />
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
            <Box sx={{ textAlign: 'center' }}>
               <Typography>{handlePrice(watch(`serviceOrder.${row.index}.price`) ?? 0)}</Typography>
            </Box>
         ),
      }),
      columnHelper.accessor('surcharge', {
         id: 'surcharge',
         header: () => <Box sx={{ textAlign: 'center' }}>Thu thêm</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>
               <ExtendInputBase
                  value={watch(`serviceOrder.${row.index}.surcharge`) ?? 0}
                  onChange={(e) => setValue(`serviceOrder.${row.index}.surcharge`, Number(e.target.value))}
               />
               đ
            </Box>
         ),
      }),
      columnHelper.accessor('discount', {
         id: 'discount',
         header: () => <Box sx={{ textAlign: 'center' }}>Giảm giá</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>
               <Typography>{handlePrice(watch(`serviceOrder.${row.index}.discount`) ?? 0)}</Typography>
            </Box>
         ),
      }),
      columnHelper.accessor('total_price', {
         id: 'total_price',
         header: () => <Box sx={{ textAlign: 'center' }}>Tổng</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>
               <Typography>
                  {handlePrice(
                     Number(watch(`serviceOrder.${row.index}.quantity`)) *
                        (Number(watch(`serviceOrder.${row.index}.price`)) +
                           Number(watch(`serviceOrder.${row.index}.surcharge`))) -
                        Number(watch(`serviceOrder.${row.index}.discount`)),
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
                     <IconButton
                        color="primary"
                        onClick={() =>
                           append({
                              describe: '',
                              discount: 0,
                              price: 0,
                              quantity: 1,
                              surcharge: 0,
                              repair_service_id: '',
                              repair_service_name: '',
                           })
                        }
                     >
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
      <>
         <TableCore
            columns={columnsService}
            data={serviceOrder ?? []}
            isPagination={false}
            noData={
               <Button
                  onClick={() =>
                     append({
                        describe: '',
                        discount: 0,
                        price: 0,
                        quantity: 1,
                        surcharge: 0,
                        repair_service_id: '',
                        repair_service_name: '',
                     })
                  }
               >
                  Thêm Dịch Vụ
               </Button>
            }
         />
      </>
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

export default TabRepairOrderService;
