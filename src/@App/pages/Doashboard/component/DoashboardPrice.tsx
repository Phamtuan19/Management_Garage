import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

interface DoashboardPriceProps {
   bgColor: string;
   bdColor: string;
   title: string;
   data: string | number;
   icon: React.ReactNode;
}

const DoashboardPrice = (props: DoashboardPriceProps) => {
   const { bdColor, bgColor, data = 0, title, icon } = props;

   return (
      <Stack
         sx={{
            border: `1px solid ${bdColor}`,
            bgcolor: bgColor,
            borderRadius: '8px',
            py: 2,
            minHeight: 130,
            // justifyContent: 'space-around',
         }}
      >
         <Box display="flex" alignItems="center" px={1.5} gap={1.5}>
            <Box
               sx={{
                  p: '2px',
                  bgcolor: bdColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '6px',
               }}
            >
               {icon}
            </Box>
            <Typography sx={{ fontSize: '14px' }}>{title}</Typography>
         </Box>
         <Box mt={2.5} position="relative" px={2.5} display="flex" alignItems="center">
            <Box
               sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '2px',
                  bgcolor: bdColor,
                  borderRadius: '2px',
                  height: '100%',
               }}
            ></Box>
            <Typography fontWeight={700} fontSize="24px">
               {data}
            </Typography>
         </Box>
      </Stack>
   );
};

export default DoashboardPrice;
