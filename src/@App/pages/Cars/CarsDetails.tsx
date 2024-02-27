/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import carsService from '@App/services/cars.service';
import PageContent from '@App/component/customs/PageContent';
import hendleDateTime from '@Core/Helper/hendleDateTime';

const breadcrumbs = [
   {
      title: 'Dịch vụ sửa chữa xe',
      link: ROUTE_PATH.CARS,
   },
];

const CarsDetails = () => {
   const { id: carsId } = useParams();
   const navigate = useNavigate();
   const { data: cars } = useQuery(['getCarsDetails'], async () => {
      const res = await carsService.find(carsId as string);
      return res.data;
   });
   const customerDetails = [
      { label: 'Tên khách hàng', value: cars?.customer_id.name },
      { label: 'Số điện thoại', value: cars?.customer_id.phone },
      { label: 'Giới tính', value: cars?.customer_id.gender },
      { label: 'Ngày tạo', value: hendleDateTime(cars?.customer_id.createdAt) },
      { label: 'Ngày cập nhật cuối', value: hendleDateTime(cars?.customer_id.updatedAt) },
   ];

   const carDetails = [
      { label: 'Tên xe', value: cars?.name },
      { label: 'Thương hiệu xe', value: cars?.brand_car },
      { label: 'Biển số xe', value: cars?.license_plate },
      { label: 'Năm sản xuất', value: cars?.production_year },
      { label: 'Màu xe', value: cars?.car_color },
      { label: 'Loại xe', value: cars?.car_type },
      { label: 'Trạng thái', value: cars?.status },
      { label: 'Ngày tạo', value: hendleDateTime(cars?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: hendleDateTime(cars?.updatedAt) },
   ];

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Chi tiết nhà phân phối"
      >
         <Box >
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action="VIEW_ALL">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.CARS + '/' + carsId + '/update')}
                  endIcon={<RateReviewRoundedIcon />}
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>

            {cars && (
               <Stack>
                     <Box sx={{ml: '25px', mr: '25px'}}>
                        <Grid container spacing={2} >
                           <Grid item xs={12} >
                              <Typography
                                 sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin khách hàng
                              </Typography>
                           </Grid>

                           {customerDetails?.map((detail, index) => (
                              <>
                                 <Grid item xs={2} key={index}>
                                    <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>
                                       {detail.label}
                                    </Typography>
                                 </Grid >
                                 <Grid item xs={10}>
                                    <Typography sx={{ fontSize: '1rem', lineHeight: '32px', fontWeight: '500' }}>{detail.value}</Typography>
                                    <Divider variant="inset" sx={{ ml: 0 }} />
                                 </Grid>
                              </>
                           ))
                           }
                        </Grid>
                        <Grid container spacing={2} mt={3} >
                           <Grid item xs={12} >
                              <Typography
                                 sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin xe
                              </Typography>
                           </Grid>
                           {carDetails?.map((detail, index) => (
                              <>
                                 <Grid item xs={2} key={index}>
                                    <Typography sx={({ base }) => ({ fontSize: '1rem', color: base.color.text as string })}>
                                       {detail.label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={10}>
                                    <Typography sx={{ fontSize: '1rem', lineHeight: '32px', fontWeight: '500' }}>{detail.value}</Typography>
                                    <Divider variant="inset" sx={{ m: 0 }} />
                                 </Grid>
                              </>
                           ))
                           }
                        </Grid>
                     </Box>
               </Stack>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default CarsDetails;
