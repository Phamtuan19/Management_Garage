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
import { Row, Table as TypeReactTable, flexRender } from '@tanstack/react-table';
import React from 'react';

interface TabelHeaderProps<T> {
   table: TypeReactTable<T>;
   isLoading: boolean;
   noData: React.ReactNode;
   onClickRow?: (e: Row<any>) => void;
   renderSubComponent?: (e: Row<any>) => React.ReactNode;
}

function CoreTableBody<T>(props: TabelHeaderProps<T>) {
   const { table, isLoading, noData, onClickRow, renderSubComponent } = props;

   const renderTableBody = () => {
      const { rows } = table && table.getRowModel();

      const allColumns = table.getAllColumns();

      if (isLoading) {
         return Array.from({ length: 10 }, (_, index) => index + 1).map((item) => {
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

      return rows.map((row) => {
         return (
            <React.Fragment key={row.id}>
               <StyledTableRow
                  sx={{
                     cursor: onClickRow ? 'pointer' : 'default',
                  }}
               >
                  {row.getVisibleCells().map((cell, index) => (
                     <StyledTableCell
                        key={index}
                        onClick={() => {
                           if (cell.column.id !== 'action') {
                              return onClickRow && onClickRow(row);
                           }
                        }}
                        sx={{ backgroundColor: row.getIsExpanded() ? '#dadada29' : 'transparent' }}
                     >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </StyledTableCell>
                  ))}
               </StyledTableRow>
               {renderSubComponent && row.getIsExpanded() && (
                  <StyledTableRow>
                     <StyledTableCell colSpan={row.getVisibleCells().length}>{renderSubComponent(row)}</StyledTableCell>
                  </StyledTableRow>
               )}
            </React.Fragment>
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
      padding: '12px 12px',
   },
}));

const StyledTableCell = styled(TableCell)(() => ({
   maxWidth: 600,
   whiteSpace: 'nowrap',
}));

export default CoreTableBody;
