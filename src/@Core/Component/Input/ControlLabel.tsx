import { Typography, Box, SxProps, Theme } from '@mui/material';
import React from 'react';

interface ControlLabelProps {
   title?: string;
   required?: boolean;
   sx?: SxProps<Theme> | undefined;
   children?: React.ReactNode;
}

function ControlLabel(props: ControlLabelProps) {
   const { title, required, sx, children } = props;

   return (
      <Typography
         component="span"
         sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            padding: '5px 0',
            fontWeight: 500,
            gap: 1,
            ...sx,
         }}
      >
         {title && title} {children && children}
         {required && (
            <Box component="span" sx={{ color: 'red', fontSize: 24 }}>
               *
            </Box>
         )}
      </Typography>
   );
}

export default ControlLabel;
