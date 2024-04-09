import Calendar from '@App/component/common/Calendar';
import { Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import React from 'react';

interface BarChartPropsType {
   title: string;
   data: Array<{
      name: string;
      value: string | number;
   }>;
   subtext: string;
}

const BarChart = ({ title, subtext, data }: BarChartPropsType) => {
   const option = {
      title: {
         text: title,
         subtext: subtext,
         left: 'center',
         bottom: 'bottom',
      },
      tooltip: {
         trigger: 'item',
      },
      legend: {
         orient: 'vertical',
         top: 'top',
         left: 'left',
         // bottom: 'bottom',
      },
      series: [
         {
            name: '',
            type: 'pie',
            radius: '70%',
            label: {
               show: false,
               position: 'center',
            },
            data: data,
            emphasis: {
               itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
               },
            },
         },
      ],
   };
   return (
      <Box mt={3}>
         <Box mb={2}>
            <Calendar isReset={true} />
         </Box>
         <ReactECharts style={{ height: 500, width: '100%' }} option={option} />
      </Box>
   );
};

export default React.memo(BarChart);
