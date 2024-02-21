/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Grid, InputBase, Stack, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import suppliesService, { ReadSupplies } from '@App/services/supplies.service';
import distributorService from '@App/services/distributor.service';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useRef, useState } from 'react';
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import useDebounce from '@App/hooks/useDebounce';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import SearchSuppliesItem from '@App/pages/SuppliesInvoices/component/SearchSuppliesItem';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { RepairorderSchema } from '../../utils/repairorderSchema';

const FilterSearchSupplies = ({ form }: { form: UseFormReturn<RepairorderSchema> }) => {
   const { setValue, control, watch } = form;
   const coreConfirm = useConfirm();
   const [open, setOpen] = useState<boolean>(false);
   const [valueSearch, setValueSearch] = useState<string>('');
   const ref = useRef<HTMLElement>(null);

   const distributor_id = watch('filterSearch.distributor_id');

   useOnClickOutside(ref, () => setOpen(false));

   const valueDebounce = useDebounce(valueSearch, 500);

   const { data: suppliesDetail } = useQuery(['getAllfieldSupplies', [distributor_id]], async () => {
      const res = await suppliesService.getAllSupplies({
         q: valueDebounce ?? '',
         distributor_id,
      });
      return res.data;
   });

   const { data: distributors, isLoading: distributorLoading } = useQuery(['getAllFieldDistributors'], async () => {
      const res = await distributorService.getAllField();
      return res.data;
   });

   const handleClickSupplieItem = (suppliesDetail: ReadSupplies) => {
      const details = watch('suppliesOrder');
      const isCheck = details.find((item) => item.supplies_detail_id === suppliesDetail._id);
      console.log(suppliesDetail.supplies_invoices_code);
      if (isCheck) {
         setValue(
            'suppliesOrder',
            details
               ? details.map((item, index) => {
                    if (item.supplies_detail_id === suppliesDetail._id) {
                       if (item.quantity >= watch(`suppliesOrder.${index}.total_supplies_crrent`)) {
                          coreConfirm({
                             icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
                             title: 'Cảnh báo',
                             confirmOk: 'Xác nhận',
                             content: 'Sản phẩm này trong lô hàng không đủ số lượng.',
                             callbackOK: () => {},
                             isIcon: true,
                          });

                          return item;
                       }
                       return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                 })
               : [],
         );

         setOpen(false);
         return setValueSearch('');
      }
      setValue('suppliesOrder', [
         ...details,
         {
            code: suppliesDetail.code,
            name_detail: suppliesDetail.name_detail,
            supplies_detail_id: suppliesDetail._id,
            selling_price: suppliesDetail.selling_price ?? 0,
            describe: '',
            discount: suppliesDetail.discount,
            distributor_name: suppliesDetail.name_distributor,
            quantity: 0,
            supplies_invoices_code: suppliesDetail.supplies_invoices_code,
            supplies_invoices_id: suppliesDetail.supplies_invoice_id,
            total_supplies_crrent: suppliesDetail.quantity_received,
         },
      ]);

      setOpen(false);
      return setValueSearch('');
   };

   return (
      <Grid container spacing={2}>
         <Grid item xs={4}>
            <ControllerAutoComplate
               name="filterSearch.distributor_id"
               options={distributors || []}
               loading={distributorLoading}
               valuePath="_id"
               titlePath="name"
               onChange={(value: { _id: string; name: string }) => {
                  setValue('filterSearch.distributor_id', value._id);
               }}
               control={control}
            />
         </Grid>
         <Grid item xs={6}>
            {/* <ControllerAutoComplate
               name="filterSearch.supplies_detail"
               options={(suppliesDetail as never) || []}
               loading={suppliesDetailLoading}
               valuePath="_id"
               titlePath="name_detail"
               onChange={(value: ReadSupplies) => {
                  setValue('filterSearch.supplies_detail', value._id);
               }}
               control={control}
            /> */}

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
                  // onChange={handleChangeInput}
                  onClick={() => {
                     return setOpen(true);
                  }}
                  disabled={Boolean(!distributor_id)}
                  size="small"
                  sx={{ p: '6px 12px', '.css-7dqvty-MuiInputBase-input': { p: 0 } }}
                  placeholder="Tìm kiếm vật tư"
               />
               {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ButtonBase onClick={handleClickList} sx={{ borderRadius: '6px' }}>
                     <FormatListBulletedOutlinedIcon
                        sx={{ fontSize: '22px', color: distributor_id ? 'black' : '#00000061' }}
                     />
                  </ButtonBase>
                  <ButtonBase onClick={handleClickAdd} sx={{ borderRadius: '6px' }}>
                     <AddOutlinedIcon sx={{ fontSize: '22px', color: distributor_id ? 'black' : '#00000061' }} />
                  </ButtonBase>
               </Box> */}

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
                     {suppliesDetail && suppliesDetail.length > 0 ? (
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
                              {suppliesDetail.map((item) => {
                                 return (
                                    <SearchSuppliesItem
                                       key={item._id}
                                       supplie={item}
                                       handleClickSupplieItem={() => handleClickSupplieItem(item)}
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

export default FilterSearchSupplies;
