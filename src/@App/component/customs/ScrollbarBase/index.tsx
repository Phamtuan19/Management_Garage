import { Box, SxProps, Theme } from '@mui/material';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import React from 'react';

function ScrollbarBase(props: { children?: React.ReactNode; sx: SxProps<Theme> | undefined }) {
   const { children, ...resProps } = props;
   return (
      <Box component={SimpleBar} {...resProps}>
         {props.children}
      </Box>
   );
}

export default ScrollbarBase;
