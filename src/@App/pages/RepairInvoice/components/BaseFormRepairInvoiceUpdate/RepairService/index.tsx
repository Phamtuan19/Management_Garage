/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionDelete } from '@Core/Component/Table/components/CoreTableAction';
import formatPrice from '@Core/Helper/formatPrice';
import {
   RepairInvoiceUpdateSchema,
   RepairServiceUpdateSchema,
} from '@App/pages/RepairInvoice/utils/repair-invoice-update';
import { Row } from '@tanstack/react-table';
import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';
import { useMutation } from '@tanstack/react-query';
import repairInvoiceService from '@App/services/repair-invoice';
import { AxiosResponseData } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';

import RenderSubComponent from './RenderSubComponent';
import FilterService from './FilterService';

interface RepairServiceProps {
   form: UseFormReturn<RepairInvoiceUpdateSchema>;
   repairInvoice: ResponseFindOneRepairInvoice | undefined;
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

const RepairService = ({ form }: RepairServiceProps) => {
   const { watch, control } = form;

   const { fields, append, remove } = useFieldArray({
      name: 'repairService',
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

   const coreConfirm = useConfirm();

   const { mutate: deleteRepairInvoiceDetail } = useMutation({
      mutationFn: async (id: string) => {
         return await repairInvoiceService.delete(id);
      },
      onSuccess: (data: AxiosResponseData) => {
         successMessage(data.message);
         return data;
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const handleRemoveFieldItem = (id: string, index: number) => {
      coreConfirm({
         icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         title: 'Cảnh báo',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận xóa dịch vụ sửa chữa',
         callbackOK: () => {
            deleteRepairInvoiceDetail(id);

            if (fields.length === 1) {
               return form.setValue('repairService', []);
            }
            return remove(index);
         },
         isIcon: true,
      });
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
                     )}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('repair_service_code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã Dv</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('repair_service_name', {
            header: () => <Box>Tên Dv</Box>,
            cell: (info) => (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('repair_service_category_name', {
            header: () => <Box>Danh mục</Box>,
            cell: (info) => (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '300px' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('price', {
            header: () => <Box>Đơn giá</Box>,
            cell: (info) => {
               return <Box>{formatPrice(info.getValue())}</Box>;
            },
         }),
         columnHelper.accessor('discount', {
            header: () => <Box>Giá Km</Box>,
            cell: (info) => <Box>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('total_price', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thành tiền</Box>,
            cell: ({ row }) => {
               const price = watch(`repairService.${row.index}.price`);
               const discount = watch(`repairService.${row.index}.discount`);

               const total_price = price - discount;

               return <Box sx={{ textAlign: 'center' }}>{formatPrice(total_price)}</Box>;
            },
         }),
         columnHelper.accessor('action', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
            cell: ({ row }) => {
               const data = row.original as RepairServiceUpdateSchema;

               return (
                  <Box display="flex" justifyContent="right" gap="6px" px={1}>
                     <PermissionAccessRoute action="UPDATE" module="DELIVERY">
                        {data.status_repair !== STATUS_REPAIR_DETAIL.complete.key && (
                           <CoreTableActionDelete
                              isConfirm={false}
                              callback={() => {
                                 handleRemoveFieldItem(data._id, row.index);
                              }}
                           />
                        )}
                     </PermissionAccessRoute>
                  </Box>
               );
            },
         }),
      ];
   }, [fields]);

   return (
      <Box>
         <FilterService
            append={append as never}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            form={form}
            columnVisibilityData={columnVisibilityData}
         />
         <TableCore
            height={470}
            columns={columnsService as never}
            data={fields}
            isPagination={false}
            noData="Chưa có dịch vụ sửa chữa."
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
            getRowCanExpand={() => true}
            renderSubComponent={(row: Row<RepairServiceUpdateSchema>) => <RenderSubComponent form={form} row={row} />}
         />
      </Box>
   );
};

export default RepairService;
