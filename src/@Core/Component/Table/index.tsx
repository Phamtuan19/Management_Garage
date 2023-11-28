import { Box, Pagination, Table, TableContainer, styled } from '@mui/material';
import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import CoreTableBody from './components/CoreTableBody';
import CoreTableHeader from './components/CoreTableHeader';
import { useState } from 'react';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

interface TableCoreProps<TData, TValue> {
   data: TData[];
   columns: ColumnDef<TData, TValue>[];
   isLoading?: boolean;
   isPagination?: boolean;
   pageCount?: number;
}

export const columnHelper = createColumnHelper();

function TableCore<TData, TValue>(props: TableCoreProps<TData, TValue>) {
   const { data, columns, isLoading = false, isPagination = true, pageCount = 1 } = props;

   const table = useReactTable({
      data: data,
      columns: columns,
      getCoreRowModel: getCoreRowModel(), //truy cập dữ liệu cơ bản của một hàng (row) trong bảng.
   });

   return (
      <CoreTableContainer sx={{ height: '460px' }}>
         <ScrollbarBase
            sx={{
               'body::-webkit-scrollbar-track': {
                  webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                  borderRadius: 10,
                  backgroundColor: '#F5F5F5',
               },
               flex: 1,
               height: '100%',
            }}
         >
            <Table stickyHeader sx={{ minWidth: 'max-content', width: '100%' }} size="small">
               <CoreTableHeader table={table as any} />
               <CoreTableBody table={table} isLoading={isLoading} />
            </Table>
         </ScrollbarBase>

         {isPagination && (
            <Box
               sx={({}) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  p: 1.5,
                  backgroundColor: '#FFFFFF',
               })}
            >
               <Pagination onChange={(_, page) => {}} count={pageCount} variant="outlined" shape="rounded" />
            </Box>
         )}
      </CoreTableContainer>
   );
}

const CoreTableContainer = styled(TableContainer)(({ theme }) => ({
   maxWidth: '100%',
   position: 'relative',
   margin: '12px 0px',
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: theme.base.background.default,
   border: '1px solid #D1D5DB',
   borderRadius: '8px',
}));

export default TableCore;
