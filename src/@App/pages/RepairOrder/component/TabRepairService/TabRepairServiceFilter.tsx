/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, ButtonBase, Grid, InputBase, Stack, Typography, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import { useQuery } from '@tanstack/react-query';
import repairServiceService from '@App/services/repairService.service';
import useDebounce from '@App/hooks/useDebounce';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import { errorMessage } from '@Core/Helper/message';
import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

import { RepairInvoiceSchema } from '../../utils/repair-invoice';

interface RepairServiceItem {
   code: string;
   createdAt: string;
   describe: string;
   discount: number;
   name: string;
   price: number;
   updatedAt: string;
   _id: string;
   details:
      | Array<{
           name: string;
           describe: string;
        }>
      | [];
}

const TabRepairServiceFilter = ({
   fieldArray,
}: {
   form: UseFormReturn<RepairInvoiceSchema>;
   fieldArray: UseFieldArrayReturn<RepairInvoiceSchema>;
}) => {
   const { fields, append } = fieldArray;

   const [open, setOpen] = useState<boolean>(false);
   const [valueSearch, setValueSearch] = useState<string>('');
   const ref = useRef<HTMLElement>(null);

   useOnClickOutside(ref, () => setOpen(false));

   const valueDebounce = useDebounce(valueSearch, 500);

   const { data: repairService } = useQuery(['getAllFieldRepairServices', valueDebounce], async () => {
      const res = await repairServiceService.fieldAll({ q: valueDebounce ?? '' });
      return res.data;
   });

   const handleClickSuppliesItem = (service: RepairServiceItem) => {
      const isCheck = fields.some((item: any) => item.repair_service_id === service._id);

      if (!isCheck) {
         return append({
            _id: '',
            describe: '',
            discount: service.discount,
            price: service.price,
            repair_service_id: service._id,
            repair_service_name: service.name,
            quantity: 1,
            repair_service_code: service.code,
            details: service.details.map((detail) => ({
               ...detail,
               note: '',
               personnel_id: '',
               status: STATUS_REPAIR_DETAIL.empty.key,
            })),
         });
      }

      return errorMessage('Dịch vụ đã tồn tại.');
   };

   return (
      <Grid container spacing={2}>
         <Grid item xs={6}>
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
                     {repairService && repairService.length > 0 ? (
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
                              {repairService.map((item) => {
                                 return (
                                    <SearchSuppliesItem
                                       key={item._id}
                                       supplie={item}
                                       //    handleClickSupplieItem={() => handleClickSupplieItem(item)}
                                       handleClickSupplieItem={() => {
                                          handleClickSuppliesItem(item);
                                       }}
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

interface SearchSuppliesItemPropsType {
   supplie: RepairServiceItem;
   handleClickSupplieItem: (supplie: RepairServiceItem) => void;
}

const SearchSuppliesItem = ({ supplie, handleClickSupplieItem }: SearchSuppliesItemPropsType) => {
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
         onClick={() => handleClickSupplieItem(supplie)}
      >
         <LazyLoadingImage src="" w="36" h="36" />
         <Flex sx={{ flexDirection: 'column', flex: 1, gap: '6px' }}>
            <Box sx={{ width: '100%', textAlign: 'left' }}>{supplie.name}</Box>
            <Flex sx={{ width: '100%', gap: '12px' }}>
               <Box>
                  <span>#{supplie.code}</span>
               </Box>
               {/* <Flex sx={{ flex: 2, gap: '3px' }}>{supplie.distributor.name}</Flex> */}
            </Flex>
         </Flex>
      </ButtonBase>
   );
};

const Flex = styled('div')({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-start',
});

export default React.memo(TabRepairServiceFilter);
