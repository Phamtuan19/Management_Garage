/* eslint-disable @typescript-eslint/naming-convention */
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, ButtonBase, InputBase, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import handlePrice from '@Core/Helper/formatPrice';
import RemoveIcon from '@mui/icons-material/Remove';
import { CoreTableActionDelete } from '@Core/Component/Table/components/CoreTableAction';
import { useMutation } from '@tanstack/react-query';
import repairOrderDetailService from '@App/services/repairOrderDetail.service';
import { AxiosResponseData, HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import { FindRepairOrder } from '@App/services/repairorder.service';
import { STATUS_REPAIR_DETAIL, StatusRepairDetail } from '@App/configs/status-config';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';

import { RepairInvoiceSchema } from '../../utils/repair-invoice';

import ColumnSuppliesInvoicesCode from './ColumnSuppliesInvoicesCode';

interface TabRepairInvoiceSuppliesPropType {
   form: UseFormReturn<RepairInvoiceSchema>;
   // isLoading: boolean;
   // onSubmitForm: SubmitHandler<RepairInvoiceSchema>;
   fieldArray: UseFieldArrayReturn<RepairInvoiceSchema>;
   repairOrder?: FindRepairOrder;
   personnels:
      | {
           _id: string;
           full_name: string;
        }[]
      | undefined;
}

export interface SuppliesInvoiceItem {
   _id: string;
   supplies_detail_code: string;
   supplies_detail_id: string;
   supplies_detail_name: string;
   quantity: number;
   supplies_invoices_code: string;
   supplies_invoices_id: string;
   inventory: number;
   distributor_id: string;
   supplies_id: string;
   details:
      | Array<{
           name: string;
           describe: string;
           status: StatusRepairDetail;
           personnel_id: string;
           note: string;
        }>
      | [];
}

const TabRepairInvoiceSupplies = ({ form, fieldArray, personnels }: TabRepairInvoiceSuppliesPropType) => {
   const { control, watch } = form;
   const { id: repairOrderId } = useParams();
   const { remove } = fieldArray;
   const suppliesInvoices = watch('suppliesInvoice');
   // Tăng số lượng vật tư
   const handleIncrease = (index: number) => {
      const quantity = form.watch(`suppliesInvoice.${index}.quantity`) + 1;

      if (quantity > form.watch(`suppliesInvoice.${index}.inventory`)) {
         // return coreConfirm({
         //    icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         //    title: 'Cảnh báo',
         //    confirmOk: 'Xác nhận',
         //    content: 'Sản phẩm này trong lô hàng không đủ số lượng.',
         //    callbackOK: () => {},
         //    isIcon: true,
         // });
      }

      return form.setValue(`suppliesInvoice.${index}.quantity`, form.watch(`suppliesInvoice.${index}.quantity`) + 1);
   };

   // Giảm số lượng vật tư
   const handleReduced = (index: number) => {
      form.setValue(
         `suppliesInvoice.${index}.quantity`,
         form.watch(`suppliesInvoice.${index}.quantity`) <= 1 ? 1 : form.watch(`suppliesInvoice.${index}.quantity`) - 1,
      );
   };

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

   const handleDeleteItem = (supplies: SuppliesInvoiceItem, index: number) => {
      if (repairOrderId) {
         if (supplies._id) {
            handleDeleteRepairDetailsSupplies(supplies._id);
         }
      }

      return remove(index);
   };

   const dataStatus = [STATUS_REPAIR_DETAIL.complete, STATUS_REPAIR_DETAIL.empty, STATUS_REPAIR_DETAIL.check];

   const columnsService = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('supplies_detail_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã VT</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
      }),
      columnHelper.accessor('supplies_detail_name', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tên VT</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center', width: '180px' }}>{info.getValue()}</Box>,
      }),
      columnHelper.accessor('distributor_name', {
         header: () => <Box>Nhà phân phối</Box>,
         cell: (info) => {
            return <Box sx={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.getValue()}</Box>;
         },
      }),
      columnHelper.accessor('supplies_invoices_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã lô</Box>,
         cell: ({ row }) => {
            const supplies = row.original as SuppliesInvoiceItem;

            return (
               <Box sx={{ textAlign: 'center', width: '150px' }}>
                  <ColumnSuppliesInvoicesCode form={form} index={row.index} supplies={supplies} />
               </Box>
            );
         },
      }),
      columnHelper.accessor('inventory', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tồn kho</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>{form.watch(`suppliesInvoice.${row.index}.inventory`)}</Box>
         ),
      }),
      columnHelper.accessor('selling_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá</Box>,
         cell: ({ row }) => (
            <Box sx={{ textAlign: 'center' }}>
               {handlePrice(form.watch(`suppliesInvoice.${row.index}.selling_price`))}
            </Box>
         ),
      }),

      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>Số lượng</Box>,
         cell: ({ row }) => {
            const quantity = form.watch(`suppliesInvoice.${row.index}.quantity`);
            const inventory = form.watch(`suppliesInvoice.${row.index}.inventory`);

            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Box display="flex" width="100px" justifyContent="space-between" gap="6px">
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
      columnHelper.accessor('total_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tổng</Box>,
         cell: ({ row }) => {
            const quantity = form.watch(`suppliesInvoice.${row.index}.quantity`);
            const selling_price = form.watch(`suppliesInvoice.${row.index}.selling_price`);

            return <Box sx={{ textAlign: 'center' }}>{handlePrice(quantity * selling_price)}</Box>;
         },
      }),
      repairOrderId &&
         columnHelper.accessor('personnel_sc', {
            header: () => <Box>Nhân viên SC</Box>,
            cell: ({ row }) => {
               // const supplies = row.original as SuppliesInvoiceItem;
               return (
                  <Box sx={{ width: '240px' }}>
                     <ControllerAutoComplate
                        options={personnels ?? []}
                        valuePath="_id"
                        titlePath="full_name"
                        name={`suppliesInvoice.${row.index}.details.personnel_id`}
                        control={control}
                     />
                  </Box>
               );
            },
         }),
      repairOrderId &&
         columnHelper.accessor('status_supplies_invoice', {
            header: () => <Box>Trạng thái SC</Box>,
            cell: ({ row }) => {
               // const supplies = row.original as SuppliesInvoiceItem;
               return (
                  <Box sx={{ width: '170px' }}>
                     <ControllerAutoComplate
                        options={dataStatus ?? []}
                        valuePath="key"
                        titlePath="title"
                        name={`suppliesInvoice.${row.index}.details.status`}
                        control={control}
                     />
                  </Box>
               );
            },
         }),
      columnHelper.accessor('action', {
         header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
         cell: ({ row }) => {
            const supplies = row.original as SuppliesInvoiceItem;

            return (
               <Box display="flex" justifyContent="right" gap="6px">
                  <CoreTableActionDelete callback={() => handleDeleteItem(supplies, row.index)} />
               </Box>
            );
         },
      }),
   ].filter(Boolean);

   return (
      <>
         <TableCore
            height={340}
            columns={columnsService as never}
            data={suppliesInvoices}
            isPagination={false}
            noData="Chưa có vật tư sửa chữa."
         />
      </>
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

export default TabRepairInvoiceSupplies;
