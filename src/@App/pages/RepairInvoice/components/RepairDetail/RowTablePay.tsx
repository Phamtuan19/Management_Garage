/* eslint-disable @typescript-eslint/naming-convention */
import { DeliveryNoteDataDetailOption } from '@App/types/delivery';
import {
   Box,
   Chip,
   Collapse,
   IconButton,
   Table,
   TableBody,
   TableCell,
   TableRow,
   styled,
   tableCellClasses,
} from '@mui/material';
import React, { useState } from 'react';
import formatPrice from '@Core/Helper/formatPrice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function RowTablePay(props: {
   row: {
      name: string;
      unit: string;
      sl: number;
      price: number;
      discount: number;
      total_price: number;
      options?: DeliveryNoteDataDetailOption[];
   };
}) {
   const { row } = props;
   const [open, setOpen] = useState(false);

   return (
      <React.Fragment>
         <TableRow>
            <ExtendTableCell>
               {row.options && row.options?.length > 0 && (
                  <IconButton size="small" onClick={() => setOpen(!open)}>
                     {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
               )}
            </ExtendTableCell>
            <ExtendTableCell>
               <Box display="flex" gap={2}>
                  <Box>{row.name}</Box>
                  {row.options && <Chip label="Vật tư" color="warning" size="small" />}
               </Box>
            </ExtendTableCell>
            <ExtendTableCell>{row.unit}</ExtendTableCell>
            <ExtendTableCell align="center">{row.sl}</ExtendTableCell>
            <ExtendTableCell>{formatPrice(row.price)}</ExtendTableCell>
            <ExtendTableCell>{formatPrice((row.price * row.discount) / 100)}</ExtendTableCell>
            <ExtendTableCell>{formatPrice(row.total_price)}</ExtendTableCell>
         </TableRow>

         <TableRow>
            <TableCell style={{ padding: 0 }} colSpan={7}>
               <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ my: 1 }}>
                     <Table size="small">
                        <TableBody>
                           {row.options?.map((option) => (
                              <TableRow key={option._id}>
                                 <ExtendTableCell colSpan={1}></ExtendTableCell>
                                 <ExtendTableCell colSpan={1}></ExtendTableCell>
                                 <ExtendTableCell colSpan={1}></ExtendTableCell>
                                 <ExtendTableCell colSpan={1}>
                                    <Box display="flex" gap={1.5}>
                                       <Box>Mã Lô:</Box>
                                       <Box>#{option.supplies_invoice_code}</Box>
                                    </Box>
                                 </ExtendTableCell>
                                 <ExtendTableCell sx={{ textAlign: 'center' }} width={70}>
                                    {option.export_quantity}
                                 </ExtendTableCell>
                                 <ExtendTableCell width={140}>{formatPrice(option.selling_price)}</ExtendTableCell>
                                 <ExtendTableCell width={140}>
                                    {formatPrice((option.selling_price * option.discount) / 100)}
                                 </ExtendTableCell>
                                 <ExtendTableCell width={140}>{formatPrice(option.selling_price)}</ExtendTableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </Box>
               </Collapse>
            </TableCell>
         </TableRow>
      </React.Fragment>
   );
}

const ExtendTableCell = styled(TableCell)({
   padding: '12px 6px !important',
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F9F8FA',
   },
});

export default RowTablePay;
