/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

interface SortTableProps {
   sortList: SortList[];
}

const SortTable = ({ sortList }: SortTableProps) => {
   const [open, setOpen] = useState<boolean>(false);

   const ref = useRef<HTMLElement>(null);

   useOnClickOutside(ref, () => setOpen(false));

   const { searchParams, setParams } = useSearchParamsHook();

   const handleClickSort = (key: string) => {
      if (searchParams['sort_type'] === key) {
         return setParams('sort_by', searchParams['sort_by'] === 'asc' ? 'desc' : 'asc');
      }
      return setParams('sort_type', key);
   };

   return (
      <Stack>
         <Box sx={{ position: 'relative' }} ref={ref}>
            <Button
               variant="outlined"
               color="inherit"
               sx={{
                  bgcolor: 'transparent',
                  minWidth: 'auto !important',
                  px: '8px !important',
                  borderColor: '#ccc !important',
                  ':hover': { bgcolor: 'transparent' },
               }}
               onClick={() => setOpen(!open)}
            >
               <FilterAltOutlinedIcon sx={{ width: '24px', height: '24px' }} />
            </Button>
            {open && sortList.length > 0 && (
               <Box
                  sx={{
                     position: 'absolute',
                     top: '110%',
                     right: 0,
                     zIndex: 10,
                     width: 'max-content',
                     // py: '6px',
                     bgcolor: '#FFF',
                     border: '1px solid #DADADA',
                     borderRadius: '6px',
                     boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  }}
               >
                  {sortList.map((item, index) => {
                     return (
                        <Box
                           key={index}
                           sx={({ base }) => ({
                              px: '12px',
                              py: '4px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              color: searchParams['sort_type'] === item.value ? base.text.white : base.text.black,
                              justifyContent: 'space-between',
                              gap: '12px',
                              borderRadius: '6px',
                              backgroundColor: searchParams['sort_type'] === item.value ? '#0A5' : 'transparent',
                              ':hover': {
                                 bgcolor: '#0A5',
                                 color: base.text.white,
                              },
                           })}
                           onClick={() => handleClickSort(item.value)}
                        >
                           <Typography
                              sx={{
                                 flex: 1,
                                 fontSize: '16px',
                              }}
                              component="span"
                           >
                              {item.title}
                           </Typography>
                           <Box width="14px" display="flex" alignItems="center">
                              {searchParams['sort_type'] === item.value && <CheckOutlinedIcon sx={{ width: '14px' }} />}
                           </Box>
                        </Box>
                     );
                  })}
               </Box>
            )}
         </Box>
      </Stack>
   );
};

export default React.memo(SortTable);
