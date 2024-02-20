/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, Button, ButtonBase, IconButton, InputBase, Typography, styled } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import handlePrice from '@Core/Helper/hendlePrice';
import { useMutation, useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import suppliesService, { ReadSupplies } from '@App/services/supplies.service';
import distributorService from '@App/services/distributor.service';

import { RepairorderSchema } from '../utils/repairorderSchema';

interface TabRepairOrderSuppliesPropType {
   form: UseFormReturn<RepairorderSchema>;
}

const appendFieldArray = {
   describe: '',
   discount: 0,
   selling_price: 0,
   quantity: 1,
   surcharge: 0,
   supplies_detail_id: '',
   code: '',
   distributor_id: '',
   supplies_invoices_code: '',
};

const TabRepairOrderSupplies = ({ form }: TabRepairOrderSuppliesPropType) => {
   const { watch, control, setValue } = form;

   const serviceOrder = watch('suppliesOrder');

   const { remove, append } = useFieldArray({
      control,
      name: 'suppliesOrder',
   });

   const {
      data: suppliesDetail,
      isLoading,
      mutate: handleGetSupplies,
   } = useMutation(['getAllfieldSupplies'], async (distributor_id: string) => {
      const res = await suppliesService.getAllSupplies({
         distributor_id,
      });
      return res.data;
   });

   const { data: distributors } = useQuery(['getAllFieldDistributors'], async () => {
      const res = await distributorService.getAllField();
      return res.data;
   });

   // Tăng số lượng vật tư
   const handleIncrease = (index: number) => {
      setValue(`suppliesOrder.${index}.quantity`, watch(`suppliesOrder.${index}.quantity`) + 1);
   };

   // Giảm số lượng vật tư
   const handleReduced = (index: number) => {
      setValue(
         `suppliesOrder.${index}.quantity`,
         watch(`suppliesOrder.${index}.quantity`) <= 1 ? 1 : watch(`suppliesOrder.${index}.quantity`) - 1,
      );
   };

   // const suppliesDetails = useMemo(() => {
   //    const dSuppliesId = serviceOrder
   //       .filter((item) => item.supplies_detail_id !== '')
   //       .map((item) => item.supplies_detail_id);

   //    return suppliesDetail?.filter((item) => !dSuppliesId.includes(item._id));
   // }, [serviceOrder, suppliesDetail]);

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
      columnHelper.accessor('distributor_id', {
         id: 'distributor_id',
         header: () => <Box>Nhà phân phối</Box>,
         cell: ({ row }) => {
            return (
               <Box sx={{ textAlign: 'center', minWidth: '200px' }}>
                  <ControllerAutoComplate
                     name={`suppliesOrder.${row.index}.distributor_id`}
                     options={(distributors as never) || []}
                     valuePath="_id"
                     titlePath="name"
                     control={control}
                     loading={isLoading}
                     onChange={(value: { _id: string; name: string }) => {
                        // setValue(`suppliesOrder.${row.index}.distributor_id`, value._id);
                        handleGetSupplies(value._id);
                     }}
                  />
               </Box>
            );
         },
      }),
      columnHelper.accessor('supplies_detail_name', {
         id: 'supplies_detail_name',
         header: () => <Box>Vật tư</Box>,
         cell: ({ row }) => {
            return (
               <Box sx={{ textAlign: 'center', minWidth: '200px' }}>
                  <ControllerAutoComplate
                     name={`suppliesOrder.${row.index}.supplies_detail_id`}
                     options={(suppliesDetail as never) || []}
                     valuePath="_id"
                     titlePath="name_detail"
                     control={control}
                     loading={isLoading}
                     disabled={Boolean(!watch(`suppliesOrder.${row.index}.distributor_id`))}
                     onChange={(value: ReadSupplies) => {
                        setValue(`suppliesOrder.${row.index}.supplies_detail_id`, value._id);
                        setValue(`suppliesOrder.${row.index}.code`, value.code);
                        setValue(`suppliesOrder.${row.index}.selling_price`, value.selling_price);
                        setValue(`suppliesOrder.${row.index}.discount`, value.discount);
                     }}
                  />
               </Box>
            );
         },
      }),
      columnHelper.accessor('code', {
         id: 'code',
         header: () => <Box sx={{ textAlign: 'center' }}>Mã Lô hàng</Box>,
         cell: ({ row }) => {
            return (
               <Box sx={{ textAlign: 'center', minWidth: '100px' }}>
                  <ControllerAutoComplate
                     name={`suppliesOrder.${row.index}.supplies_invoices_code`}
                     options={(distributors as never) || []}
                     valuePath="_id"
                     titlePath="name"
                     control={control}
                     loading={isLoading}
                     disabled={Boolean(!watch(`suppliesOrder.${row.index}.distributor_id`))}
                     onChange={(value: { _id: string; name: string }) => {
                        // setValue(`suppliesOrder.${row.index}.distributor_id`, value._id);
                        handleGetSupplies(value._id);
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
            <Box sx={{ textAlign: 'center' }}>
               <Typography>{handlePrice(watch(`suppliesOrder.${row.index}.selling_price`) ?? 0)}</Typography>
            </Box>
         ),
      }),
      columnHelper.accessor('discount', {
         id: 'discount',
         header: () => <Box sx={{ textAlign: 'center' }}>Giảm giá</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>
               <Typography>{handlePrice(watch(`suppliesOrder.${row.index}.discount`) ?? 0)}</Typography>
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
                     <IconButton color="primary" onClick={() => append(appendFieldArray)}>
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
            noData={<Button onClick={() => append(appendFieldArray)}>Thêm Vật tư</Button>}
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

export default TabRepairOrderSupplies;
