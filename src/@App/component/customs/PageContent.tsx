import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

const PageContent = ({ children, sx }: { children?: React.ReactNode; sx?: SxProps<Theme> }) => {
   return (
      <Box
         sx={({ base }) => ({
            sx,
            marginTop: '12px',
            padding: '12px',
            border: '1px solid  #d1d5db5e',
            borderRadius: '5px',
            backgroundColor: base.background.white as string,
         })}
      >
         {children}
      </Box>
   );
};

export default PageContent;
