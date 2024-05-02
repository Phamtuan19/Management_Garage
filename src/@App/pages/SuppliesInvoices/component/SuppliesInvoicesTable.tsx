/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */

import { Box, Button, ButtonBase, Chip, Grid, InputBase, styled } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import RemoveIcon from '@mui/icons-material/Remove';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { useEffect, useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Regexs from '@Core/Configs/Regexs';
import formatPrice from '@Core/Helper/formatPrice';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@tanstack/react-query';
import suppliesInvoiceDetailService from '@App/services/supplies-invoice-detail';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

import SearchSupplies from './SearchSupplies';

interface SuppliesInvoicesTable {
   form: UseFormReturn<SuppliesInvoicesSchema>;
   isCheckStatusPayment: boolean;
}

const SuppliesInvoicesTable = ({ form, isCheckStatusPayment }: SuppliesInvoicesTable) => {
   const {
      control,
      watch,
      setValue,
      formState: { errors },
   } = form;
   const [columnVisibility, setColumnVisibility] = useState({
      stt: true,
      code: true,
      name_detail: true,
      distributor_name: true,
      unit: true,
      quantity_received: true,
      cost_price: true,
      selling_price: true,
      discount: true,
      total_price: true,
      action: true,
   });
   const comfirm = useConfirm();

   const { mutate: handleDeleteSuppliesItem } = useMutation({
      mutationFn: async (id: string) => {
         return await suppliesInvoiceDetailService.delete(id);
      },
      onSuccess: () => {
         successMessage('Xóa thành công.');
      },
      onError: (error: AxiosError) => {
         return errorMessage(error);
      },
   });

   const { fields, remove } = useFieldArray({
      control,
      name: 'details',
   });

   const handleIncrease = (index: number) => {
      setValue(`details.${index}.quantity_received`, watch(`details.${index}.quantity_received`) + 1);
   };

   const handleReduced = (index: number) => {
      setValue(
         `details.${index}.quantity_received`,
         watch(`details.${index}.quantity_received`) <= 1 ? 1 : watch(`details.${index}.quantity_received`) - 1,
      );
   };

   const handleDeleteItem = (index: number, suppliesItem: Record<string, string | number>) => {
      if (suppliesItem.supplies_invoice_detail_id !== '') {
         return comfirm({
            icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
            title: 'Cảnh báo',
            content: 'Xác nhận xóa vật tư nhập?.',
            confirmOk: 'Xác nhận',
            callbackOK: () => {
               handleDeleteSuppliesItem(suppliesItem.supplies_invoice_detail_id as string);
               remove(index);
            },
            isIcon: true,
         });
      }

      return remove(index);
   };

   useEffect(() => {
      if (errors.details) {
         return errorMessage('Vui lòng kiểm tra thông tin');
      }

      return;
   }, [errors]);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('stt', {
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
         }),
         columnHelper.accessor('code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name_detail', {
            header: () => <Box>Tên vật tư</Box>,
            cell: (info) => (
               <Box sx={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('distributor_name', {
            header: () => <Box>Nhà phân phối</Box>,
            cell: (info) => (
               <Box sx={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('unit', {
            header: () => <Box sx={{ textAlign: 'center' }}>Dv tính</Box>,
            cell: (info) => (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Chip label={info.getValue()} color="default" />
               </Box>
            ),
         }),
         columnHelper.accessor('quantity_received', {
            header: () => <Box sx={{ textAlign: 'center' }}>Số lượng</Box>,
            cell: ({ row }) => {
               return (
                  <Box
                     width={120}
                     display="flex"
                     justifyContent={isCheckStatusPayment ? 'center' : 'space-between'}
                     gap="6px"
                  >
                     {isCheckStatusPayment ? (
                        formatPrice(watch(`details.${row.index}.quantity_received`))
                     ) : (
                        <>
                           <ButtonAddQuantity onClick={() => handleIncrease(row.index)}>
                              <AddIcon sx={{ fontSize: '16px' }} />
                           </ButtonAddQuantity>

                           <Box display="flex" flex={1} justifyContent="center">
                              <ExtendInputBase
                                 sx={{
                                    '.css-yz9k0d-MuiInputBase-input': {
                                       textAlign: 'center !important',
                                    },
                                 }}
                                 value={watch(`details.${row.index}.quantity_received`)}
                                 disabled={isCheckStatusPayment}
                                 onChange={(e) =>
                                    setValue(`details.${row.index}.quantity_received`, Number(e.target.value))
                                 }
                                 onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    return (event.target.value = String(
                                       Number(event.target.value.replace(Regexs.integer, '')),
                                    ));
                                 }}
                              />
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
                        </>
                     )}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('cost_price', {
            header: () => <Box>Giá nhập</Box>,
            cell: ({ row }) => (
               <Box sx={{ maxWidth: '130px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {isCheckStatusPayment ? (
                     formatPrice(watch(`details.${row.index}.cost_price`))
                  ) : (
                     <>
                        <Box>đ</Box>
                        <ExtendInputBase
                           fullWidth
                           value={watch(`details.${row.index}.cost_price`)}
                           onChange={(e) => {
                              setValue(`details.${row.index}.cost_price`, Number(e.target.value));
                           }}
                           onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                              return (event.target.value = String(
                                 Number(event.target.value.replace(Regexs.integer, '')),
                              ));
                           }}
                        />
                     </>
                  )}
               </Box>
            ),
         }),
         columnHelper.accessor('selling_price', {
            header: () => <Box>Giá bán</Box>,
            cell: ({ row }) => (
               <Box sx={{ maxWidth: '130px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {isCheckStatusPayment ? (
                     formatPrice(watch(`details.${row.index}.selling_price`))
                  ) : (
                     <>
                        <Box>đ</Box>
                        <ExtendInputBase
                           fullWidth
                           value={watch(`details.${row.index}.selling_price`)}
                           onChange={(e) => {
                              setValue(`details.${row.index}.selling_price`, Number(e.target.value));
                           }}
                           onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                              return (event.target.value = String(
                                 Number(event.target.value.replace(Regexs.integer, '')),
                              ));
                           }}
                        />
                     </>
                  )}
               </Box>
            ),
         }),
         columnHelper.accessor('discount', {
            header: () => <Box>Giảm giá</Box>,
            cell: ({ row }) => (
               <Box sx={{ width: '50px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {isCheckStatusPayment ? (
                     watch(`details.${row.index}.discount`)
                  ) : (
                     <ExtendInputBase
                        fullWidth
                        sx={{
                           '.css-yz9k0d-MuiInputBase-input': {
                              textAlign: 'center !important',
                           },
                        }}
                        value={watch(`details.${row.index}.discount`)}
                        onChange={(e) => {
                           if (Number(e.target.value) < 0) {
                              return setValue(`details.${row.index}.discount`, 0);
                           }

                           if (Number(e.target.value) > 100) {
                              return setValue(`details.${row.index}.discount`, 100);
                           }

                           return setValue(`details.${row.index}.discount`, Number(e.target.value));
                        }}
                        onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                           return (event.target.value = String(Number(event.target.value.replace(Regexs.integer, ''))));
                        }}
                     />
                  )}
                  %
               </Box>
            ),
         }),
         columnHelper.accessor('total_price', {
            header: () => <Box>Tổng tiền</Box>,
            cell: ({ row }) => (
               <Box sx={{ maxWidth: '200px', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {formatPrice(
                     Number(watch(`details.${row.index}.cost_price`)) *
                        Number(watch(`details.${row.index}.quantity_received`)),
                  )}
               </Box>
            ),
         }),

         columnHelper.accessor('action', {
            header: () => <Box>Thao tác</Box>,
            cell: ({ row }) => (
               <Box
                  sx={{
                     maxWidth: '200px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     gap: 0.5,
                  }}
               >
                  <Button
                     sx={{ minWidth: 'auto', px: '6px' }}
                     color="error"
                     onClick={() => handleDeleteItem(row.index, row.original as Record<string, string | number>)}
                  >
                     <DeleteIcon sx={{ fontSize: '16px' }} />
                  </Button>
               </Box>
            ),
         }),
      ];
   }, [isCheckStatusPayment]);

   return (
      <>
         <Grid container spacing={2}>
            {isCheckStatusPayment ? (
               <></>
            ) : (
               <>
                  <SearchSupplies
                     columnVisibility={columnVisibility}
                     setColumnVisibility={setColumnVisibility}
                     form={form}
                  />
               </>
            )}
         </Grid>
         <TableCore
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            columns={columns as never}
            data={fields ?? []}
            isPagination={false}
            // height={470}
         />
      </>
   );
};

export default SuppliesInvoicesTable;

const ExtendInputBase = styled(InputBase)({
   '.css-yz9k0d-MuiInputBase-input': {
      padding: '0px',
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
