/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
   Box,
   Stack,
   TableContainer,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
   Table,
   Paper,
   Typography,
} from '@mui/material';
import repairorderService from '@App/services/repairorder.service';
import theme from '@Core/Theme';

const RepairOrderDetails = () => {
   const { id: repairorderId } = useParams();
   const { data: repairorder } = useQuery(['getRepairOrderDetails', repairorderId], async () => {
      const repairorderRes = await repairorderService.find(repairorderId as string);
      return repairorderRes.data;
   });

   const service = [
      { label: 'Số lượng', value: 'quantity' },
      { label: 'Giá', value: 'price' },
      { label: 'Thu thêm', value: 'surcharge' },
      { label: 'Giảm giá', value: 'discount' },
      { label: 'Mô tả', value: 'describe' },
   ];
   return (
      <Box>
         {repairorder && (
            <Stack>
               <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                     <Typography sx={{ fontWeight: '500', fontSize: '1.5rem', color: theme.palette.grey[800] }}>
                        Thông tin dịch vụ
                     </Typography>
                  </Box>
                  <TableContainer component={Paper}>
                     <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ background: theme.palette.grey[200] }}>
                           <TableRow>
                              {service.map((detail: { label: string; value: string }, index: number) => (
                                 <TableCell key={index} align="center" sx={{ p: 1 }}>
                                    {detail.label}
                                 </TableCell>
                              ))}
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {repairorder?.services.map((detailObject: string, rowIndex: number) => (
                              <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                 {service.map((detail: { label: string; value: string }, colIndex: number) => (
                                    <TableCell key={colIndex} align="center" sx={{ p: 1 }}>
                                       {detailObject[detail.value]}
                                    </TableCell>
                                 ))}
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Box>
            </Stack>
         )}
      </Box>
   );
};
export default RepairOrderDetails;
