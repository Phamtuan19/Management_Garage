/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useParams } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import {  useQuery } from '@tanstack/react-query';
import theme from '@Core/Theme';
import { Box, Typography, Stack, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { format } from 'date-fns';
import repairorderService from '@App/services/repairorder.service';

const breadcrumbs = [
  {
    title: 'Phiếu sửa chữa',
    link: ROUTE_PATH.REPAIR_ORDERS,
  },
];
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

  const repairOrderDetails = [
    { label: 'Mã sửa chữa', value: repairorder?.code },
    { label: 'Kilometer', value: repairorder?.kilometer },
    { label: 'Ngày tạo', value: repairorder?.createdAt },
    { label: 'Cập nhật lần cuối', value: repairorder?.updatedAt}
  ];

  const car = [
    { label: 'Mã xe', value: repairorder?.car_id?.code },
    { label: 'Thương hiệu xe', value: repairorder?.car_id?.brand_car },
    { label: 'Biển số xe', value: repairorder?.car_id?.license_plate },
    { label: 'Năm sản xuất', value: repairorder?.car_id?.production_year },
    { label: 'Màu xe', value: repairorder?.car_id?.car_color },
    { label: 'Loại xe', value: repairorder?.car_id?.car_type },
    { label: 'Trạng thái', value: repairorder?.car_id?.status },
    { label: 'Ngày tạo', value: formatDate(repairorder?.car_id?.createdAt) },
    { label: 'Ngày cập nhật cuối', value: formatDate(repairorder?.car_id?.updatedAt) }
  ];
  const service = [
    { label: 'Số lượng', value: repairorder?.services[0]?.quantity },
    { label: 'Giá', value: repairorder?.services[0]?.price },
    { label: 'Thu thêm', value: repairorder?.services[0]?.surcharge },
    { label: 'Giảm giá', value: repairorder?.services[0]?.discount },
    { label: 'Mô tả', value: repairorder?.services[0]?.describe },
    { label: 'Ngày tạo', value: formatDate(repairorder?.services[0]?.createdAt) },
    { label: 'Ngày cập nhật cuối', value: formatDate(repairorder?.services[0]?.updatedAt) }
  ];

  const supplie = [
    { label: 'Số lượng', value: repairorder?.supplies[0]?.quantity },
    { label: 'Giá', value: repairorder?.supplies[0]?.price },
    { label: 'Thu thêm', value: repairorder?.supplies[0]?.surcharge },
    { label: 'Giảm giá', value: repairorder?.supplies[0]?.discount },
    { label: 'Mô tả', value: repairorder?.supplies[0]?.describe },
    { label: 'Ngày tạo', value: formatDate(repairorder?.supplies[0]?.createdAt) },
    { label: 'Ngày cập nhật cuối', value: formatDate(repairorder?.supplies[0]?.updatedAt) }
  ];
  return (
    <Box>
      <BaseBreadcrumbs
        breadcrumbs={breadcrumbs}
        arialabel="Chi tiết phiếu sửa chữa"
        sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
       
        {repairorder && (
          <Stack>
            <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
              

              <Box>
                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                    <Typography
                      sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                    >
                      Thông tin phiếu sửa chữa
                    </Typography>
                  </Box>

                  {repairOrderDetails.map((detail: { label: string; value: string }, index: number) => {
                    return (
                      <Grid item key={index} xs={12}>
                        <DetailsItem label={detail.label} value={detail.value} />
                        
                      </Grid>
                    );
                  })}
                </Box>
                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                    <Typography
                      sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                    >
                      Thông tin xe
                    </Typography>
                  </Box>
                  
                  {car.map((detail, index) => (
                    <Grid key={index}>
                      <DetailsItem label={detail.label} value={detail.value} />
                    </Grid>
                  ))}
                </Box>
                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                    <Typography
                      sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                    >
                      Thông tin dịch vụ
                    </Typography>
                  </Box>
                  
                  {service.map((detail, index) => (
                    <Grid key={index}>
                      <DetailsItem label={detail.label} value={detail.value} />
                    </Grid>
                  ))}
                </Box>
                <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                  <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                    <Typography
                      sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                    >
                      Thông tin vật tư
                    </Typography>
                  </Box>
                  
                  {supplie.map((detail, index) => (
                    <Grid key={index}>
                      <DetailsItem label={detail.label} value={detail.value} />
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Box>
          </Stack>
        )}
      </BaseBreadcrumbs>
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
