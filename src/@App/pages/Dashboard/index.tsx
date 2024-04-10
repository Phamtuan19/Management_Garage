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
import Calendar from '@App/component/common/Calendar';

import DoashboardPrice from './component/DoashboardPrice';
import AxisAlignWithTick from './component/AxisAlignWithTick';

const Doashboard = () => {
   const { searchParams } = useSearchParamsHook();
   const [value1, setValue1] = useState<Dayjs | null>(dayjs());
   const [value2, setValue2] = useState<Dayjs | null>(dayjs());

   const { data: doashboard, isLoading } = useQuery(
      ['getDoashboard', searchParams['start_date'], searchParams['end_date']],
      async () => {
         const res = await dashboardService.get({
            start_date: searchParams['start_date'],
            end_date: searchParams['end_date'],
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

   return (
      <BaseBreadcrumbs arialabel="Thống kê" isLoading={isLoading}>
         {/* <DoashboardFilter /> */}
         <Calendar isReset={true} />
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
