import { Typography, Box } from '@mui/material';
import React from 'react';

interface ControlLabelProps {
   title?: string;
   required?: boolean;
   children?: React.ReactNode;
}

function ControlLabel(props: ControlLabelProps) {
   const { title, required, children } = props;

   return (
      <Typography component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
