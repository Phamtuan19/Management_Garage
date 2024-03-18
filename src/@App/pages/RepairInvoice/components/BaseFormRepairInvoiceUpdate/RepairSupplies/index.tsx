/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, ButtonBase, Chip, InputBase, styled } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { useMemo, useState } from 'react';
// import { useParams } from 'react-router-dom';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete } from '@Core/Component/Table/components/CoreTableAction';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
   RepairInvoiceUpdateSchema,
   SuppliesInvoiceUpdateSchema,
} from '@App/pages/RepairInvoice/utils/repair-invoice-update';
import formatPrice from '@Core/Helper/formatPrice';
import { STATUS_DELIVERY, STATUS_REPAIR_DETAIL, StatusRepairDetail } from '@App/configs/status-config';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { UseQueryResult } from '@tanstack/react-query';
import { dataStatus } from '@App/pages/RepairInvoice/utils';

import RenderSubComponent from './RenderSubComponent';
import FilterSupplies from './FilterSupplies';

interface RepairSuppliesProps {
   form: UseFormReturn<RepairInvoiceUpdateSchema>;
   personnels: UseQueryResult<
      {
         _id: string;
         full_name: string;
      }[],
      unknown
   >;
}

const columnVisibilityData: Record<string, string> = {
   expand: 'Xem chi vt xuất kho',
   supplies_detail_code: 'Mã vật tư',
   supplies_detail_name: 'Tên vật tư',
   distributor_name: 'Nhà phân phối',
   inventory: 'tồn kho',
   price: 'Đơn giá',
   quantity: 'Số lượng',
   repair_staff_id: 'Nhân viên sửa chữa',
   status_repair: 'Trạng thái sửa chữa',
   status_supplies: 'Trạng thái Lấy vật tư',
   action: 'thao tác',
} as const;

const RepairSupplies = ({ form, personnels }: RepairSuppliesProps) => {
   const { watch, setValue, clearErrors, setError, control } = form;
   // const { id: repairOrderId } = useParams();

   const { fields, remove, append } = useFieldArray({
      name: 'suppliesInvoices',
      control: control,
   });

   const [columnVisibility, setColumnVisibility] = useState({
      expand: true,
      supplies_detail_code: true,
      supplies_detail_name: true,
      distributor_name: true,
      inventory: true,
      price: true,
      quantity: true,
      repair_staff_id: true,
      status_repair: true,
      status_supplies: true,
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
         columnHelper.accessor('expand', {
            header: '',
            cell: ({ row }) => {
               return (
                  <Box textAlign="center" width="25px" py={1}>
                     {row.getCanExpand() ? (
                        <Button
                           variant="text"
                           sx={{ p: '1px 2px', minWidth: 'auto' }}
                           {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: { cursor: 'pointer' },
                           }}
                        >
                           {row.getIsExpanded() ? '👇' : '👉'}
                        </Button>
                     ) : (
                        '🔵'
                     )}{' '}
                  </Box>
               );
            },
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
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('quantity', {
            header: () => <Box sx={{ textAlign: 'center', width: '100px' }}>Số lượng</Box>,
            cell: ({ row }) => {
               const supplies = row.original as SuppliesInvoiceUpdateSchema;

               const quantity = form.watch(`suppliesInvoices.${row.index}.quantity`);
               const inventory = form.watch(`suppliesInvoices.${row.index}.inventory`);

               return (
                  <Box sx={{ textAlign: 'center', width: '100px' }}>
                     <Box display="flex" justifyContent="space-between" gap="6px">
                        {supplies.status_repair !== STATUS_REPAIR_DETAIL.complete.key && (
                           <ButtonAddQuantity
                              disabled={quantity === inventory}
                              sx={{ bgcolor: quantity === inventory ? '#ccc' : '#1976d2' }}
                              onClick={() => handleIncrease(row.index)}
                           >
                              <AddIcon sx={{ fontSize: '16px' }} />
                           </ButtonAddQuantity>
                        )}
                        <Box display="flex" justifyContent="center">
                           <ExtendInputBase disabled value={quantity} />
                        </Box>
                        {supplies.status_repair !== STATUS_REPAIR_DETAIL.complete.key && (
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
                        )}
                     </Box>
                  </Box>
               );
            },
         }),
         columnHelper.accessor('repair_staff_id', {
            header: () => <Box>Nhân viên Sc</Box>,
            cell: (info) => {
               const supplies = info.row.original as SuppliesInvoiceUpdateSchema;

               const personnel = personnels?.data?.find((item) => item._id === info.getValue());

               return (
                  <Box sx={{ minWidth: 200 }}>
                     {supplies.status_repair !== STATUS_REPAIR_DETAIL.complete.key ? (
                        <ControllerAutoComplate
                           name={`suppliesInvoices.${info.row.index}.repair_staff_id`}
                           options={personnels?.data ?? []}
                           valuePath="_id"
                           titlePath="full_name"
                           control={control}
                           loading={personnels.isLoading}
                        />
                     ) : (
                        personnel?.full_name
                     )}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('status_repair', {
            header: () => <Box>Trạng thái Sc</Box>,
            cell: ({ row }) => {
               const supplies = row.original as SuppliesInvoiceUpdateSchema;

               const status: {
                  title: string;
                  color: string;
               } = supplies.status_repair
                  ? STATUS_REPAIR_DETAIL[supplies.status_repair as StatusRepairDetail]
                  : STATUS_REPAIR_DETAIL.empty;

               return (
                  <Box
                     textAlign={supplies.status_repair !== STATUS_REPAIR_DETAIL.complete.key ? 'center' : 'left'}
                     minWidth={170}
                  >
                     {supplies.status_repair !== STATUS_REPAIR_DETAIL.complete.key ? (
                        <ControllerAutoComplate
                           name={`suppliesInvoices.${row.index}.status_repair`}
                           options={dataStatus}
                           valuePath="key"
                           titlePath="title"
                           control={control}
                           loading={personnels.isLoading}
                           onChange={() => {
                              if (
                                 watch(`suppliesInvoices.${row.index}.status_repair`) !== STATUS_REPAIR_DETAIL.empty.key
                              ) {
                                 if (watch(`suppliesInvoices.${row.index}.repair_staff_id`) === '') {
                                    setError(`suppliesInvoices.${row.index}.repair_staff_id`, {
                                       message: 'Không được để trống',
                                    });
                                 }
                              } else {
                                 clearErrors(`suppliesInvoices.${row.index}.repair_staff_id`);
                              }
                           }}
                        />
                     ) : (
                        <Chip label={status.title} color={status.color as never} />
                     )}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('status_supplies', {
            header: () => <Box>Trạng thái lấy vt</Box>,
            cell: (info) => {
               const status: {
                  title: string;
                  color: string;
               } = info.getValue() ? STATUS_DELIVERY[info.getValue()] : STATUS_DELIVERY.empty;
               return (
                  <Box textAlign="center">
                     <Chip label={status.title} color={status.color as never} />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('action', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
            cell: ({ row }) => {
               const supplies = row.original as SuppliesInvoiceUpdateSchema;

               return (
                  <Box display="flex" justifyContent="right" gap="6px">
                     {supplies.status_repair !== STATUS_REPAIR_DETAIL.complete.key && (
                        <CoreTableActionDelete isConfirm={false} callback={() => remove(row.index)} />
                     )}
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
               getRowCanExpand={() => true}
               renderSubComponent={(row) => <RenderSubComponent row={row} />}
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
