/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import React, { useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import brandCarService from '@App/services/brand-car.service';
import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';

import { RepairServiceSchema } from '../utils/repairService.schema';

interface CarTpyeProps {
   form: UseFormReturn<RepairServiceSchema>;
}

const CarType = ({ form }: CarTpyeProps) => {
   const { control, setValue } = form;
   const [valueRadio, setValueRadio] = useState('all');

   const { data: brandCar, isLoading } = useQuery(['getBrandCarAll'], async () => {
      const res = await brandCarService.get();
      return res.data;
   });

   const models = useMemo(() => {
      const brands =
         brandCar?.map((item: any) => ({
            key: item.name,
            name: item.name,
         })) ?? [];

      const models =
         brandCar?.flatMap((item: any) => {
            return item.models.map((model: unknown) => {
               return { key: model, name: model };
            });
         }) ?? [];

      return {
         brands,
         models,
      };
   }, [brandCar]);

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValueRadio((event.target as HTMLInputElement).value);

      if (event.target.value === 'all') {
         return setValue(
            'cars',
            models.models.map((item: { key: string }) => item.key),
         );
      }
   };

   return (
      <Box display="flex" flexDirection="column" gap={1}>
         <ControllerLabel title="Loại xe sử dụng dịch vụ" />

         <RadioGroup
            value={valueRadio}
            onChange={handleChange}
            sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 1 }}
         >
            <FormControlLabel value="all" control={<Radio />} label="Tất cả" />
            <FormControlLabel value="brand" control={<Radio />} label="Thương hiệu" />
            <FormControlLabel value="custom" control={<Radio />} label="Tùy chọn" />
         </RadioGroup>

         {valueRadio === 'brand' && (
            <ControllerAutoComplate
               loading={isLoading}
               name="brand_car"
               options={models.brands ?? []}
               valuePath="key"
               titlePath="name"
               control={control}
               onChange={(e) => {
                  const cars = brandCar?.find((item: { name: string }) => item.name === e.key);
                  setValue('cars', cars.models);
               }}
            />
         )}

         <ControllerAutoComplate
            loading={isLoading}
            multiple
            name="cars"
            options={models.models ?? []}
            valuePath="key"
            titlePath="name"
            control={control}
            placeholder="Chọn loại xe sử dụng dịch vụ"
         />
      </Box>
   );
};

export default CarType;
