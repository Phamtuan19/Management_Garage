/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import {  Box,  Grid, Typography } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getDistricts, getProvinces, getWards } from '../utils';
import { DistributorSchema } from '../utils/distributor.schema';
// import { DistributorSchema } from '../utils/distributor.schema';
// import { useState } from 'react';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<DistributorSchema>;
}

const BaseFormDistributor = ({ form, onSubmitForm, isLoading }: BaseFormPersonnelPropType) => {
   const { id: distributorId } = useParams();
   const { control, handleSubmit, watch, setValue } = form;

   const watchProvince = watch('province');
   const watchDistrict = watch('district');
console.log("watchProvince", watchProvince);

   // const fetchLocations = async (type, code) => {
      
   //    const res = await type(code);
   //    console.log(res);

   //    return res.map((item: { code: string; name: string }) => ({
   //       value: `${item.code}-${item.name}`,
   //       title: item.name,
   //    }));
   // };
   // const { data: provinces, isLoading: isLoadingProvinces } = useQuery(['getProvinces'], () => fetchLocations(getProvinces));
// console.log(selectedProvince);

   const { data: provinces, isLoading: isLoadingProvinces } = useQuery(['getProvinces'], async () => {
      const res = await getProvinces();

      return res.map((item: { code: string; name: string }) => ({
         value: item.code + '-' + item.name,
         title: item.name,
      }));
   });

   // console.log("provinces", provinces);
   // const { data: districts, isLoading: isLoadingDistricts } = useQuery(['getDistrict', watchProvince.value], () =>{
   //    fetchLocations(getDistricts, watchProvince.value.split('-')[0])
   //    setValue('district', '');
   //    return [];
   // });

   // const { data: wards, isLoading: isLoadingWard } = useQuery(['getWards', watchDistrict.value], () =>{
   //    fetchLocations(getWards, watchDistrict.value.split('-')[0])
      
   //    setValue('ward', '');
   //    return [];
   // }
   // );


   // const Province = watchProvince.value;
   // console.log(Province);
   // const pro = {value}
   
   const { data: districts, isLoading: isLoadingDistricts } = useQuery(['getDistrict', watchProvince], async () => {
      console.log("Province", watchProvince);

      if (watchProvince) {
         const res = await getDistricts(watchProvince.split('-')[0]);
         // console.log("Districts API Response:", res);
         return res.map((item: { code: string; name: string }) => ({
            value: item.code + '-' + item.name,
            title: item.name,
         }));
      }

      setValue('district', '');
      return [];
   });
   console.log("districs", districts);
   // const Wards = watchDistrict;
   const { data: wards, isLoading: isLoadingWard } = useQuery(['getWards', watchDistrict], async () => {
      if (watchDistrict) {
         const res = await getWards(watchDistrict.split('-')[0]);
         return res.map((item: { code: string; name: string }) => ({
            value: item.code + '-' + item.name,
            title: item.name,
         }));
      }
      setValue('ward', '');
      return [];
   });

//    const [selectedProvince, setSelectedProvince] = useState('');
//    const [selectedDistrict, setSelectedDistrict] = useState('');
//    const [selectedWards, setSelectedWards] = useState('');
// // console.log(selectedProvince);

//    const handleSelectionChange = (field, value) => {
//       console.log("value", value);
      
//       setValue(field, value);
//       switch (field) {
//          case 'province':
//             setSelectedProvince(value ? value.title : '');
//             break;
//          case 'district':
//             setSelectedDistrict(value ? value.title : '');
//             // setSelectedDistrict('district', '');
//             break;
//          case 'ward':
//             setSelectedWards(value ? value.title : '');
//             break;
//          default:
//             break;
//       }
      // const newAddress = `  ${watchProvince} - ${watchDistrict}`;
      // setValue('address', newAddress);
      // const newAddress = `${watchProvince ? watchProvince.title : ''}, ${watchDistrict.value ? watchDistrict.title : ''}, ${value ? value.title : ''}`;
      // // const newAddress = `${selectedProvince} - ${selectedDistrict} - ${value ? value.title : ''}`;
      // // console.log(newAddress)
      // setValue('address', newAddress);
   // };
   
   return (
      <div>
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography component="h4" sx={{ fontWeight: 600 }}>
                     Thông tin nhà phân phối:
                  </Typography>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên nhà phân phối" required />
                     <ControllerTextField string name="name" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Email" required />
                     <ControllerTextField name="email" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Số điện thoại" required />
                     <ControllerTextField number name="phone" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}></Grid>

               <Grid item xs={12}>
                  <Typography component="h4" sx={{ fontWeight: 600 }}>
                     Thông tin thanh toán:
                  </Typography>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Số tài khoản ngân hàng" required />
                     <ControllerTextField number name="bank_account_number" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên ngân hàng" required />
                     <ControllerTextField name="bank_name" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên chi nhánh" required />
                     <ControllerTextField name="bank_branch" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên chủ tài khoản" required />
                     <ControllerTextField name="account_holder_name" control={control} />
                  </Box>
               </Grid>

               <Grid item xs={12}>
                  <Typography component="h4" sx={{ fontWeight: 600 }}>
                     Địa chỉ:
                  </Typography>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tỉnh/Thành phố" required />
                     <ControllerAutoComplate
                        name="province"
                        valuePath="value"
                        titlePath="title"
                        loading={isLoadingProvinces}
                        options={provinces || []}
                        control={control}
                        // onChange={(_, value) => handleSelectionChange('province', value)}
                     // onChange={handleProvinceChange}
                     // ${selectedProvince} 
                     />
                     {/* <Autocomplete
                        // name={province}
                         name="province"
                        // value="province"
                        // valuePath="value"
                        // titlePath="title"
                        control={control}
                        loading={isLoadingProvinces}
                        options={provinces || []}
                        getOptionLabel={(option) => (option ? option.title : "")}
                        renderInput={(params) => (
                           <TextField {...params} variant="outlined" />
                        )}
                     /> */}
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Quận/huyện" required />
                     <ControllerAutoComplate
                        name="district"
                        valuePath="value"
                        titlePath="title"
                        loading={isLoadingDistricts}
                        options={districts || []}
                        control={control}
                        // onChange={(_, value) => 
                        //    // console.log(value.value)}
                        //  handleSelectionChange('district', value)}
                     // onChange={handleDistrictChange}

                     />
                     {/* <Autocomplete
                        // name="province"
                        loading={isLoadingDistricts}
                        options={districts || []}
                        getOptionLabel={(option) => (option ? option.title : "")}
                        renderInput={(params) => (
                           <TextField {...params} label="Quận/Huyện" variant="outlined" />
                        )}
                     /> */}
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Xã/Phường" required />
                     <ControllerAutoComplate
                        name="ward"
                        valuePath="value"
                        titlePath="title"
                        loading={isLoadingWard}
                        options={wards || []}
                        control={control}
                        // onChange={(_, value) => handleSelectionChange('ward', value)}

                     />
                     {/* <Autocomplete
                        // name="province"
                        loading={isLoadingWard}
                        options={wards || []}
                        getOptionLabel={(option) => (option ? option.title : "")}
                        renderInput={(params) => (
                           <TextField {...params} label="Xã/Phường" variant="outlined" />
                        )}
                     /> */}
                  </Box>
               </Grid>

               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Địa chỉ cụ thể" required />
                     <ControllerTextField name="address" control={control} />
                  </Box>
               </Grid>
               <Grid item>
                  <LoadingButton type="submit" variant="contained" loading={isLoading}>
                     {distributorId ? 'Cập nhật' : 'Thêm mới'}
                  </LoadingButton>
               </Grid>
            </Grid>
         </form>
      </div>
   );
};

export default BaseFormDistributor;
