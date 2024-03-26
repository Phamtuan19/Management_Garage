/* eslint-disable @typescript-eslint/naming-convention */
import { Box, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

const SearchInput = ({ searchType = [], children }: { searchType: SortList[]; children?: React.ReactNode }) => {
   const [value, setValue] = useState<string>('');

   const { setParams, searchParams, deleteParams } = useSearchParamsHook();

   const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };

   const handleClickSearchItem = (key: string) => {
      setParams(key, value);
      setValue('');
   };

   // handle Input Key Down Enter
   const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         setParams(searchType[0].value, value);
         return setValue('');
      }
   };

   return (
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
         <Box sx={{ width: '60%', maxWidth: '700px', display: 'flex', gap: '0px 12px' }}>
            <Box sx={{ display: 'flex', gap: '0px 12px', position: 'relative', flex: 1 }}>
               <OutlinedInput
                  fullWidth
                  size="small"
                  value={value}
                  onChange={handleChangeInput}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Tìm kiếm"
                  sx={{
                     height: '38.21px',
                     borderRadius: '6px',
                     paddingRight: '0px !important',
                     '&.css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                        height: '1.2375em',
                     },
                  }}
                  endAdornment={
                     <InputAdornment position="end">
                        <IconButton>
                           <SearchSharpIcon sx={{ width: '24px' }} />
                        </IconButton>
                     </InputAdornment>
                  }
               />
               {value.length > 0 && (
                  <Box
                     sx={{
                        position: 'absolute',
                        top: '110%',
                        left: 0,
                        zIndex: 10,
                        minWidth: 'max-content',
                        width: '100%',
                        py: '6px',
                        bgcolor: '#FFF',
                        border: '1px solid #DADADA',
                        borderRadius: '6px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                     }}
                  >
                     {searchType.map((item, index) => {
                        return (
                           <Box
                              key={index}
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '12px',
                                 p: '3px 12px',
                                 cursor: 'pointer',
                                 ':hover': {
                                    bgcolor: '#0A5',
                                    color: '#FFF !important',
                                 },
                              }}
                              onClick={() => handleClickSearchItem(item.value)}
                           >
                              <KeyboardDoubleArrowRightSharpIcon sx={{ width: '18px' }} />
                              <Typography fontSize="16px">
                                 Tìm kiếm{' '}
                                 <Box
                                    component="span"
                                    sx={{
                                       fontWeight: 600,
                                    }}
                                 >
                                    {item.title}
                                 </Box>{' '}
                                 cho:{' '}
                                 <Box component="span" sx={{ textDecoration: 'underline' }}>
                                    {value}
                                 </Box>
                              </Typography>
                           </Box>
                        );
                     })}
                  </Box>
               )}
            </Box>
            <Box>{children}</Box>
         </Box>
         <Stack sx={{ flexDirection: 'row', gap: 1 }}>
            {searchType.map((item, index) => {
               if (searchParams[item.value]?.length > 0) {
                  return (
                     <Box
                        key={index}
                        sx={{
                           px: 1.4,
                           py: 0.5,
                           borderRadius: '40px',
                           bgcolor: '#0A5',
                           display: 'flex',
                           alignItems: 'center',
                           color: '#FFF',
                           gap: 0.5,
                        }}
                     >
                        <Box component="p" sx={{ fontSize: '14px', fontWeight: 500 }}>
                           {item.title}:
                        </Box>
                        <Typography component="p" sx={{ fontSize: '14px', fontWeight: 500 }}>
                           {searchParams[item.value]}
                        </Typography>
                        <CancelSharpIcon
                           sx={{ width: '14px', cursor: 'pointer' }}
                           onClick={() => deleteParams(item.value)}
                        />
                     </Box>
                  );
               }
               return <></>;
            })}
         </Stack>
      </Box>
   );
};

export default React.memo(SearchInput);
