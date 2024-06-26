/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/*
 * Created Date: 28-11-2023, 21:00 pm
 * Author: Phạm Anh tuấn
 * Email:
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */

import { Box, MenuItem, Pagination, Select, Table, TableContainer, styled } from '@mui/material';
import {
   type ColumnDef,
   createColumnHelper,
   getCoreRowModel,
   useReactTable,
   VisibilityState,
   getExpandedRowModel,
   Row,
} from '@tanstack/react-table';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import React from 'react';

import CoreTableBody from './components/CoreTableBody';
import CoreTableHeader from './components/CoreTableHeader';

interface TableCoreProps<TData = unknown[], TValue = never> {
   data: TData;
   columns: ColumnDef<TData, TValue>[];
   isLoading?: boolean;
   isPagination?: boolean;
   pageCount?: number;
   height?: number;
   limit?: number;
   page?: number;
   refetch?: any;
   total_page?: number;
   total_record?: number;
   noData?: React.ReactNode;
   onClickRow?: (e: Row<any>) => void;
   columnVisibility?: VisibilityState;
   onColumnVisibilityChange?: any;
   getRowCanExpand?: (row: Row<TData>) => boolean;
   renderSubComponent?: (e: Row<any>) => React.ReactNode;
}

export const columnHelper = createColumnHelper();

function TableCore<TData = unknown[], TValue = never>(props: TableCoreProps<TData, TValue>) {
   const {
      data,
      columns,
      isLoading,
      isPagination = true,
      height = 380,
      noData,
      onClickRow,
      columnVisibility,
      onColumnVisibilityChange,
      getRowCanExpand,
      renderSubComponent,
      ...dataPagination
   } = props;

   const { setParams } = useSearchParamsHook();

   const table = useReactTable({
      data: data as TData[],
      columns: columns,
      state: {
         columnVisibility: columnVisibility,
      },
      onColumnVisibilityChange: onColumnVisibilityChange,
      getCoreRowModel: getCoreRowModel(), //truy cập dữ liệu cơ bản của một hàng (row) trong bảng.
      getExpandedRowModel: getExpandedRowModel(),
      getRowCanExpand,
   });

   return (
      <CoreTableContainer
         sx={{ position: 'relative', height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}
      >
         <ScrollbarBase
            sx={{
               'body::-webkit-scrollbar-track': {
                  webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                  borderRadius: 10,
                  backgroundColor: '#F5F5F5',
               },
               width: '100%',
               flex: 1,
               height,
            }}
         >
            <Table
               stickyHeader
               aria-label="sticky table"
               sx={{ position: 'relative', minWidth: 'max-content', width: '100%', height: '100%', maxHeight: '600px' }}
               size="small"
            >
               <CoreTableHeader table={table as any} />
               <CoreTableBody
                  onClickRow={onClickRow}
                  renderSubComponent={renderSubComponent}
                  table={table}
                  isLoading={isLoading ?? false}
                  noData={noData}
               />
            </Table>
         </ScrollbarBase>

         {isPagination && (
            <Box
               sx={() => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 1.5,
                  py: 1,
                  gap: 4,
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #D1D5DB',
               })}
            >
               <Box sx={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Box component="span">Hiển thị</Box>
                  <Box component="span">{(Array.isArray(data) && (data.length as any)) || 1} </Box>
                  <Box component="span">trên</Box>
                  <Box component="span">{dataPagination.total_record}</Box>
                  <Box component="span">bản ghi</Box>
               </Box>

               <Box display="flex" alignItems="center" gap={4}>
                  <Box display="flex" gap="12px" alignItems="center">
                     <Box component="span" fontSize="14px">
                        Bản ghi trên mỗi trang
                     </Box>
                     <Select
                        sx={{ width: 70, borderRadius: '12px', fontSize: '14px' }}
                        size="small"
                        variant="outlined"
                        value={Number(dataPagination.limit) || 10}
                        onChange={(e) => {
                           setParams('limit', e.target.value);
                        }}
                     >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                     </Select>
                  </Box>
                  <Box display="flex" gap="12px" alignItems="center">
                     <Box component="span" fontSize="14px">
                        Trang {dataPagination.page} trên {dataPagination.total_page ?? 1}
                     </Box>
                     <Pagination
                        variant="outlined"
                        onChange={(_, page) => setParams('page', String(page))}
                        count={dataPagination.total_page ?? 1}
                        page={dataPagination.page}
                        siblingCount={1}
                     />
                  </Box>
               </Box>
            </Box>
         )}
      </CoreTableContainer>
   );
}

const CoreTableContainer = styled(TableContainer)(() => ({
   maxWidth: '100%',
   position: 'relative',
   margin: '12px 0px 0px',
   display: 'flex',
   flexDirection: 'column',
   // backgroundColor: theme.base.background.default,
   border: '1px solid #D1D5DB',
   borderRadius: '8px',
}));

export default TableCore;
