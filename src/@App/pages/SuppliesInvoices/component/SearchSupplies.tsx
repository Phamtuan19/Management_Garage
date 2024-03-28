/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, ButtonBase, Checkbox, Grid, InputBase, Stack, Typography } from '@mui/material';
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
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

import SearchSuppliesItem from './SearchSuppliesItem';

interface SearchSupplies {
   form: UseFormReturn<SuppliesInvoicesSchema>;
   columnVisibility: {
      [key: string]: boolean;
   };
   setColumnVisibility: React.Dispatch<any>;
}

const columnVisibilityData: Record<string, string> = {
   stt: 'Số thứ tự',
   code: 'Mã',
   name_detail: 'Tên vật tư',
   distributor_name: 'Nhà phân phối',
   unit: 'Đơn vị tính',
   quantity_received: 'Số lượng',
   cost_price: 'Giá nhập',
   selling_price: 'Giá bán',
   discount: 'Giảm giá',
   total_price: 'Tổng tiền',
   action: 'Thao tác',
};

const SearchSupplies = ({ form, columnVisibility, setColumnVisibility }: SearchSupplies) => {
   // const { id: suppliesInvoiceId } = useParams();
   const { watch, setValue } = form;
   const [openVisibility, setOpenVisibility] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false);
   const [valueSearch, setValueSearch] = useState<string>('');

   const ref = useRef<HTMLElement>(null);
   const distributor_id = watch('distributor_id');

   useOnClickOutside(ref, () => setOpen(false));

   const valueDebounce = useDebounce(valueSearch, 500);

   const { data: supplies } = useQuery(['getAllFieldSuppliesDetails', valueDebounce, distributor_id], async () => {
      const res = await suppliesService.getAllSupplies({
         q: valueDebounce ?? '',
         ...(distributor_id ? { distributor_id } : {}),
      });
      return res.data;
   });

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
            supplies_invoice_detail_id: '',
            code: supplie.code,
            name_detail: supplie.name_detail,
            unit: supplie.unit,
            supplies_detail_id: supplie._id,
            quantity_received: 1,
            cost_price: supplie.imported_price ?? 0,
            selling_price: supplie.imported_price ?? 0,
            describe: '',
            discount: 0,
            distributor_name: supplie.name_distributor,
         },
      ]);

      setOpen(false);
      return setValueSearch('');
   };

   return (
      <Grid container spacing={2} mt={0.5} ml={0.5}>
         <Grid item xs={7.3}>
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
                  size="small"
                  sx={{ p: '6px 12px', '.css-7dqvty-MuiInputBase-input': { p: 0 } }}
                  placeholder="Tìm kiếm vật tư"
               />
               <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ButtonBase sx={{ borderRadius: '6px' }}>
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

         <Grid item xs={4}></Grid>

         <Grid item xs={0.7} display="flex" justifyContent="flex-end">
            <Box position="relative">
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
                  onClick={() => setOpenVisibility(!openVisibility)}
               >
                  <FilterAltOutlinedIcon sx={{ width: '24px', height: '24px' }} />
               </Button>
               {openVisibility && (
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
                        py: 1,
                     }}
                  >
                     {Object.keys(columnVisibility).map((item) => {
                        const title = columnVisibilityData[item];
                        if (!title) {
                           return;
                        }

                        return (
                           <Box px={1} display="flex" justifyContent="flex-start" alignItems="center" key={item}>
                              <Checkbox
                                 checked={columnVisibility[item]}
                                 onChange={(e) => {
                                    setColumnVisibility((prev: any) => ({ ...prev, [item]: e.target.checked }));
                                 }}
                                 size="small"
                              />
                              <ControllerLabel title={title} />
                           </Box>
                        );
                     })}
                  </Box>
               )}
            </Box>
         </Grid>
      </Grid>
   );
};

export default SearchSupplies;
