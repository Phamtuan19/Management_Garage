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

import { TableCell, TableRow, styled, tableCellClasses } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { Table, flexRender } from '@tanstack/react-table';
import React from 'react';

interface TabelHeaderProps<T> {
   table: Table<T>;
}

function CoreTableHeader<T>(props: TabelHeaderProps<T>): React.ReactElement {
   const { table } = props;
   return (
      <TableHead sx={{ position: 'sticky', top: 0, left: 0, width: '100%', zIndex: 1 }}>
         {table.getHeaderGroups().map((headerGroup) => {
            return (
               <StyledTableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                     return (
                        <StyledTableCell key={header.id}>
                           {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                        </StyledTableCell>
                     );
                  })}
               </StyledTableRow>
            );
         })}
      </TableHead>
   );
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.base.background.default,
   },
   '& .MuiTableCell-root': {
      padding: '6px 14px',
   },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#FFF',
      color: theme.base.text.main,
      fontSize: '14px',
      padding: '12px',
      position: 'relative',
      zIndex: 1,
   },
}));

export default React.memo(CoreTableHeader);
