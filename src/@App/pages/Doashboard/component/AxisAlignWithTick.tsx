/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Typography } from '@mui/material';
import ReactECharts from 'echarts-for-react';

interface AxisAlignWithTickProps {
   series: {
      name: string;
      data: number[];
   };
   xAxis_data: string[];
   title: string;
}

const AxisAlignWithTick = (props: AxisAlignWithTickProps) => {
   const {
      series = {
         name: '',
         data: [],
      },
      xAxis_data = [],
      title,
   } = props;

   const option = {
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
            // data: [
            //    'Tháng 1',
            //    'Tháng 2',
            //    'Tháng 3',
            //    'Tháng 4',
            //    'Tháng 5',
            //    'Tháng 6',
            //    'Tháng 7',
            //    'Tháng 8',
            //    'Tháng 9',
            //    'Tháng 10',
            //    'Tháng 11',
            //    'Tháng 12',
            // ],
            data: xAxis_data,
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
            name: series.name,
            type: 'bar',
            barWidth: '60%',
            // data: [
            //    1000000, 1550000, 900000, 1000000, 1000000, 1000000, 1000000, 1000000, 100000, 1222222, 1900000, 1222222,
            // ],
            data: series.data,
         },
      ],
   };

   return (
      <Box>
         <ReactECharts style={{ height: 500, width: '100%' }} option={option} />
         <Box mt={2}>
            <Typography color="#555555" fontSize={16} pl={2}>
               {title}
            </Typography>
         </Box>
      </Box>
   );
};

export default AxisAlignWithTick;
