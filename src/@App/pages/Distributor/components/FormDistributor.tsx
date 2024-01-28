/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Grid } from '@mui/material';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import { DistributorSchema } from '../utils/distributor.schema';
import { getDistricts, getProvinces, getWards } from '../utils';

import ControllerAutoComplete from './ControllerAutoComplete';
interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
}

const FormDistributor = ({ form }: BaseFormPersonnelPropType) => {
   const { control, watch, setValue } = form;
   const watchProvince = watch('address.province.code');
   const watchDistrict = watch('address.district.code');

   const { data: provinces } = useQuery(['getProvinces'], async () => {
      const res = await getProvinces();
      return res;
   });

   const {
      mutate: handleGetDistrict,
      data: districts,
      isLoading: isLoadingDistricts,
   } = useMutation(['getDistrict', watchProvince], async () => {
      const res = await getDistricts(watchProvince);
      return res;
   });

   const {
      mutate: handleGetWard,
      data: wards,
      isLoading: isLoadingWard,
   } = useMutation(['getWards', watchDistrict], async () => {
      const res = await getWards(watchDistrict);
      return res;
   });

   return (
      <>
         <Grid item xs={12} md={6}>
            <Box height="96.5px">
               <ControllerLabel title="Tỉnh/Thành phố" required />
               <ControllerAutoComplete
                  onChangeValue={(value) => {
                     setValue('address.province.name', value['name'] as string);
                     handleGetDistrict();
                  }}
                  onChangeClose={() => {
                     setValue('address.district.code', '');
                     setValue('address.district.name', '');
                     setValue('address.province.name', '');
                     setValue('address.province.code', '');
                     setValue('address.wards.code', '');
                     setValue('address.wards.name', '');
                     handleGetDistrict();
                  }}
                  name="address.province.code"
                  options={provinces || []}
                  control={control as unknown as Control<FieldValues>}
               />
            </Box>
         </Grid>
         <Grid item xs={12} md={6}>
            <Box height="96.5px">
               <ControllerLabel title="Quận/huyện" required />
               <ControllerAutoComplete
                  onChangeValue={(value) => {
                     setValue('address.district.name', value['name'] as string);
                     handleGetWard();
                  }}
                  onChangeClose={() => {
                     setValue('address.district.name', '');
                     setValue('address.district.code', '');
                     setValue('address.wards.name', '');
                     setValue('address.wards.code', '');
                     handleGetWard();
                  }}
                  name="address.district.code"
                  loading={isLoadingDistricts}
                  options={districts || []}
                  control={control as unknown as Control<FieldValues>}
               />
            </Box>
         </Grid>
         <Grid item xs={12} md={6}>
            <Box height="96.5px">
               <ControllerLabel title="Xã/Phường" required />
               <ControllerAutoComplete
                  name="address.wards.code"
                  onChangeValue={(value) => {
                     setValue('address.wards.name', value['name'] as string);
                  }}
                  loading={isLoadingWard}
                  options={wards || []}
                  control={control as unknown as Control<FieldValues>}
               />
            </Box>
         </Grid>
      </>
   );
};

export default FormDistributor;
