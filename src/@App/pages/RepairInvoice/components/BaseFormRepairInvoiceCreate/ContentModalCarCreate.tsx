/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Control, FieldValues, SubmitHandler, UseFormSetValue, useForm } from 'react-hook-form';
import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';
import { LoadingButton } from '@mui/lab';
import { useMutation, useQuery } from '@tanstack/react-query';
import brandCarService from '@App/services/brand-car.service';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerDate from '@Core/Component/Input/ControllerDate';
import customerService from '@App/services/customer.service';
import carsService from '@App/services/cars.service';
import { successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';

import { RepairInvoiceSchema } from '../../utils/repair-invoice-create';
import { CarSchema, carSchema } from '../../utils/repair-invoice-car-create';

const ContentModalCarCreate = ({
   handleClose,
   setValueRepairInvoice,
   refetchCustomer,
}: {
   handleClose: () => void;
   setValueRepairInvoice: UseFormSetValue<RepairInvoiceSchema>;
   refetchCustomer: any;
}) => {
   const { control, watch, setError, setValue, clearErrors, handleSubmit } = useForm<CarSchema>({
      resolver: yupResolver(carSchema),
      defaultValues: carSchema.getDefault(),
   });

   const { data: brandCar } = useQuery(['getBrandCarAll'], async () => {
      const res = await brandCarService.get();
      return res.data;
   });

   const { mutate, isLoading } = useMutation({
      mutationFn: async (data: CarSchema) => {
         const {
            name,
            email,
            gender,
            phone,
            brand_car,
            car_color,
            car_name,
            car_type,
            license_plate,
            production_year,
         } = data;
         const res = await customerService.create({ name, email, gender, phone });

         if (
            res.success &&
            brand_car !== '' &&
            car_color !== '' &&
            car_name !== '' &&
            car_type !== '' &&
            license_plate !== '' &&
            production_year !== ''
         ) {
            const resCar = await carsService.create({
               customer_id: res.data._id,
               brand_car,
               car_color,
               name: car_name,
               car_type,
               license_plate,
               production_year,
            });

            return {
               customer: res.data,
               car: resCar.data,
            };
         }

         return {
            customer: res.data,
            car: null,
         };
      },
      onSuccess: (data) => {
         successMessage('Thêm mới thành công');
         const { car, customer } = data;
         setValueRepairInvoice('customer.customer_id', customer._id);
         setValueRepairInvoice('customer.email', customer.email);
         setValueRepairInvoice('customer.phone', customer.phone);

         if (car) {
            setValueRepairInvoice('car.car_id', car._id);
            setValueRepairInvoice('car.brand_car', car.brand_car);
            setValueRepairInvoice('car.car_color', car.car_color);
            setValueRepairInvoice('car.car_name', car.car_name);
            setValueRepairInvoice('car.car_type', car.car_type);
            setValueRepairInvoice('car.license_plate', car.license_plate);
         }

         refetchCustomer();
         return handleClose();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;
         return setErrorMessageHookForm(setError, dataError.data as never);
      },
   });

   const brand_car = watch('brand_car');
   const brand_name = watch('name');

   const brandCars = useMemo(() => {
      const brands =
         brandCar?.map((item: any) => ({
            key: item.name,
            name: item.name,
         })) ?? [];

      const models =
         brandCar?.flatMap((item: any) => {
            return item.models.map((model: any) => {
               return { key: model, name: model };
            });
         }) ?? [];

      return {
         brands,
         models,
      };
   }, [brandCar]);

   const onSubmitForm: SubmitHandler<CarSchema> = (data) => mutate(data);

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Typography id="modal-modal-title" variant="h6" component="h2">
            Thêm mới người dùng & Xe
         </Typography>
         <Grid container spacing={1}>
            <Grid item xs={6}>
               <ControllerLabel title="Tên người dùng" required />
               <ControllerTextField name="name" control={control} />
            </Grid>
            <Grid item xs={6}>
               <ControllerLabel title="Số điện thoại" required />
               <ControllerTextField name="phone" control={control} />
            </Grid>
            <Grid item xs={6}>
               <ControllerLabel title="Email" />
               <ControllerTextField name="email" control={control} />
            </Grid>
            <Grid item xs={6}>
               <ControllerLabel title="Giới tính" />
               <ControllerRadioGroup
                  sx={{ display: 'flex', alignItems: 'center' }}
                  name="gender"
                  options={[
                     { id: 'Nam', title: 'Nam' },
                     { id: 'Nữ', title: 'Nữ' },
                  ]}
                  valuePath="id"
                  titlePath="title"
                  control={control as unknown as Control<FieldValues>}
                  defaultValue="male"
               />
            </Grid>
            <Grid xs={12} height="32px"></Grid>

            <Grid item xs={6}>
               <Box height="87.5px">
                  <ControllerLabel title="Thương hiệu xe" />
                  <ControllerAutoComplate
                     options={brandCars.brands ?? []}
                     valuePath="key"
                     titlePath="name"
                     name="brand_car"
                     control={control}
                  />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box height="87.5px">
                  <ControllerLabel title="Tên xe" />
                  <ControllerAutoComplate
                     options={
                        brandCars.models?.filter(
                           (item: { key: string; name: string }) => brand_car === '' || item.key.includes(brand_car),
                        ) ?? []
                     }
                     valuePath="key"
                     titlePath="name"
                     name="car_name"
                     control={control}
                     onChange={(e) => {
                        const brand =
                           brandCars.brands?.find(
                              (item: { key: string; name: string }) => brand_name === '' || e.key.includes(item.key),
                           ) ?? [];
                        setValue('brand_car', brand.key as string);
                        clearErrors('brand_car');
                     }}
                  />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box height="87.5px">
                  <ControllerLabel title="Biển số xe" />
                  <ControllerTextField name="license_plate" control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box height="87.5px">
                  <ControllerLabel title="Năm sản xuất" />
                  <ControllerDate openTo="year" views={['year']} name="production_year" control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box height="87.5px">
                  <ControllerLabel title="Màu sắc xe" />
                  <ControllerTextField name="car_color" control={control} />
               </Box>
            </Grid>
            <Grid item xs={6}>
               <Box height="87.5px">
                  <ControllerLabel title="Kiểu dáng xe" />
                  <ControllerTextField name="car_type" control={control} />
               </Box>
            </Grid>
         </Grid>

         <Box mt={1} display="flex" justifyContent="flex-end" gap={1}>
            <Button color="error" onClick={handleClose}>
               Hủy
            </Button>
            <LoadingButton loading={isLoading} type="submit" variant="contained">
               Lưu
            </LoadingButton>
         </Box>
      </Box>
   );
};

export default ContentModalCarCreate;
