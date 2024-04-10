/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import brandCarService from '@App/services/brand-car.service';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerDate from '@Core/Component/Input/ControllerDate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SubmitHandler, UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { CarsSchema, carsSchema } from '@App/pages/Cars/utils/cars.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { format } from 'date-fns';
import { successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import carsService from '@App/services/cars.service';

import { RepairInvoiceSchema } from '../../utils/repair-invoice-create';

const ContentModalCar = ({
   watchRepairInvoice,
   handleClose,
   refetchCustomer,
   setValueRepairInvoice,
}: {
   watchRepairInvoice: UseFormWatch<RepairInvoiceSchema>;
   handleClose: () => void;
   setValueRepairInvoice: UseFormSetValue<RepairInvoiceSchema>;
   refetchCustomer: any;
}) => {
   const { control, watch, setValue, setError, clearErrors, handleSubmit } = useForm<CarsSchema>({
      resolver: yupResolver(carsSchema),
      defaultValues: carsSchema.getDefault(),
   });

   setValue('customer_id', watchRepairInvoice('customer.customer_id'));

   const { data: brandCar } = useQuery(['getBrandCarAll'], async () => {
      const res = await brandCarService.get();
      return res.data;
   });

   const { mutate: carsCreate, isLoading } = useMutation({
      mutationFn: async (data: CarsSchema) => {
         const res = await carsService.create({
            ...data,
            production_year: String(format(new Date(data.production_year), 'yyyy')),
         });

         return res.data;
      },
      onSuccess: (data) => {
         successMessage('Tạo mới thông tin xe thành công.');

         setValueRepairInvoice('car.car_id', data._id);
         setValueRepairInvoice('car.brand_car', data.brand_car);
         setValueRepairInvoice('car.car_color', data.car_color);
         setValueRepairInvoice('car.car_name', data.car_name);
         setValueRepairInvoice('car.car_type', data.car_type);
         setValueRepairInvoice('car.license_plate', data.license_plate);

         handleClose();

         return refetchCustomer();
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

   const onSubmitForm: SubmitHandler<CarsSchema> = (data) => carsCreate(data);

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Typography mb={1} id="modal-modal-title" variant="h6" component="h2">
            Thêm mới người dùng & Xe
         </Typography>
         <Grid container spacing={1}>
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
                     name="name"
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
            <LoadingButton type="submit" loading={isLoading} variant="contained">
               Lưu
            </LoadingButton>
         </Box>
      </Box>
   );
};

export default ContentModalCar;
