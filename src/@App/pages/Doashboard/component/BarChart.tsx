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
      },
      tooltip: {
         trigger: 'item',
      },
      //   legend: {
      //      orient: 'vertical',
      //      left: 'left',
      //      bottom: 'bottom',
      //   },
      series: [
         {
            name: '',
            type: 'pie',
            radius: '50%',
            // data: [
            //    { value: 1048, name: 'Search Engine' },
            //    { value: 735, name: 'Direct' },
            //    { value: 580, name: 'Email' },
            //    { value: 484, name: 'Union Ads' },
            //    { value: 300, name: 'Video Ads' },
            // ],
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
         <ReactECharts style={{ height: 500, width: '100%' }} option={option} />
         {/* <Box mt={2}>
            <Typography color="#555555" fontSize={16} pl={2}>
               {title}
            </Typography>
         </Box> */}
      </Box>
   );
};

export default React.memo(BarChart);
