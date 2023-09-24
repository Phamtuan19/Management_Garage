import { Box } from '@mui/material';
import React from 'react';

function ScrollbarBase(props: { children?: React.ReactNode }) {
   return (
      <Box
         sx={{
            'body::-webkit-scrollbar-track': {
               webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
               borderRadius: 10,
               backgroundColor: '#F5F5F5',
            },
         }}
      >
         {props.children}
      </Box>
   );
}

export default ScrollbarBase;
