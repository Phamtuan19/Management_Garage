/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {
   Autocomplete,
   Box,
   Button,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
   styled,
   tableCellClasses,
} from '@mui/material';
import { Control, FieldValues, UseFormReturn, useFieldArray } from 'react-hook-form';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useQuery } from '@tanstack/react-query';
import suppliesService from '@App/services/supplies.service';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import distributorService from '@App/services/distributor.service';
import { useState } from 'react';

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
   },
];

const SuppliesInvoicesTable = ({ form }: { form: UseFormReturn<SuppliesInvoicesSchema> }) => {
   const { control } = form;
   const [valueDistributor, setValueDistributor] = useState<{ _id: string; label: string } | null>(null);

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'details',
   });

   const { data: supplies } = useQuery(['getAllSupplies'], async () => {
      const res = await suppliesService.getAllSupplies();
      return res.data;
   });

   const { data: distributors } = useQuery(['getAllDistributor'], async () => {
      const res = await distributorService.getAllField();

      return res.data.map((item) => ({ label: item.name, _id: item._id }));
   });

   return (
      <>
         <Box display="flex" gap="12px">
            <SearchSupplies supplies={supplies ?? []} />
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
                           #{index + 1}
                        </TableCell>
                        {/* Tên vật tư */}
                        <TableCell>
                           {/* <ControllerTextField name={`details.${index}.supplies_detail_id`} control={control} /> */}
                           <ControllerSelect
                              options={(supplies as any) || []}
                              name={`details.${index}.supplies_detail_id`}
                              valuePath="_id"
                              titlePath="name"
                              control={control as unknown as Control<FieldValues>}
                           />
                        </TableCell>
                        {/* Đơn vị tính */}
                        <TableCell align="right" sx={{ width: '100px' }}>
                           <TextField variant="standard" value={''} disabled />
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
                        <TableCell align="right" sx={{ width: '130px' }}>
                           <TextField variant="standard" value={'0'} disabled sx={{ color: 'black !important' }} />
                        </TableCell>
                        <TableCell align="right">
                           <Box display="flex" gap="12px">
                              <Button
                                 sx={{ minWidth: 'auto', px: '6px' }}
                                 onClick={() =>
                                    append({
                                       supplies_detail_id: '',
                                       quantity_received: '',
                                       cost_price: '0',
                                       selling_price: '0',
                                       describe: '',
                                    })
                                 }
                              >
                                 <AddRoundedIcon sx={{ fontSize: '16px' }} />
                              </Button>
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
