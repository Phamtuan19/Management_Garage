/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Typography } from '@mui/material';
import ReactECharts from 'echarts-for-react';

interface CharLineSimpleProps {
   series: {
      name: string;
      data: number[];
   };
   xAxis_data: string[];
   title: string;
}

const CharLineSimple = (props: CharLineSimpleProps) => {
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
      xAxis: {
         type: 'category',
         //  data: [
         //     'Tháng 1',
         //     'Tháng 2',
         //     'Tháng 3',
         //     'Tháng 4',
         //     'Tháng 5',
         //     'Tháng 6',
         //     'Tháng 7',
         //     'Tháng 8',
         //     'Tháng 9',
         //     'Tháng 10',
         //     'Tháng 11',
         //     'Tháng 12',
         //  ],
         data: xAxis_data,
      },
      yAxis: {
         type: 'value',
      },
      series: [
         {
            name: series.name,
            type: 'line',
            // data: [150, 230, 224, 218, 135, 147, 260, 150, 230, 224, 218, 135],
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

export default CharLineSimple;
