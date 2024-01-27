/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/order */

import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Grid, MenuItem, Select } from '@mui/material';
import { Controller, UseFormReturn } from 'react-hook-form';
import { DistributorSchema } from '../utils/distributor.schema';
import { useQuery } from '@tanstack/react-query';
import { getDistricts, getProvinces, getWards } from '../utils';
interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
}


const FormDistributor = ({ form }: BaseFormPersonnelPropType) => {
   const { control, watch, setValue } = form;

   const watchProvince = watch('address.province') || { name: '' };
   const watchDistrict = watch('address.district');

   const { data: provinces, isLoading: isLoadingProvinces } = useQuery(['getProvinces'], async () => {
      const res = await getProvinces()

      return res.map((item: { code: number, name: string }) => ({
         value: {
            code: item.code,
            name: item.name,
         },
         title: item.name
      }));

   })

   const { data: districts, isLoading: isLoadingDistricts } = useQuery(
      ['getDistrict', watchProvince?.code || 'default'],
      async () => {
         try {
            if (watchProvince?.code) {
               const res = await getDistricts(watchProvince.code);
               const districtData = res.map((item: { code: number; name: string }) => ({
                  value: {
                     code: item.code,
                     name: item.name,
                  },
                  title: item.name,
               }));
               return districtData.length > 0 ? districtData : [];
            } else {
               setValue('address.district', '');
               return [];
            }
         } catch (error) {
            return [];
         }
      }
   );

   const { data: wards, isLoading: isLoadingWard } = useQuery(
      ['getWards', watchDistrict?.code || 'default'],
      async () => {
         try {
            if (watchDistrict?.code) {
               const res = await getWards(watchDistrict.code);

               const wardData = res.map((item: { code: number; name: string }) => ({
                  value: {
                     code: item.code,
                     name: item.name,
                  },
                  title: item.name,
               }));

               return wardData.length > 0 ? wardData : [];
            } else {
               setValue('address.ward', '');
               return [];
            }
         } catch (error) {
            return [];
         }
      }
   );


   return (
      <>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Tỉnh/Thành phố" required />
               <Controller
                  name="address.province"
                  control={control}
                  loading={isLoadingProvinces}
                  render={({ field }) => (
                     <Select
                        {...field}
                        label="Tỉnh/Thành phố"
                        inputProps={{
                           name: 'province',
                           id: 'province-select',
                        }}
                        renderValue={(selected) => (
                           <div>
                              {selected && selected.name}
                           </div>
                        )}
                     >
                        {provinces?.map((province) => (
                           <MenuItem key={province.value.code} value={province.value}>
                              {province.title}
                           </MenuItem>
                        ))}
                     </Select>
                  )}
               />
            </Box>
         </Grid>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Quận/huyện" required />
               <Controller
                  name="address.district"
                  control={control}
                  loading={isLoadingDistricts}
                  render={({ field }) => (
                     <Select
                        {...field}
                        label="Quận/huyện"
                        inputProps={{
                           name: 'district',
                           id: 'district-select',
                        }}
                        renderValue={(selected) => (
                           <div>
                              {selected && selected.name}
                           </div>
                        )}
                     >
                        {districts?.map((district) => (
                           <MenuItem key={district.value.code} value={district.value}>
                              {district.title}
                           </MenuItem>
                        ))}
                     </Select>
                  )}
               />
            </Box>
         </Grid>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Xã/Phường" required />
               <Controller
                  name="address.ward"
                  control={control}
                  loading={isLoadingWard}
                  render={({ field }) => (
                     <Select
                        {...field}
                        label="Xã/Phường"
                        inputProps={{
                           name: 'ward',
                           id: 'ward-select',
                        }}
                        renderValue={(selected) => (
                           <div>
                              {selected && selected.name}
                           </div>
                        )}
                     >
                        {wards?.map((ward) => (
                           <MenuItem key={ward.value.code} value={ward.value}>
                              {ward.title}
                           </MenuItem>
                        ))}
                     </Select>
                  )}
               />
            </Box>
         </Grid>
      </>
   );
};
export default FormDistributor;