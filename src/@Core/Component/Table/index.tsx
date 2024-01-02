/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { Box, Pagination, Table, TableContainer, styled } from '@mui/material';
import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import CoreTableBody from './components/CoreTableBody';
import CoreTableHeader from './components/CoreTableHeader';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

interface TableCoreProps<TData, TValue> {
   data: TData[];
   columns: ColumnDef<TData, TValue>[];
   isLoading?: boolean;
   isPagination?: boolean;
   pageCount?: number;
   height?: number;
}

export const columnHelper = createColumnHelper();

function TableCore<TData, TValue>(props: TableCoreProps<TData, TValue>) {
   const { data, columns, isLoading = false, isPagination = true, pageCount = 1, height = 410 } = props;

   const table = useReactTable({
      data: data,
      columns: columns,
      getCoreRowModel: getCoreRowModel(), //truy cập dữ liệu cơ bản của một hàng (row) trong bảng.
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
               <CoreTableBody table={table} isLoading={isLoading} />
            </Table>
         </ScrollbarBase>

         {isPagination && (
            <Box
               sx={() => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  p: 1.5,
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #D1D5DB',
               })}
            >
               <Pagination onChange={(_, _page) => {}} count={pageCount} variant="outlined" shape="rounded" />
            </Box>
         )}
      </CoreTableContainer>
   );
}

const CoreTableContainer = styled(TableContainer)(() => ({
   maxWidth: '100%',
   position: 'relative',
   margin: '12px 0px',
   display: 'flex',
   flexDirection: 'column',
   // backgroundColor: theme.base.background.default,
   border: '1px solid #D1D5DB',
   borderRadius: '8px',
}));

export default TableCore;
