/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Typography } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { month } from '../utils';

const AxisAlignWithTick = ({ data, value, setValue }: any) => {
   const option = useMemo(() => {
      const totalRevenue = data?.map((item: { total_price: any }) => item.total_price);

      return {
         tooltip: {
            trigger: 'axis',
            axisPointer: {
               type: 'shadow',
            },
         },
         grid: {
            left: '0%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
         },
         xAxis: [
            {
               type: 'category',

               data: month,
               axisTick: {
                  alignWithLabel: true,
               },
            },
         ],
         yAxis: [
            {
               type: 'value',
            },
         ],
         series: [
            {
               name: 'Doanh thu',
               type: 'bar',
               barWidth: '60%',
               data: totalRevenue,
            },
         ],
      };
   }, [data]);

   return (
      <Box>
         <ReactECharts style={{ height: 500, width: '100%' }} option={option} />
         <Box mt={2} display="flex" alignItems="center" gap={1.5}>
            <Typography color="#555555" fontSize={16} pl={2}>
               Doanh thu các tháng trong năm ({dayjs(value).year()})
            </Typography>
            <Box>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                     sx={{
                        pt: 0,
                        overflow: 'hidden',
                     }}
                     components={['DatePicker']}
                  >
                     <DatePicker
                        sx={{
                           '.css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                              height: '1.2375em',
                           },
                           width: '50px',
                        }}
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        openTo="year"
                        views={['year']}
                     />
                  </DemoContainer>
               </LocalizationProvider>
            </Box>
         </Box>
      </Box>
   );
};

export default AxisAlignWithTick;
