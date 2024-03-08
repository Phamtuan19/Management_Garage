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
import { useCallback } from 'react';

import { SuppliesSchema } from '../utils/supplies.schema';

const FormSuppliesDetails = ({ form }: { form: UseFormReturn<SuppliesSchema> }) => {
   const { control, watch } = form;

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'details',
   });

   const materials_catalog_id = watch('materials_catalog_id');

   const { data: distributors } = useQuery(
      ['getDistributors'],
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

   const details = watch('details') ?? [];

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
                     <Grid item xs={12} md={1}>
                        <ControllerLabel title="Giá nhập" />
                        <ControllerTextField number name={`details.${index}.imported_price`} control={control} />
                     </Grid>
                     <Grid item xs={12} md={2.8}>
                        <ControllerLabel title="Mô tả ngắn" />
                        <ControllerTextField name={`details.${index}.describe`} control={control} />
                     </Grid>
                     <Grid item xs={12} md={1.2}>
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
                                    })
                                 }
                              >
                                 <AddRoundedIcon />
                              </Button>
                           )}
                           <Button sx={{ minWidth: 'auto', px: '12px' }} color="error" onClick={() => remove(index)}>
                              <DeleteOutlineRoundedIcon />
                           </Button>
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
