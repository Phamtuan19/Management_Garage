/* eslint-disable @typescript-eslint/naming-convention */
import { Box, ButtonBase, Grid, InputBase, Stack, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import { useQuery } from '@tanstack/react-query';
import suppliesService, { ReadSupplies } from '@App/services/supplies.service';
import useDebounce from '@App/hooks/useDebounce';
import { UseFormReturn } from 'react-hook-form';
import distributorService from '@App/services/distributor.service';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
// import { useParams } from 'react-router-dom';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

import SearchSuppliesItem from './SearchSuppliesItem';

interface SearchSupplies {
   form: UseFormReturn<SuppliesInvoicesSchema>;
}

const SearchSupplies = ({ form }: SearchSupplies) => {
   // const { id: suppliesInvoiceId } = useParams();
   const { watch, setValue } = form;
   const [open, setOpen] = useState<boolean>(false);
   const [valueSearch, setValueSearch] = useState<string>('');

   const ref = useRef<HTMLElement>(null);
   const distributor_id = watch('distributor_id');

   useOnClickOutside(ref, () => setOpen(false));

   const valueDebounce = useDebounce(valueSearch, 500);

   const { data: distributors } = useQuery(['getAllFieldDistributors'], async () => {
      const res = await distributorService.getAllField({});
      return res.data;
   });

   const { data: supplies } = useQuery(['getAllFieldSuppliesDetails', valueDebounce, distributor_id], async () => {
      const res = await suppliesService.getAllSupplies({
         q: valueDebounce ?? '',
         distributor_id,
      });
      return res.data;
   });

   const handleClickList = () => {
      setOpen(true);
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

   // hàm sử lý khi thêm sản phẩm từ input search vào table
   // hàm sẽ kiểm tra nếu tồn tại thì tăng số lượng
   // nếu chưa tồn tại thì thêm với số lượng = 1
   const handleClickSupplieItem = (supplie: ReadSupplies) => {
      const details = watch('details');
      const isCheck = details.find((item) => item.supplies_detail_id === supplie._id);

      if (isCheck) {
         setValue(
            'details',
            details
               ? details.map((item) => {
                    if (item.supplies_detail_id === supplie._id) {
                       return { ...item, quantity_received: item.quantity_received + 1 };
                    }
                    return item;
                 })
               : [],
         );

         setOpen(false);
         return setValueSearch('');
      }

      setValue('details', [
         ...details,
         {
            code: supplie.code,
            name_detail: supplie.name_detail,
            unit: supplie.unit,
            supplies_detail_id: supplie._id,
            quantity_received: 1,
            cost_price: supplie.imported_price ?? 0,
            selling_price: supplie.imported_price ?? 0,
            describe: '',
            discount: 0,
         },
      ]);

      setOpen(false);
      return setValueSearch('');
   };

   // const autoCompleteDistributor = React.useMemo(
   //    () => (distributors ? distributors.filter((v) => v._id === watch('distributor')) : null),
   //    [distributors],
   // );

   return (
      <Grid container spacing={2} mt={0.5} ml={0.5}>
         <Grid item xs={4}>
            <ControllerAutoComplate
               label="Nhà phân phối"
               options={distributors || []}
               valuePath="_id"
               titlePath="name"
               name="distributor_id"
               control={form.control}
               // disabled={Boolean(suppliesInvoiceId)}
            />
         </Grid>
         {/* <Grid item xs={4}> */}
         {/* <Autocomplete
               fullWidth
               // value={autoCompleteDistributor as { _id: string; label: string } | null}
               options={distributors ?? []}
               renderInput={(params) => <TextField {...params} />}
               // getOptionLabel={(option: { _id: string; label: string }) => option.label || ''}
               onChange={(_, value) => {
                  const selectedId = value ? (value as { _id: string; label: string })._id : '';
                  return setValue('distributor_id', selectedId);
               }}
               // isOptionEqualToValue={(option, value) => {
               //    // if (value instanceof Object) {
               //    //    return option._id === value._id;
               //    // }

               //    // return option._id === value;
               //    return false;
               // }}
            /> */}
         {/* </Grid> */}
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
               <SearchOutlinedIcon sx={{ fontSize: '22px', color: distributor_id ? 'black' : '#00000061' }} />
               <InputBase
                  fullWidth
                  value={valueSearch}
                  onChange={handleChangeInput}
                  onClick={() => {
                     return setOpen(true);
                  }}
                  disabled={Boolean(!distributor_id)}
                  size="small"
                  sx={{ p: '6px 12px', '.css-7dqvty-MuiInputBase-input': { p: 0 } }}
                  placeholder="Tìm kiếm vật tư"
               />
               <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ButtonBase onClick={handleClickList} sx={{ borderRadius: '6px' }}>
                     <FormatListBulletedOutlinedIcon
                        sx={{ fontSize: '22px', color: distributor_id ? 'black' : '#00000061' }}
                     />
                  </ButtonBase>
                  <ButtonBase onClick={handleClickAdd} sx={{ borderRadius: '6px' }}>
                     <AddOutlinedIcon sx={{ fontSize: '22px', color: distributor_id ? 'black' : '#00000061' }} />
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
                              {supplies.map((item) => {
                                 return (
                                    <SearchSuppliesItem
                                       key={item._id}
                                       supplie={item}
                                       handleClickSupplieItem={handleClickSupplieItem}
                                    />
                                 );
                              })}
                           </Stack>
                        </ScrollbarBase>
                     ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '12px' }}>
                           <Typography sx={{ fontSize: '14px' }}>Không tìm thấy vật tư phù hợp</Typography>
                        </Box>
                     )}
                  </Box>
               )}
            </Box>
         </Grid>
      </Grid>
   );
};

export default SearchSupplies;
