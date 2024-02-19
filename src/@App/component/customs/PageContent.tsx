/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

const PageContent = ({ children, sx }: { children?: React.ReactNode; sx?: SxProps<Theme> | undefined }) => {
   return (
      <Box
         sx={{
            marginTop: '12px',
            padding: '12px',
            border: '1px solid  #d1d5db5e',
            borderRadius: '5px',
            backgroundColor: '#FFFF',
            ...sx,
         }}
      >
         {children}
      </Box>
   );
};

export default PageContent;
