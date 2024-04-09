/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import ROUTE_PATH from '@App/configs/router-path';
import { CAR_STATUS } from '@App/configs/status-config';
import customerService from '@App/services/customer.service';
import { IMaterialsCatalog } from '@App/services/materialsCatalog.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const breadcrumbs = [
   {
      title: 'Danh sách khách hàng',
      link: ROUTE_PATH.CUSTOMERS,
   },
];

const CustomerDetail = () => {
   const { id: customerId } = useParams();

   const { data: customer, isLoading } = useQuery(['getCustomer', customerId], async () => {
      const res = await customerService.find(customerId as string);
      return res.data;
   });

   const dataRender = [
      {
         label: 'Tên khách hàng:',
         value: customer?.name as string,
      },
      {
         label: 'Giới tính:',
         value: customer?.gender as string,
      },
      {
         label: 'Email:',
         value: customer?.email as string,
      },
      {
         label: 'Số điện thoại:',
         value: customer?.phone as string,
      },
   ];

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('code', {
            header: 'Mã',
         }),
         columnHelper.accessor('name', {
            header: 'Tên khách hàng',
         }),
         columnHelper.accessor('car_color', {
            header: 'Màu xe',
         }),
         columnHelper.accessor('car_type', {
            header: 'Loại xe',
         }),
         columnHelper.accessor('license_plate', {
            header: 'Biển số',
         }),
         columnHelper.accessor('production_year', {
            header: 'Năm sản xuất',
         }),
         columnHelper.accessor('status', {
            header: 'Trạng thái',
            cell: ({ row }) => {
               const car = row.original as IMaterialsCatalog;
               return <Chip label={CAR_STATUS[car.status].title} color={CAR_STATUS[car.status].color} />;
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách khách hàng" breadcrumbs={breadcrumbs}>
         <PageContent>
            {customer && (
               <Grid container spacing={2}>
                  {dataRender.map((item, index) => {
                     return (
                        <Grid item xs={6} key={index}>
                           <Grid container spacing={1}>
                              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                 <ControllerLabel title={item.label} />
                              </Grid>
                              <Grid item xs={8}>
                                 <Typography
                                    sx={{
                                       p: 1,
                                       pb: 0,
                                       fontWeight: '500',
                                       flexGrow: 1,
                                       fontSize: '1rem',
                                       minHeight: '24px',
                                       lineHeight: '1.5rem',
                                    }}
                                 >
                                    {item.value}
                                 </Typography>
                                 <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
                              </Grid>
                           </Grid>
                        </Grid>
                     );
                  })}
               </Grid>
            )}
         </PageContent>
         <PageContent>
            <TableCore
               columns={columns as never}
               data={(customer?.cars as never) || []}
               isPagination={false}
               isLoading={isLoading}
            />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default CustomerDetail;
