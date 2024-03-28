/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Grid, Typography } from '@mui/material';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { useQuery } from '@tanstack/react-query';
import distributorService from '@App/services/distributor.service';
import { errorMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useCallback, useMemo } from 'react';
import brandCarService from '@App/services/brand-car.service';
import { useParams } from 'react-router-dom';

import { SuppliesSchema } from '../utils/supplies.schema';

const FormSuppliesDetails = ({ form }: { form: UseFormReturn<SuppliesSchema> }) => {
   const { id: suppliesId } = useParams();
   const { control, watch } = form;

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'details',
   });

   const materials_catalog_id = watch('materials_catalog_id');

   const { data: distributors } = useQuery(
      ['getDistributors', materials_catalog_id],
      async () => {
         const res = await distributorService.getAllField({ materials_catalog_id });
         return res.data as { _id: string; name: string }[];
      },
      {
         onError: (err: AxiosError) => {
            const dataError = err.response?.data as HandleErrorApi;
            return errorMessage(dataError?.message as unknown as string);
         },
      },
   );

   const { data: brandCar } = useQuery(['getBrandCarAll'], async () => {
      const res = await brandCarService.get();
      return res.data;
   });

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

   const details = watch('details') ?? [];

   // console.log(distributors);
   // const newData = useCallback(
   //    (index: number) => {
   //       if (distributors && distributors.length > 0) {
   //          if (details.length > 0) {
   //             const detail_distributor_id = details[index].distributor_id;
   //             const a = distributors.filter((item1) => {
   //                console.log(item1);
   //                // if (item1._id === detail_distributor_id) {
   //                //    return item1;
   //                // }

   //                return item1;

   //                // return details.some((v) => v.distributor_id !== item1._id);
   //             });

   //             // console.log(a);

   //             return a;
   //          }

   //          return distributors;
   //       }
   //       return [];
   //    },
   //    [distributors, details],
   // );

   const newData = useCallback(
      (index: number) => {
         if (distributors) {
            if (details.length > 0) {
               return distributors.filter(
                  (item1) =>
                     !details
                        .filter((item2) => {
                           return watch(`details.${index}.distributor_id`) !== item2.distributor_id;
                        })
                        .some((item2) => {
                           return item1._id === item2.distributor_id;
                        }),
               );
            }

            return distributors;
         }
         return [];
      },
      [distributors, details],
   );

   // console.log(newData(0));
   return (
      <Grid item xs={12}>
         <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom="1px solid #E8EAEB">
            <Typography
               variant="h2"
               sx={{
                  fontSize: '1rem',
                  py: '12px',
                  lineHeight: '20px',
                  fontWeight: 500,
               }}
            >
               Thêm vật tư chi tiết
            </Typography>
            {fields.length === 0 && watch('name') && (
               <Button
                  size="small"
                  sx={{ minWidth: 'auto', px: '12px' }}
                  onClick={() =>
                     append({
                        code: '',
                        distributor_id: '',
                        name_detail: watch('name'),
                        describe: '',
                        imported_price: '0',
                        car: [],
                     })
                  }
               >
                  <AddRoundedIcon />
               </Button>
            )}
         </Box>
         {fields.map((item, index) => {
            return (
               <>
                  <Grid container spacing={1} mt={0.5} key={item.id}>
                     <Grid item xs={12} md={1}>
                        <ControllerLabel title="Mã vật tư" />
                        <ControllerTextField
                           disabled
                           placeholder="Tự động"
                           name={`details.${index}.code`}
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={12} md={3}>
                        <ControllerLabel title="Nhà phân phối" required />

                        <ControllerAutoComplate
                           options={(newData(index) as never) || []}
                           valuePath="_id"
                           titlePath="name"
                           name={`details.${index}.distributor_id`}
                           control={control}
                        />
                     </Grid>
                     <Grid item xs={12} md={3}>
                        <ControllerLabel title="Tên riêng" />
                        <ControllerTextField name={`details.${index}.name_detail`} control={control} />
                     </Grid>
                     <Grid item xs={12} md={2}>
                        <ControllerLabel title="Giá nhập dự kiến" />
                        <ControllerTextField number name={`details.${index}.imported_price`} control={control} />
                     </Grid>
                     <Grid item xs={12} md={3}>
                        <ControllerLabel title="Mô tả ngắn" />
                        <ControllerTextField name={`details.${index}.describe`} control={control} />
                     </Grid>
                     <Grid item xs={12} md={11}>
                        <ControllerLabel title="Loại xe sử dụng" />
                        <ControllerAutoComplate
                           name={`details.${index}.car`}
                           options={brandCars.models ?? []}
                           valuePath="key"
                           titlePath="name"
                           control={control}
                           multiple
                        />
                     </Grid>
                     <Grid item xs={12} md={1}>
                        <Box mt="25px" display="flex" gap="3px" justifyContent="flex-end" alignItems="center">
                           {watch(`details.${index}.distributor_id`).length > 0 && fields.length === index + 1 && (
                              <Button
                                 sx={{ minWidth: 'auto', px: '12px' }}
                                 onClick={() =>
                                    append({
                                       code: '',
                                       distributor_id: '',
                                       name_detail: watch('name'),
                                       describe: '',
                                       imported_price: '0',
                                       car: [],
                                    })
                                 }
                              >
                                 <AddRoundedIcon />
                              </Button>
                           )}
                           {!suppliesId && (
                              <Button sx={{ minWidth: 'auto', px: '12px' }} color="error" onClick={() => remove(index)}>
                                 <DeleteOutlineRoundedIcon />
                              </Button>
                           )}
                        </Box>
                     </Grid>
                  </Grid>
               </>
            );
         })}
      </Grid>
   );
};

export default FormSuppliesDetails;
