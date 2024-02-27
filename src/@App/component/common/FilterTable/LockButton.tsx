/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Stack } from '@mui/material';
import React, { useRef } from 'react';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

interface LockButtonProps {
   lock: Lock[];
}

const LockButton = ({ lock }: LockButtonProps) => {

   const ref = useRef<HTMLElement>(null);

   const { searchParams, setParams } = useSearchParamsHook();

   const handleClickIsLock = (key: string) => {
      return setParams('is_lock', key);
   };

   return (
      <Stack>
         <Box sx={{
            position: 'relative',
            bgcolor: 'transparent',
            minWidth: 'auto !important',
            px: '8px !important',
            borderColor: '#ccc !important',
            ':hover': { bgcolor: 'transparent' },
         }} ref={ref}>

            {lock.map((item) => {
               return (
                  <Button
                     variant="outlined"
                     color="inherit"
                     sx={{
                        bgcolor: 'transparent',
                        minWidth: 'auto !important',
                        px: '12px',
                        py: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        borderRadius: '6px',
                        borderColor: '#ccc !important',
                        ':hover': { bgcolor: 'transparent' },

                     }}
                     onClick={() => handleClickIsLock(item.value)}
                  >
                     Tài khoản bị khóa 
                     {searchParams['is_lock'] === item.value}
                  </Button>
               )
            })}

         </Box>
      </Stack>
   );
};

export default React.memo(LockButton);
