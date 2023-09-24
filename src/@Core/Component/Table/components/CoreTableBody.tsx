import { Box, TableBody, TableCell, TableRow, styled } from '@mui/material';
import { Table as TypeReactTable, flexRender } from '@tanstack/react-table';

interface TabelHeaderProps<T> {
   table: TypeReactTable<T>;
   isLoading?: boolean;
}

function CoreTableBody<T>(props: TabelHeaderProps<T>) {
   const { table, isLoading } = props;

   const renderTableBody = () => {
      const { rows } = table.getRowModel();

      console.log(rows);
      const allColumns = table.getAllColumns();

      if (isLoading) {
      }

      if (rows.length === 0) {
      }

      return rows.map((row, index) => (
         <StyledTableRow key={index}>
            {row.getVisibleCells().map((cell, index) => (
               <StyledTableCell
                  key={index}
                  component="th"
                  {...{
                     style: {
                        width: cell.column.getSize(),
                     },
                  }}
               >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
               </StyledTableCell>
            ))}
         </StyledTableRow>
      ));
   };

   return <TableBody>{renderTableBody()}</TableBody>;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.base.table.background.default,
   },
   '& .MuiTableCell-root': {
      padding: '12px 14px',
   },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   maxWidth: 600,
   whiteSpace: 'nowrap',
}));

export default CoreTableBody;
