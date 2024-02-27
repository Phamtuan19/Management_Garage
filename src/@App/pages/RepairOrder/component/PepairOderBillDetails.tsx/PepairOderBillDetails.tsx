/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import theme from '@Core/Theme';
import { Box, Typography, Stack, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import repairorderService from '@App/services/repairorder.service';
import { format } from 'date-fns';
const RepairOrderDetails = () => {
   const { id: repairorderId } = useParams();
   const { data: repairorder } = useQuery(['getRepairOrderDetails', repairorderId], async () => {
      const repairorderRes = await repairorderService.find(repairorderId as string);
      return repairorderRes.data;
   });
   const formDate = (dateString: string | undefined) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };
   const repairOrderDetails = [
      { label: 'Mã sửa chữa', value: repairorder?.code },
      { label: 'Kilometer', value: repairorder?.kilometer },
      { label: 'Ngày tạo', value: formDate(repairorder?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formDate(repairorder?.updatedAt) },
   ];

   return (
      <Box>
         {repairorder && (
            <Stack>
               <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                  {repairOrderDetails.map((detail: { label: string; value: string }, index: number) => {
                     return (
                        <Grid item key={index} xs={12}>
                           <DetailsItem label={detail.label} value={detail.value} />
                        </Grid>
                     );
                  })}
               </Box>
            </Stack>
         )}
      </Box>
   );
};
const DetailsItem = ({ label, value }: { label: string; value: string }) => (
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
         <Typography sx={{ p: 1, fontWeight: '700', fontSize: '1rem', color: theme.palette.grey[800] }}>
            {label}
         </Typography>
      </Grid>
      <Grid item xs={9}>
         <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem' }}>{value}</Typography>
         <Divider variant="inset" sx={{ m: 0 }} />
      </Grid>
   </Grid>
);
export default RepairOrderDetails;
