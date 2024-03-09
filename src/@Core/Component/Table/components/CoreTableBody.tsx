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

import { Skeleton, TableBody, TableCell, TableRow, styled } from '@mui/material';
import { Table as TypeReactTable, flexRender } from '@tanstack/react-table';

interface TabelHeaderProps<T> {
   table: TypeReactTable<T>;
   isLoading: boolean;
   noData: React.ReactNode;
   onClickRow?: (e: any) => void;
}

function CoreTableBody<T>(props: TabelHeaderProps<T>) {
   const { table, isLoading, noData, onClickRow } = props;

   const renderTableBody = () => {
      const { rows } = table && table.getRowModel();

      const allColumns = table.getAllColumns();

      if (isLoading) {
         return Array.from({ length: 7 }, (_, index) => index + 1).map((item) => {
            return (
               <StyledTableRow key={item}>
                  {Array.from(
                     { length: Number(table.getHeaderGroups()[0].headers.length) },
                     (_, index) => index + 1,
                  ).map((index) => {
                     return (
                        <StyledTableCell key={index}>
                           <Skeleton variant="rectangular" width="100%" height={25} />
                        </StyledTableCell>
                     );
                  })}
               </StyledTableRow>
            );
         });
      }

      if (rows.length === 0) {
         return (
            <StyledTableRow>
               <StyledTableCell align="center" colSpan={allColumns.length} sx={{ py: 2 }}>
                  {noData ? noData : 'Không tìm thấy dữ liệu!'}
               </StyledTableCell>
            </StyledTableRow>
         );
      }

      return rows.map((row, index) => {
         return (
            <StyledTableRow
               key={index}
               onClick={() => {
                  const data = row.original;
                  return onClickRow && onClickRow(data);
               }}
               sx={{ cursor: onClickRow ? 'pointer' : 'default' }}
            >
               {row.getVisibleCells().map((cell, index) => (
                  <StyledTableCell key={index} {...{}}>
                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </StyledTableCell>
               ))}
            </StyledTableRow>
         );
      });
   };

   return <TableBody sx={{ height: '100%' }}>{renderTableBody()}</TableBody>;
}

const StyledTableRow = styled(TableRow)(() => ({
   // backgroundColor: '#FFFFF',
   '&:nth-of-type(odd)': {
      backgroundColor: '#FFFFFF',
   },
   '& .MuiTableCell-root': {
      padding: '6px 12px',
   },
}));

const StyledTableCell = styled(TableCell)(() => ({
   maxWidth: 600,
   whiteSpace: 'nowrap',
}));

export default CoreTableBody;
