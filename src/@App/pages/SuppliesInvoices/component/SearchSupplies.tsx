/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Autocomplete, Box, ButtonBase, Grid, InputBase, Stack, TextField, Typography, styled } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React, { useRef, useState } from 'react';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import { useQuery } from '@tanstack/react-query';
import suppliesService, { ReadSupplies } from '@App/services/supplies.service';
import useDebounce from '@App/hooks/useDebounce';
import handlePrice from '@Core/Helper/hendlePrice';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

interface SearchSupplies {
   // supplies?: {
   //    _id: string;
   //    name: string;
   // }[];
   watch: UseFormWatch<SuppliesInvoicesSchema>;
   setValue: UseFormSetValue<SuppliesInvoicesSchema>;
}

const SearchSupplies = ({ watch, setValue }: SearchSupplies) => {
   const [open, setOpen] = useState<boolean>(false);
   const [valueSearch, setValueSearch] = useState<string>('');
   const [valueDistributor, setValueDistributor] = useState<string>('');

   const ref = useRef<HTMLElement>(null);

   useOnClickOutside(ref, () => setOpen(false));

   const valueDebounce = useDebounce(valueSearch, 500);

   const { data: supplies } = useQuery(['getAllFieldSuppliesDetails', valueDebounce, valueDistributor], async () => {
      const res = await suppliesService.getAllSupplies({ q: valueDebounce ?? '', distributor: valueDistributor ?? '' });
      return res.data;
   });

   const handleClickList = () => {
      setOpen(false);
   };

   const handleClickAdd = () => {
      setOpen(false);
   };

   const handleChangeInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValueSearch(event.target.value);
      if (event.target.value.length > 0) {
         setOpen(true);
      } else {
         setOpen(false);
      }
   };

   const handleClickSupplieItem = (supplie: ReadSupplies) => {
      const details = watch('details');
      const isCheck = details.find((item) => item.supplies_detail_id === supplie._id);

      if (isCheck) {
         return setValue(
            'details',
            details.map((item) => {
               if (item.supplies_detail_id === supplie._id) {
                  return { ...item, quantity_received: String(Number(item.quantity_received) + 1) };
               }
               return item;
            }),
         );
      }

      return setValue('details', [
         ...details,
         {
            code: '',
            name_detail: supplie.name_detail,
            unit: supplie.unit,
            supplies_detail_id: supplie._id,
            quantity_received: '1',
            cost_price: String(supplie.imported_price ?? 0),
            selling_price: String(supplie.imported_price ?? 0),
            describe: '',
         },
      ]);
   };

   return (
      <Grid container spacing={2} mt={0.5} ml={0.5}>
         <Grid item xs={8}>
            <Box
               sx={{
                  position: 'relative',
                  border: '1px solid #90909080',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  px: '12px',
                  width: '100%',
               }}
               ref={ref}
            >
               <SearchOutlinedIcon sx={{ fontSize: '22px' }} />
               <InputBase
                  fullWidth
                  value={valueSearch}
                  onChange={handleChangeInput}
                  onClick={() => {
                     return valueSearch.length > 0 && setOpen(true);
                  }}
                  size="small"
                  sx={{ p: '8px 12px', '.css-7dqvty-MuiInputBase-input': { p: 0 } }}
                  placeholder="Tìm kiếm vật tư"
               />
               <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ButtonBase onClick={handleClickList}>
                     <FormatListBulletedOutlinedIcon sx={{ fontSize: '22px' }} />
                  </ButtonBase>
                  <ButtonBase onClick={handleClickAdd}>
                     <AddOutlinedIcon sx={{ fontSize: '22px' }} />
                  </ButtonBase>
               </Box>

               {/* List Supplies */}
               {open && (
                  <Box
                     sx={({ base }) => ({
                        position: 'absolute',
                        left: 0,
                        top: '105%',
                        width: '100%',
                        maxHeight: '500px',
                        zIndex: 2,
                        backgroundColor: base.color.contrastText as string,
                        border: '1px solid #c7d0dd80',
                        boxShadow: 'rgba(11, 13, 14, 0.2) 0px 4px 16px',
                        borderRadius: '3px',
                     })}
                  >
                     {supplies && supplies.length > 0 ? (
                        <ScrollbarBase
                           sx={{
                              'body::-webkit-scrollbar-track': {
                                 webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                                 borderRadius: 10,
                                 backgroundColor: '#F5F5F5',
                              },
                              width: '100%',
                              flex: 1,
                              maxHeight: '285px',
                           }}
                        >
                           <Stack sx={{ gap: '6px' }}>
                              {supplies.map((item: ReadSupplies) => {
                                 return (
                                    <ButtonBase
                                       key={item._id}
                                       sx={({ base }) => ({
                                          width: '100%',
                                          display: 'flex',
                                          gap: '12px',
                                          py: '6px',
                                          px: '12px',
                                          fontSize: '14px',
                                          '&:hover': {
                                             backgroundColor: base.text.primary,
                                             color: base.color.contrastText as string,
                                          },
                                       })}
                                       onClick={() => handleClickSupplieItem(item)}
                                    >
                                       <LazyLoadingImage src="" w="36" h="36" />
                                       <Flex sx={{ flexDirection: 'column', flex: 1, gap: '6px' }}>
                                          <Box sx={{ width: '100%', textAlign: 'left' }}>{item.name_detail}</Box>
                                          <Flex sx={{ width: '100%', gap: '12px' }}>
                                             <Box>
                                                <span>#1122</span>
                                             </Box>
                                             <Flex sx={{ flex: 2, gap: '3px' }}>
                                                <p>Giá nhập:</p>
                                                <p>{handlePrice(item.imported_price ?? 0)}</p>
                                             </Flex>
                                             <Flex sx={{ flex: 1, gap: '6px' }}>
                                                <Box>Tồn:</Box>
                                                <Box>0</Box>
                                             </Flex>
                                          </Flex>
                                       </Flex>
                                    </ButtonBase>
                                 );
                              })}
                           </Stack>
                        </ScrollbarBase>
                     ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                           <Typography sx={{ fontSize: '14px' }}>Không tìm thấy vật tư phù hợp</Typography>
                        </Box>
                     )}
                  </Box>
               )}
            </Box>
         </Grid>
         <Grid item xs={4}>
            <Autocomplete
               fullWidth
               options={[
                  {
                     label: 'nhà phân phối 1',
                     _id: '1',
                  },
                  {
                     label: 'nhà phân phối 1',
                     _id: '2',
                  },
                  {
                     label: 'nhà phân phối 1',
                     _id: '3',
                  },
               ]}
               renderInput={(params) => <TextField {...params} />}
               onChange={(_, value) => {
                  return setValueDistributor(value?._id ?? '');
               }}
            />
         </Grid>
      </Grid>
   );
};

export default SearchSupplies;

const Flex = styled('div')({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
});
