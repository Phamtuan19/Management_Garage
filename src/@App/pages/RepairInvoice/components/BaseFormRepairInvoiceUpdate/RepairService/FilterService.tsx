/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import {
   Box,
   Button,
   ButtonBase,
   Checkbox,
   Grid,
   InputBase,
   MenuItem,
   Select,
   Stack,
   Typography,
   styled,
} from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';
import { UseFieldArrayAppend, UseFormReturn } from 'react-hook-form';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useQuery } from '@tanstack/react-query';
import repairServiceService from '@App/services/repairService.service';
import useDebounce from '@App/hooks/useDebounce';
import repairServiceCategoriesService from '@App/services/repairServiceCategories.service';
import { errorMessage } from '@Core/Helper/message';
import { RepairInvoiceUpdateSchema } from '@App/pages/RepairInvoice/utils/repair-invoice-update';
import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';

interface FilterServiceProps {
   form: UseFormReturn<RepairInvoiceUpdateSchema>;
   columnVisibility: Record<string, boolean>;
   setColumnVisibility: React.Dispatch<any>;
   columnVisibilityData: Record<string, string>;
   append: UseFieldArrayAppend<RepairInvoiceUpdateSchema>;
}

interface RepairServiceItem {
   code: string;
   createdAt: string;
   describe: string;
   discount: number;
   name: string;
   price: number;
   updatedAt: string;
   _id: string;
   repair_service_category_id: {
      _id: string;
      name: string;
   };
   details:
      | Array<{
           name: string;
           describe: string;
        }>
      | [];
}

const FilterService = ({
   append,
   columnVisibility,
   columnVisibilityData,
   form,
   setColumnVisibility,
}: FilterServiceProps) => {
   const [valueSearch, setValueSearch] = useState<string>('');
   const [open, setOpen] = useState<boolean>(false);
   const [openVisibility, setOpenVisibility] = useState<boolean>(false);
   const [category_id, setCategory_id] = useState<string>('');

   const { watch } = form;

   const ref = useRef<HTMLElement>(null);
   const refVisibility = useRef<HTMLElement>(null);

   useOnClickOutside(ref, () => setOpen(false));
   useOnClickOutside(refVisibility, () => setOpenVisibility(false));

   const carName = watch('car.car_name');
   const repairServiceForm = watch('repairService');
   const valueDebounce = useDebounce(valueSearch, 500);

   const { data: repairService } = useQuery(
      ['getAllFieldRepairServices', valueDebounce, carName, category_id],
      async () => {
         const res = await repairServiceService.fieldAll({
            q: valueDebounce ?? '',
            car_name: carName,
            ...(category_id ? { repair_service_category_id: category_id } : {}),
         });
         return res.data;
      },
   );

   const { data: repairServiceCategories } = useQuery(['getRepairServiceCategories'], async () => {
      const res = await repairServiceCategoriesService.get({});
      return res.data;
   });

   const dataFilterSupplie = useMemo(() => {
      if (repairService && repairServiceForm) {
         if (repairServiceForm.length === 0) {
            return repairService;
         }

         return repairService.filter(
            (item1) => !repairServiceForm.some((item2) => item1._id === item2.repair_invoice_id),
         );
      }

      return [];
   }, [repairService, repairServiceForm]);

   const handleClickAddService = (service: RepairServiceItem) => {
      const isCheck = repairServiceForm.some(
         (item) => item.repair_service_category_id === service.repair_service_category_id._id,
      );

      if (!isCheck) {
         append({
            _id: '',
            repair_invoice_id: service._id,
            price: service.price,
            discount: service.discount,
            type: 'service',
            describe: '',
            repair_staff_id: '',
            status_repair: STATUS_REPAIR_DETAIL.empty.key,
            repair_service_code: service.code,
            repair_service_name: service.name,
            repair_service_category_id: service.repair_service_category_id._id,
            repair_service_category_name: service.repair_service_category_id.name,
            details: service.details.map((item) => ({
               name: item.name,
               describe: item.describe,
               note: '',
               _id: '',
            })),
         });

         return setOpen(false);
      }

      errorMessage('Không thể chọn nhiều dịch vụ cùng danh mục.');
      return setOpen(false);
   };

   return (
      <Grid container spacing={2}>
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
                  placeholder="Tìm kiếm dịch vụ"
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
                                       onClick={() => {
                                          handleClickAddService(item as RepairServiceItem);
                                       }}
                                    >
                                       <Flex sx={{ flexDirection: 'column', flex: 1, gap: '6px' }}>
                                          <Box sx={{ width: '100%', textAlign: 'left' }}>{item.name}</Box>
                                          <Flex sx={{ width: '100%', gap: '12px' }}>
                                             <Box>
                                                <span>#{item.code}</span>
                                             </Box>
                                          </Flex>
                                       </Flex>
                                    </ButtonBase>
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
         <Grid item xs={3}>
            <Select fullWidth onChange={(e) => setCategory_id(e.target.value)} value={category_id}>
               {repairServiceCategories &&
                  repairServiceCategories?.map((item: any) => {
                     return <MenuItem value={item._id}>{item.name}</MenuItem>;
                  })}
            </Select>
         </Grid>
         <Grid item xs={0.7} display="flex" justifyContent="flex-end">
            <Box position="relative" display="flex" justifyContent="flex-end" ref={refVisibility}>
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

export default FilterService;
