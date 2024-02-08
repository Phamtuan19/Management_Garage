/* eslint-disable @typescript-eslint/naming-convention */
import {
   Box,
   Button,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
   styled,
   tableCellClasses,
} from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

import SearchSupplies from './SearchSupplies';

const headerConfig = [
   {
      width: '50px',
      id: 1,
      title: 'STT',
      align: 'center',
   },
   {
      id: 2,
      title: 'Mã VT',
      align: 'center',
   },
   {
      id: 3,
      title: 'Tên vật tư',
      align: 'left',
   },
   {
      id: 4,
      title: 'ĐVT',
      align: 'center',
   },
   {
      id: 5,
      title: 'Số lượng',
      align: 'center',
   },
   {
      id: 6,
      title: 'Đơn giá',
      align: 'center',
   },

   {
      id: 7,
      title: 'Thành tiền',
      align: 'center',
   },
   {
      id: 8,
      title: '',
      align: 'center',
      width: '70px',
   },
];

const SuppliesInvoicesTable = ({ form }: { form: UseFormReturn<SuppliesInvoicesSchema> }) => {
   const { control, watch, setValue } = form;

   const { fields, remove } = useFieldArray({
      control,
      name: 'details',
   });

   return (
      <>
         <Box display="flex" gap="12px">
            <SearchSupplies watch={watch} setValue={setValue} />
         </Box>

         <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <StyledTableRow>
                     {headerConfig.map((item) => {
                        return (
                           <StyledTableCell
                              width={item.width}
                              align={item.align as 'center' | 'left' | 'right' | 'inherit' | 'justify'}
                              key={item.id}
                           >
                              {item.title}
                           </StyledTableCell>
                        );
                     })}
                  </StyledTableRow>
               </TableHead>
               <TableBody>
                  {fields.map((field, index) => (
                     <TableRow key={field.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" align="center">
                           {index + 1}
                        </TableCell>

                        {/* Mã vật tư */}
                        <TableCell width="100px" align="center">
                           <Typography sx={{ fontSize: '12px' }}>{watch(`details.${index}.code`)}</Typography>
                        </TableCell>

                        {/* Tên vật tư */}
                        <TableCell>
                           {/* <ControllerTextField name={`details.${index}.supplies_detail_id`} control={control} /> */}
                           <Typography sx={{ fontSize: '16px' }}>{watch(`details.${index}.name_detail`)}</Typography>
                        </TableCell>
                        {/* Đơn vị tính */}
                        <TableCell align="center" sx={{ width: '100px' }}>
                           <Typography>{watch(`details.${index}.unit`)}</Typography>
                        </TableCell>
                        {/* Số lượng */}
                        <TableCell align="right" sx={{ width: '100px' }}>
                           <ControllerTextField
                              variant="standard"
                              name={`details.${index}.quantity_received`}
                              control={control}
                           />
                           {/* Số lượng */}
                        </TableCell>
                        {/* Đơn giá */}
                        <TableCell align="right" sx={{ width: '130px' }}>
                           <ControllerTextField
                              variant="standard"
                              name={`details.${index}.cost_price`}
                              control={control}
                           />
                        </TableCell>
                        {/* Tổng tiền */}
                        <TableCell align="center" sx={{ width: '130px' }}>
                           <Typography>0</Typography>
                        </TableCell>
                        <TableCell align="right">
                           <Box display="flex" gap="12px">
                              <Button sx={{ minWidth: 'auto', px: '6px' }} color="error" onClick={() => remove(index)}>
                                 <DeleteOutlineRoundedIcon sx={{ fontSize: '16px' }} />
                              </Button>
                           </Box>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      </>
   );
};

export default SuppliesInvoicesTable;

const StyledTableRow = styled(TableRow)(() => ({
   '&:nth-of-type(odd)': {
      backgroundColor: '#fffbfb80',
   },
   '& .MuiTableCell-root': {
      padding: '6px 14px',
   },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      // backgroundColor: 'rgb(240, 240, 240)',
      color: theme.base.text.main,
      fontSize: '14px',
      padding: '8px 12px',
      position: 'relative',
      zIndex: 1,
   },
}));
