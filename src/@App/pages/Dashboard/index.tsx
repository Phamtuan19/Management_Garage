/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { Grid } from '@mui/material';
import formatPrice from '@Core/Helper/formatPrice';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import { useQuery } from '@tanstack/react-query';
import dashboardService from '@App/services/dashboard-service';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import DoashboardPrice from './component/DoashboardPrice';
import AxisAlignWithTick from './component/AxisAlignWithTick';
// import BarChart from './component/BarChart';

const Doashboard = () => {
   const { searchParams } = useSearchParamsHook();
   const [value1, setValue1] = useState<Dayjs | null>(dayjs());
   const [value2, setValue2] = useState<Dayjs | null>(dayjs());

   // const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
   //    {
   //       label: 'This Week',
   //       getValue: () => {
   //          const today = dayjs();
   //          return [today.startOf('week'), today.endOf('week')];
   //       },
   //    },
   //    {
   //       label: 'Last Week',
   //       getValue: () => {
   //          const today = dayjs();
   //          const prevWeek = today.subtract(7, 'day');
   //          return [prevWeek.startOf('week'), prevWeek.endOf('week')];
   //       },
   //    },
   //    {
   //       label: 'Last 7 Days',
   //       getValue: () => {
   //          const today = dayjs();
   //          return [today.subtract(7, 'day'), today];
   //       },
   //    },
   //    {
   //       label: 'Current Month',
   //       getValue: () => {
   //          const today = dayjs();
   //          return [today.startOf('month'), today.endOf('month')];
   //       },
   //    },
   //    {
   //       label: 'Next Month',
   //       getValue: () => {
   //          const today = dayjs();
   //          const startOfNextMonth = today.endOf('month').add(1, 'day');
   //          return [startOfNextMonth, startOfNextMonth.endOf('month')];
   //       },
   //    },
   //    { label: 'Reset', getValue: () => [null, null] },
   // ];

   const { data: doashboard, isLoading } = useQuery(
      ['getDoashboard', searchParams['start_date'], searchParams['end_date']],
      async () => {
         const res = await dashboardService.get({
            start_date: searchParams['start_date'] ?? new Date(new Date().setDate(1)),
            end_date: searchParams['end_date'] ?? dayjs().endOf('month'),
         });

         return res.data;
      },
   );

   const { data: doashboardYear } = useQuery(['getDoashboardYear', value1], async () => {
      const res = await dashboardService.getYear(dayjs(value1).year());
      return res.data;
   });

   const { data: repairInvoice } = useQuery(['getDoashboardRepairInvoice', value2], async () => {
      const res = await dashboardService.getRepairInvoice(dayjs(value2).year());
      return res.data;
   });

   const dataCategoryNd = [
      {
         bgColor: 'rgba(2, 140, 23, 0.20)',
         bdColor: '#028C17',
         title: 'Doanh thu',
         data: formatPrice(doashboard?.count?.total_price_repair_invoice ?? 0),
         icon: <AttachMoneyIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
      {
         bgColor: 'rgba(220, 54, 217, 0.20)',
         bdColor: '#DC36D9',
         title: 'Chi phí nhập hàng',
         data: formatPrice(doashboard?.count?.total_price_supplies_invoice ?? 0),
         icon: <AttachMoneyIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
      // {
      //    bgColor: 'rgba(244, 19, 69, 0.20)',
      //    bdColor: '#F41345',
      //    title: 'Tổng doanh thu',
      //    data: formatPrice(1000000000),
      //    icon: <AttachMoneyIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      // },
      // {
      //    bgColor: 'rgba(255, 156, 8, 0.20)',
      //    bdColor: '#FF9C09',
      //    title: 'Tổng doanh thu',
      //    data: formatPrice(1000000000),
      //    icon: <AttachMoneyIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      // },
   ];

   const dataCategorySt = [
      {
         bgColor: 'rgba(32, 139, 255, 0.20)',
         bdColor: '#208BFF',
         title: 'Nhân viên',
         data: doashboard?.count?.personnels ?? 0,
         icon: <PeopleRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
      {
         bgColor: 'rgba(73, 70, 242, 0.20)',
         bdColor: '#4946F2',
         title: 'Khách hàng',
         data: doashboard?.count?.customers ?? 0,
         icon: <PeopleRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
      {
         bgColor: 'rgba(73, 70, 242, 0.20)',
         bdColor: '#4946F2',
         title: 'Xe',
         data: doashboard?.count?.cars ?? 0,
         icon: <DirectionsCarFilledRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },

      {
         bgColor: 'rgba(0, 170, 85, 0.20)',
         bdColor: '#00AA55',
         title: 'Vật tư',
         data: doashboard?.count?.supplies ?? 0,
         icon: <ConstructionRoundedIcon sx={{ width: '20px', height: '20px', color: 'white' }} />,
      },
   ];

   // const dataBarChartSupplies = {
   //    title: 'Top 10 vật tư có doanh thu cao nhất',
   //    subtext: 'Vật tư',
   //    data: [
   //       {
   //          name: 'Gói bảo dưỡng xe ô tô hạng B',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Dịch vụ bảo dưỡng xe hạng A',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Dịch vụ bảo dưỡng xe hạng C',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Gói bảo dưỡng xe ô tô hạng B',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Dịch vụ bảo dưỡng xe hạng A',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Gói bảo dưỡng xe ô tô hạng B',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Dịch vụ bảo dưỡng xe hạng A',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Dịch vụ bảo dưỡng xe hạng C',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Gói bảo dưỡng xe ô tô hạng B',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Dịch vụ bảo dưỡng xe hạng A',
   //          value: 50000,
   //       },
   //       {
   //          name: 'Dịch vụ bảo dưỡng xe hạng C',
   //          value: 50000,
   //       },
   //    ],
   // };

   return (
      <BaseBreadcrumbs arialabel="Thống kê" isLoading={isLoading}>
         {/* <DoashboardFilter /> */}

         <PageContent>
            <Grid container spacing={2}>
               {dataCategorySt.map((item, index) => (
                  <Grid item xs={3} key={index}>
                     <DoashboardPrice {...item} />
                  </Grid>
               ))}

               {dataCategoryNd.map((item, index) => (
                  <Grid item xs={6} key={index}>
                     <DoashboardPrice {...item} />
                  </Grid>
               ))}
               <Grid item xs={12}>
                  <AxisAlignWithTick
                     label="Doanh thu các tháng trong năm"
                     value={value1}
                     setValue={setValue1}
                     data={doashboardYear}
                  />
               </Grid>
               <Grid item xs={12}>
                  <AxisAlignWithTick
                     label="Chi phí nhập hành các tháng trong năm"
                     value={value2}
                     setValue={setValue2}
                     data={repairInvoice}
                  />
               </Grid>
               {/* <Grid item xs={6}>
                  <CharLineSimple {...dataLineSimple} />
               </Grid> */}
               {/* <Grid item xs={12}>
                  <BarChart {...dataBarChartSupplies} />
               </Grid> */}
               {/* <Grid item xs={6}>
                  <BarChart {...dataBarChartService} />
               </Grid> */}
            </Grid>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default Doashboard;
