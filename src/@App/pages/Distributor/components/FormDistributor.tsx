/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Grid } from '@mui/material';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';

// eslint-disable-next-line import/order
import { DistributorSchema } from '../utils/distributor.schema';
import { useQuery } from '@tanstack/react-query';
import { getDistricts, getProvinces, getWards } from '../utils';
import { IDistributor } from '@App/services/distributor.service';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
}

const FormDistributor = ({ form }: BaseFormPersonnelPropType) => {
   const { control, watch, setValue } = form;
   const watchProvince = watch('address.province');
   const watchDistrict = watch('address.district');

   const { data: provinces, isLoading: isLoadingProvinces } = useQuery<IDistributor, Error>(['getProvinces'], async () => {
      const res = await getProvinces()
      return res.map((item: { code: number, name: string }) => ({
         value: {
            code: item.code,
            name: item.name,
         },
         title: item.name
      }));
   })

   const { data: districts, isLoading: isLoadingDistricts } = useQuery<IDistributor, Error>(
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
            // console.error("Error fetching districts:", error);
            return [];
         }
      }
   );

   const { data: wards, isLoading: isLoadingWard } = useQuery<IDistributor, Error>(
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
            // console.error("Error fetching ward:", error);
            return [];
         }
      }
   );

   return (
      <>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Tỉnh/Thành phố" required />
               <ControllerSelect
                  name="address.province"
                  // value={watchProvince || null}
                  valuePath="value"
                  titlePath="title"
                  loading={isLoadingProvinces}
                  options={provinces || []}
                  control={control as unknown as Control<FieldValues>}
               />
            </Box>
         </Grid>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Quận/huyện" required />
               <ControllerSelect
                  name="address.district"
                  // value={watchProvince || null}
                  valuePath="value"
                  titlePath="title"
                  loading={isLoadingDistricts}
                  options={districts || []}
                  control={control as unknown as Control<FieldValues>}
               />
            </Box>
         </Grid>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Xã/Phường" required />
               <ControllerSelect
                  name="address.ward"
                  // value={watchWard || null}
                  valuePath="value"
                  titlePath="title"
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