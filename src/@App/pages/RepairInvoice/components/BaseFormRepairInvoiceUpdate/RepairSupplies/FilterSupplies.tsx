/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {
   Box,
   Button,
   ButtonBase,
   Checkbox,
   Chip,
   Grid,
   InputBase,
   MenuItem,
   Select,
   Stack,
   Typography,
   styled,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useMemo, useRef, useState } from 'react';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { UseFieldArrayAppend, UseFormReturn } from 'react-hook-form';
import useDebounce from '@App/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import suppliesService, { SuppliesItem } from '@App/services/supplies.service';
import formatPrice from '@Core/Helper/formatPrice';
import { RepairInvoiceUpdateSchema } from '@App/pages/RepairInvoice/utils/repair-invoice-update';
import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';

interface FilterSuppliesProps {
   form: UseFormReturn<RepairInvoiceUpdateSchema>;
   columnVisibility: Record<string, boolean>;
   setColumnVisibility: React.Dispatch<any>;
   columnVisibilityData: Record<string, string>;
   append: UseFieldArrayAppend<RepairInvoiceUpdateSchema>;
}

const FilterSupplies = ({
   form,
   append,
   columnVisibility,
   setColumnVisibility,
   columnVisibilityData,
}: FilterSuppliesProps) => {
   const [valueSearch, setValueSearch] = useState<string>('');
   const [openVisibility, setOpenVisibility] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false);
   const [field, setField] = useState<string>('name_detail');

   const { watch } = form;

   const ref = useRef<HTMLElement>(null);
   const refVisibility = useRef<HTMLElement>(null);

   useOnClickOutside(ref, () => setOpen(false));
   useOnClickOutside(refVisibility, () => setOpenVisibility(false));

   const carName = watch('car.car_name');
   const suppliesInvoices = watch('suppliesInvoices');
   const valueDebounce = useDebounce(valueSearch, 500);

   const { data: suppliesDetail } = useQuery(['getSupplies', valueDebounce, field, carName], async () => {
      const res = await suppliesService.getSupplies({
         q: valueDebounce ?? '',
         field: field,
         car_name: carName,
      });
      return res.data;
   });

   const dataFilterSupplie = useMemo(() => {
      if (suppliesDetail && suppliesInvoices) {
         if (suppliesInvoices.length === 0) {
            return suppliesDetail;
         }

         return suppliesDetail.filter(
            (item1) => !suppliesInvoices.some((item2) => item1._id === item2.repair_invoice_id),
         );
      }

      return [];
   }, [suppliesDetail, suppliesInvoices]);

   const handleClichAddSupplies = (supplies: SuppliesItem) => {
      const isCheck = suppliesInvoices.some((item) => item.repair_invoice_id === supplies._id);

      if (isCheck) {
         return setOpen(false);
      }

      append({
         _id: '',
         describe: '',
         inventory: supplies.total_quantity_received ?? 0,
         quantity: 1,
         price:
            supplies.min_price === supplies.max_price
               ? formatPrice(supplies.max_price)
               : `${formatPrice(supplies.min_price)} - ${formatPrice(supplies.max_price)}`,
         repair_invoice_id: supplies._id,
         repair_staff_id: '',
         type: 'supplies',
         status_repair: STATUS_REPAIR_DETAIL.empty.key,
         supplies_detail_code: supplies.code,
         supplies_detail_name: supplies.name_detail,
         distributor_name: supplies.distributor_name,
         discount: 0,
      });

      return setOpen(false);
   };

   return (
      <Grid container spacing={2} justifyContent="space-between">
         <Grid item xs={8.3}>
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
                  onChange={(e) => {
                     setValueSearch(e.target.value);
                  }}
                  onClick={() => {
                     return setOpen(true);
                  }}
                  size="small"
                  sx={{ p: '6px 12px', '.css-7dqvty-MuiInputBase-input': { p: 0 } }}
                  placeholder="Tìm kiếm vật tư"
               />

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
                     ref={ref}
                  >
                     {dataFilterSupplie && dataFilterSupplie.length > 0 ? (
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
                              {dataFilterSupplie.map((item) => {
                                 return (
                                    <ButtonBase
                                       key={item._id}
                                       sx={({ base }) => ({
                                          width: '100%',
                                          display: 'flex',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                          gap: '12px',
                                          py: '6px',
                                          px: '12px',
                                          fontSize: '14px',
                                          '&:hover': {
                                             backgroundColor: base.text.primary,
                                             color: base.color.contrastText as string,
                                          },
                                       })}
                                       onClick={() => {
                                          handleClichAddSupplies(item);
                                       }}
                                    >
                                       <Flex sx={{ flexDirection: 'column', gap: '6px' }}>
                                          <Box sx={{ width: '100%', textAlign: 'left' }}>{item.name_detail}</Box>
                                          <Flex sx={{ width: '100%', gap: '12px' }}>
                                             <Flex sx={{ flex: 2, gap: '3px' }}>{item.distributor_name}</Flex>
                                          </Flex>
                                       </Flex>
                                       <Flex sx={{ flex: 1, gap: '6px' }}>
                                          <Chip
                                             label={item.isInStock ? 'còn hàng' : 'hết hàng'}
                                             variant="outlined"
                                             color={item.isInStock ? 'success' : 'error'}
                                          />
                                       </Flex>
                                    </ButtonBase>
                                 );
                              })}
                           </Stack>
                        </ScrollbarBase>
                     ) : (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: '12px' }}>
                           <Typography sx={{ fontSize: '14px' }}>Không có dữ liệu</Typography>
                        </Box>
                     )}
                  </Box>
               )}
            </Box>
         </Grid>
         <Grid item xs={3}>
            <Select fullWidth onChange={(e) => setField(e.target.value)} value={field}>
               <MenuItem value="name_detail">Vật tư chi tiết</MenuItem>
               <MenuItem value="supplies.name">Tên nhóm</MenuItem>
               <MenuItem value="distributors.name">Nhà phân phối</MenuItem>
            </Select>
         </Grid>
         <Grid item xs={0.7} display="flex" justifyContent="flex-end">
            <Box position="relative" ref={refVisibility}>
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
               {openVisibility && columnVisibility && columnVisibilityData && (
                  <Box
                     sx={{
                        position: 'absolute',
                        top: '110%',
                        right: 0,
                        zIndex: 10,
                        width: 'max-content',
                        bgcolor: '#FFF',
                        border: '1px solid #DADADA',
                        borderRadius: '6px',
                        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        py: 1,
                     }}
                  >
                     <ScrollbarBase sx={{ maxHeight: '300px', width: 'max-content', minWidth: '230px' }}>
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
                     </ScrollbarBase>
                  </Box>
               )}
            </Box>
         </Grid>
      </Grid>
   );
};

const Flex = styled('div')({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
});

export default FilterSupplies;
