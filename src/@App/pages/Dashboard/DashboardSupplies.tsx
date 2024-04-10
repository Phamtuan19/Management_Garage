/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dashboardService from '@App/services/dashboard-service';
import formatPrice from '@Core/Helper/formatPrice';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { useMemo } from 'react';
import Calendar from '@App/component/common/Calendar';
import TableCore, { columnHelper } from '@Core/Component/Table';

import DoashboardPrice from './component/DoashboardPrice';
import BarChart from './component/BarChart';

const DashboardSupplies = () => {
   const { searchParams } = useSearchParamsHook();

   const { data: dashboardSupplies } = useQuery(['getDashboardSupplies'], async () => {
      const res = await dashboardService.getDashboardSupplies();
      return res.data;
   });

   const { data: exportTop5 } = useQuery(
      ['getDashboardSuppliesExportTopFive', searchParams['start_date'], searchParams['end_date']],
      async () => {
         const res = await dashboardService.getDashboardSuppliesExportTopFive({
            start_date: searchParams['start_date'],
            end_date: searchParams['end_date'],
         });

         return res.data[0];
      },
   );

   const { data: exportTop } = useQuery(
      ['getDashboardCarTop', searchParams['start_date_top'], searchParams['end_date_top']],
      async () => {
         const res = await dashboardService.getDashboardCarTop({
            start_date: searchParams['start_date_top'],
            end_date: searchParams['end_date_top'],
         });

         return res.data;
      },
   );

   const dataCategorySt = [
      {
         bgColor: 'rgba(73, 70, 242, 0.20)',
         bdColor: '#4946F2',
         title: 'Tổng vật tư',
         data: dashboardSupplies?.count_supplie_details || 0,
         icon: <ConstructionRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
      {
         bgColor: 'rgba(0, 170, 85, 0.20)',
         bdColor: '#00AA55',
         title: 'Tồn kho',
         data: dashboardSupplies?.count_supplie_solid || 0,
         icon: <ConstructionRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
      {
         bgColor: 'rgba(0, 170, 85, 0.20)',
         bdColor: '#00AA55',
         title: 'Số lượng đã bán',
         data: dashboardSupplies?.count_supplie_complete || 0,
         icon: <ConstructionRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },

      {
         bgColor: 'rgba(32, 139, 255, 0.20)',
         bdColor: '#208BFF',
         title: 'Tổng tiền bán vật tư',
         data: formatPrice((dashboardSupplies?.total_price_export as number) || 0),
         icon: <ConstructionRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
   ];

   const dataTop = useMemo(() => {
      return [
         {
            name: exportTop5?.top1?.name_detail || ' ',
            value: exportTop5?.top1?.quantity || 1,
         },
         {
            name: exportTop5?.top2?.name_detail || ' ',
            value: exportTop5?.top2?.quantity || 2,
         },
         {
            name: exportTop5?.top3?.name_detail || ' ',
            value: exportTop5?.top3?.quantity || 3,
         },
         {
            name: exportTop5?.top4?.name_detail || ' ',
            value: exportTop5?.top4?.quantity || 4,
         },
         {
            name: exportTop5?.top6?.name_detail || ' ',
            value: exportTop5?.top6?.quantity || 5,
         },
         {
            name: 'Khác',
            value: exportTop5?.others || 0,
         },
      ];
   }, [exportTop5]);

   const dataBarChartService = {
      title: 'Top 5 Vật tư có doanh thu cao nhất',
      subtext: 'Dịch vụ',
      data: dataTop,
   };

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index: number) => index + 1, {
            id: 'STT',
            header: () => <Box textAlign="center">STT</Box>,
            cell: ({ getValue }) => {
               return <Box textAlign="center">{getValue()}</Box>;
            },
         }),
         columnHelper.accessor('name', {
            header: () => <Box textAlign="center">Tên xe</Box>,
            cell: (info) => {
               return <Box textAlign="center">#{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('license_plate', {
            header: () => <Box textAlign="center">Biển số xe</Box>,
            cell: (info) => {
               return (
                  <Box maxWidth={150} textOverflow="ellipsis" overflow="hidden">
                     {info.getValue()}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('brand_car', {
            header: () => <Box textAlign="center">Thương hiệu</Box>,
            cell: (info) => {
               return <Box textAlign="center">#{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('total_repair_invoice', {
            header: () => <Box textAlign="center">Số lần sửa chữa</Box>,
            cell: (info) => {
               return <Box textAlign="center">{info.getValue()} </Box>;
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Thống kê vật tư">
         <PageContent>
            <Grid container spacing={2}>
               {dataCategorySt.map((item, index) => (
                  <Grid item xs={3} key={index}>
                     <DoashboardPrice {...item} />
                  </Grid>
               ))}

               <Grid item xs={5}>
                  <BarChart {...dataBarChartService} />
               </Grid>
               <Grid item xs={7}>
                  <Box mt={3}>
                     <Calendar nameStart="start_date_top" nameEnd="end_date_top" isReset={true} />
                     <TableCore columns={columns as never} data={exportTop ?? []} height={450} isPagination={false} />
                     <Typography fontSize={22} mt={2} fontWeight={600}>
                        Top 10 Xe sửa chữa nhiều nhất
                     </Typography>
                  </Box>
               </Grid>
            </Grid>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default DashboardSupplies;
