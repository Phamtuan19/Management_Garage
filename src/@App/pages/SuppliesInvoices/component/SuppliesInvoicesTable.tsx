/* eslint-disable @typescript-eslint/naming-convention */
import {
   Box,
   Button,
   ButtonBase,
   Grid,
   InputBase,
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
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import handlePrice from '@Core/Helper/hendlePrice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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
      width: '50px',
   },
   {
      id: 5,
      title: 'SL',
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

   const handleIncrease = (index: number) => {
      setValue(`details.${index}.quantity_received`, watch(`details.${index}.quantity_received`) + 1);
   };

   const handleReduced = (index: number) => {
      setValue(
         `details.${index}.quantity_received`,
         watch(`details.${index}.quantity_received`) <= 1 ? 1 : watch(`details.${index}.quantity_received`) - 1,
      );
   };

   return (
      <>
         <Grid container spacing={2}>
            <SearchSupplies form={form} />
         </Grid>

         <TableContainer sx={{ mt: 2 }}>
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
                           <Typography sx={{ fontSize: '16px' }}>{watch(`details.${index}.code`)}</Typography>
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
                        <TableCell align="right" sx={{ width: '130px' }}>
                           <Box display="flex" justifyContent="space-between" gap="6px">
                              <ButtonAddQuantity onClick={() => handleIncrease(index)}>
                                 <AddIcon sx={{ fontSize: '16px' }} />
                              </ButtonAddQuantity>
                              <Box display="flex" justifyContent="center">
                                 <ExtendInputBase value={watch(`details.${index}.quantity_received`)} />
                              </Box>
                              <ButtonAddQuantity
                                 sx={({ palette }) => ({
                                    bgcolor: palette.error.main,
                                 })}
                                 onClick={() => {
                                    handleReduced(index);
                                 }}
                              >
                                 <RemoveIcon sx={{ fontSize: '16px' }} />
                              </ButtonAddQuantity>
                           </Box>
                        </TableCell>
                        {/* Đơn giá */}
                        <TableCell align="right" sx={{ width: '130px' }}>
                           <ExtendInputBase
                              value={watch(`details.${index}.cost_price`)}
                              onChange={(e) => {
                                 setValue(`details.${index}.cost_price`, Number(e.target.value));
                              }}
                           />
                        </TableCell>

                        {/* Tổng tiền */}
                        <TableCell align="center" sx={{ width: '130px' }}>
                           <Typography>
                              {handlePrice(
                                 Number(watch(`details.${index}.cost_price`)) *
                                    Number(watch(`details.${index}.quantity_received`)),
                              )}
                           </Typography>
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

const ExtendInputBase = styled(InputBase)({
   '.css-yz9k0d-MuiInputBase-input': {
      padding: '0px',
      textAlign: 'center',
   },
});

const ButtonAddQuantity = styled(ButtonBase)(({ theme }) => ({
   backgroundColor: theme.palette.primary.main,
   color: theme.base.text.white,
   borderRadius: '6px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   padding: '4px',
}));

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
