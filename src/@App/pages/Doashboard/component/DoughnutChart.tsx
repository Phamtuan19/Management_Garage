import { Box } from '@mui/material';
import ReactECharts from 'echarts-for-react';

const DoughnutChart = () => {
   const option = {
      tooltip: {
         trigger: 'item',
      },
      legend: {
         top: '5%',
         left: 'center',
      },
      series: [
         {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
               show: false,
               position: 'center',
            },
            emphasis: {
               label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold',
               },
            },
            labelLine: {
               show: false,
            },
            data: [
               { value: 1048, name: 'Search Engine' },
               { value: 735, name: 'Direct' },
               { value: 580, name: 'Email' },
               { value: 484, name: 'Union Ads' },
               { value: 300, name: 'Video Ads' },
            ],
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

export default DoughnutChart;
