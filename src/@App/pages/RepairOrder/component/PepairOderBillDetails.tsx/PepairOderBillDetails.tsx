import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import { CAR_STATUS } from '@App/configs/status-config';
import { FindRepairOrder } from '@App/services/repairorder.service';
import hendleDateTime from '@Core/Helper/formatDateTime';
import theme from '@Core/Theme';
import { Typography, Grid, Chip, Box } from '@mui/material';
import { useMemo } from 'react';

const RepairOrderDetails = ({ repairorder }: { repairorder: FindRepairOrder | undefined }) => {
   const repairOrderDetails = useMemo(() => {
      return (
         (repairorder && [
            { label: 'Mã sửa chữa', value: '#' + repairorder?.code, border: true },
            { label: 'NV tạo', value: repairorder?.personnel.name, border: true },
            { label: 'Khách hàng', value: repairorder?.customer.name, border: true },
            { label: 'Sđt', value: repairorder?.customer.phone, border: true },
            { label: 'Email', value: repairorder?.customer.email, border: true },
            { label: 'Kilometer', value: repairorder?.kilometer, border: true },
            { label: 'Mã xe', value: repairorder?.car?.code, border: true },
            { label: 'Thương hiệu xe', value: repairorder?.car?.brand_car, border: true },
            { label: 'Biển số xe', value: repairorder?.car?.license_plate, border: true },
            { label: 'Năm sản xuất', value: repairorder?.car?.production_year, border: true },
            { label: 'Màu xe', value: repairorder?.car?.car_color, border: true },
            { label: 'Loại xe', value: repairorder?.car?.car_type, border: true },
            {
               label: 'Trạng thái xe',
               value: (
                  <Chip
                     label={CAR_STATUS[repairorder.car.status].title as string}
                     color={CAR_STATUS[repairorder.car.status].color}
                  />
               ),
               border: false,
            },
            { label: 'Ngày tạo phiếu', value: hendleDateTime(repairorder?.createdAt), border: true },
         ]) ||
         []
      );
   }, [repairorder]);
   return (
      <ScrollbarBase>
         <Grid container spacing={1} columnSpacing={4}>
            {repairorder &&
               repairOrderDetails.map((detail, index: number) => {
                  return (
                     <Grid item xs={6} key={index}>
                        <Grid container spacing={1}>
                           <Grid item xs={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <Typography
                                 sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}
                              >
                                 {detail.label}
                              </Typography>
                           </Grid>
                           <Grid item xs={9}>
                              <Typography
                                 sx={{
                                    p: 1,
                                    pb: 0,
                                    fontWeight: '500',
                                    flexGrow: 1,
                                    fontSize: '1rem',
                                    lineHeight: '2rem',
                                 }}
                              >
                                 {detail.value}
                              </Typography>
                              {detail.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                           </Grid>
                        </Grid>
                     </Grid>
                  );
               })}
         </Grid>
      </ScrollbarBase>
   );
};

export default RepairOrderDetails;
