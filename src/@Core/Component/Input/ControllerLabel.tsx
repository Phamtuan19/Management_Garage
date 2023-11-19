import { Typography, Box, SxProps, Theme } from '@mui/material';
import React from 'react';

interface ControllerLabelProps {
   title?: string;
   required?: boolean;
   sx?: SxProps<Theme> | undefined;
   children?: React.ReactNode;
}

function ControllerLabel(props: ControllerLabelProps) {
   const { title, required, sx, children } = props;

   return (
      <Typography
         component="span"
         sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 15,
            padding: '5px 0',
            fontWeight: 500,
            gap: 0.5,
            pt: 0,
            pb: 0.5,
            pl: 0.5,
            ...sx,
         }}
      >
         {title} {children}
         {required && (
            <Box component="span" sx={{ color: 'red', fontSize: 16, lineHeight: 1.4 }}>
               *
            </Box>
         )}
      </Typography>
   );
}

export default ControllerLabel;
