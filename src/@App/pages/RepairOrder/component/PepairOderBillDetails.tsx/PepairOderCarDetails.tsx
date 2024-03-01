/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import theme from '@Core/Theme';
import { Box, Typography, Stack, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { format } from 'date-fns';
import repairorderService from '@App/services/repairorder.service';

const RepairOrderDetails = () => {
   const { id: repairorderId } = useParams();

   // const navigate = useNavigate();
   const { data: repairorder } = useQuery(['getRepairOrderDetails', repairorderId], async () => {
      const repairorderRes = await repairorderService.find(repairorderId as string);
      return repairorderRes.data;
   });

   const formatDate = (dateString: string | number | Date) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };

   const car = [
      { label: 'Mã xe', value: repairorder?.car_id?.code },
      { label: 'Thương hiệu xe', value: repairorder?.car_id?.brand_car },
      { label: 'Biển số xe', value: repairorder?.car_id?.license_plate },
      { label: 'Năm sản xuất', value: repairorder?.car_id?.production_year },
      { label: 'Màu xe', value: repairorder?.car_id?.car_color },
      { label: 'Loại xe', value: repairorder?.car_id?.car_type },
      { label: 'Trạng thái', value: repairorder?.car_id?.status },
      { label: 'Ngày tạo', value: formatDate(repairorder?.car_id?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formatDate(repairorder?.car_id?.updatedAt) },
   ];

   return (
      <Box>
         {repairorder && (
            <Stack>
               <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                  {car.map((detail, index) => (
                     <Grid key={index}>
                        <DetailsItem label={detail.label} value={detail.value} />
                     </Grid>
                  ))}
               </Box>
            </Stack>
         )}
      </Box>
   );
};
const DetailsItem = ({ label, value }: { label: string; value: string }) => (
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
         <Typography sx={{ p: 1, fontSize: '1rem', color: theme.palette.grey[800] }}>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
         <Typography sx={{ p: 1, fontWeight: '500', flexGrow: 1, fontSize: '1rem', height: '40px' }}>
            {value}
         </Typography>
         <Divider variant="inset" sx={{ m: 0 }} />
      </Grid>
   </Grid>
);
export default RepairOrderDetails;
