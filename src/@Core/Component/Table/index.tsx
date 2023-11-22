import { Table, TableContainer, styled } from '@mui/material';
import { ColumnDef, createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import CoreTableBody from './components/CoreTableBody';
import CoreTableHeader from './components/CoreTableHeader';

interface TableCoreProps<TData, TValue> {
   data: TData[];
   columns: ColumnDef<TData, TValue>[];
}

export const columnHelper = createColumnHelper();

function TableCore<TData, TValue>(props: TableCoreProps<TData, TValue>) {
   const { data, columns } = props;

   const table = useReactTable({
      data: data,
      columns: columns,
      getCoreRowModel: getCoreRowModel(), //truy cập dữ liệu cơ bản của một hàng (row) trong bảng.
   });

   return (
      <CoreTableContainer>
         <Table sx={{ minWidth: 'max-content', width: '100%', height: '100%' }}>
            <CoreTableHeader table={table as any} />
            <CoreTableBody table={table} />
         </Table>
      </CoreTableContainer>
   );
}

const CoreTableContainer = styled(TableContainer)(({ theme }) => ({
   maxWidth: '100%',
   border: 'none',
   position: 'relative',
   margin: '12px 0px',
   display: 'flex',
   flexDirection: 'column',
   backgroundColor: theme.base.background.default,
}));

export default TableCore;
