import { Box, TableCell, TableRow, Typography, styled, tableCellClasses } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import { Table, flexRender } from '@tanstack/react-table';
import React from 'react';

interface TabelHeaderProps<T> {
   table: Table<T>;
}

function CoreTableHeader<T>(props: TabelHeaderProps<T>): React.ReactElement {
   const { table } = props;
   return (
      <TableHead>
         {table.getHeaderGroups().map((headerGroup, index) => {
            return (
               <StyledTableRow key={index}>
                  {headerGroup.headers.map((header, index) => {
                     return (
                        <StyledTableCell key={index}>
                           {header.isPlaceholder ? null : (
                              <Box sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                                 <Typography
                                    component="h6"
                                    sx={{ fontWeight: 600, width: 'max-content', fontSize: '14px', p: 0 }}
                                 >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                 </Typography>
                              </Box>
                           )}
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
      padding: '12px 14px',
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
