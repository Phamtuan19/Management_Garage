/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Box, Typography, Stack, Button, Grid, Chip } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import carsService from '@App/services/cars.service';
import PageContent from '@App/component/customs/PageContent';
import { CAR_STATUS, CarStatusKeys, STATUS_REPAIR } from '@App/configs/status-config';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { useMemo, useRef } from 'react';
import { RepairOrdersResponse } from '@App/services/repairorder.service';
import { format } from 'date-fns';
import formatPrice from '@Core/Helper/formatPrice';

import ModalDetailRepairInvoice, { ModalDetailRepairInvoicePropsRef } from './ModalDetailRepairInvoice';

const breadcrumbs = [
   {
      title: 'Thông Tin Xe',
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

   const refModal = useRef<ModalDetailRepairInvoicePropsRef>(null);

   const customerDetails = [
      { label: 'Khách hàng', value: cars?.customer_id?.name, border: true },
      { label: 'Số điện thoại', value: cars?.customer_id?.phone, border: true },
      { label: 'Tên xe', value: cars?.name, border: true },
      { label: 'Màu xe', value: cars?.car_color, border: true },
      { label: 'Biển số xe', value: cars?.license_plate, border: true },
      { label: 'Năm sản xuất', value: cars?.production_year, border: true },
      { label: 'Thương hiệu xe', value: cars?.brand_car, border: true },
      { label: 'Loại xe', value: cars?.car_type, border: true },
      {
         label: 'Trạng thái',
         value: (
            <Chip
               label={cars?.status ? CAR_STATUS[cars.status as CarStatusKeys].title : CAR_STATUS.EMPTY.title}
               color={cars?.status ? CAR_STATUS[cars.status as CarStatusKeys].color : CAR_STATUS.EMPTY.color}
            />
         ),
         border: false,
      },
   ];
   const handleClickRow = (row: any) => {
      const data = row.original;
      refModal.current?.setId(data._id);
      refModal.current?.setOpen(true);
   };

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('STT', {
            header: 'STT',
            cell: ({ row }) => {
               return <Box>{row.index + 1}</Box>;
            },
         }),
         columnHelper.accessor('code', {
            header: () => <Box textAlign="center">Mã Phiếu</Box>,
            cell: (info) => {
               return <Box textAlign="center">#{info.getValue()} </Box>;
            },
         }),

         columnHelper.accessor('personnel_id.full_name', {
            header: () => <Box>NV Tạo</Box>,
            cell: (info) => {
               return <Box>{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('status', {
            header: () => <Box textAlign="center">Trạng thái</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return (
                  <Box display="flex" justifyContent="center" alignItems="center">
                     <Chip
                        label={STATUS_REPAIR[repairOrder.status]?.title}
                        color={STATUS_REPAIR[repairOrder.status]?.color}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('transactions_id.total_price', {
            header: () => <Box>Tổng tiền</Box>,
            cell: (info) => {
               return <Box>{formatPrice(info.getValue() ?? 0)} </Box>;
            },
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Ngày tạo</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{format(row.getValue('createdAt'), 'yyyy-MM-dd')}</Box>;
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel="Chi tiết nhà phân phối">
         <Box>
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action="UPDATE">
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
                  <Box sx={{ ml: '25px', mr: '25px' }}>
                     <Grid container spacing={1} columnSpacing={5}>
                        {customerDetails?.map((detail, index) => (
                           <Grid item xs={4} key={index}>
                              <Grid container spacing={1}>
                                 <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Typography
                                       sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}
                                    >
                                       {detail.label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={8}>
                                    <Typography
                                       sx={{
                                          p: 1,
                                          pb: 0,
                                          fontWeight: '500',
                                          flexGrow: 1,
                                          fontSize: '1rem',
                                          lineHeight: '2rem',
                                          minHeight: '40px',
                                       }}
                                    >
                                       {detail.value}
                                    </Typography>
                                    {detail.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                                 </Grid>
                              </Grid>
                           </Grid>
                        ))}
                     </Grid>
                  </Box>
               </Stack>
            )}
         </PageContent>

         <PageContent>
            <Box pb={1} borderBottom="1px solid #DADADA">
               <Typography variant="h3" fontSize={24}>
                  Dịch vụ & Vật tư sử dụng
               </Typography>
            </Box>
            <TableCore
               columns={columns}
               data={cars?.repair_invoices ?? []}
               isPagination={false}
               onClickRow={handleClickRow}
            />
         </PageContent>

         <ModalDetailRepairInvoice ref={refModal} />
      </BaseBreadcrumbs>
   );
};

export default CarsDetails;
