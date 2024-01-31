/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Grid, Typography } from '@mui/material';
import { Control, FieldValues, UseFormReturn, useFieldArray } from 'react-hook-form';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { useQuery } from '@tanstack/react-query';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import { errorMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';

import { MaterialsCatalogSchema } from '../utils/materialsCatalog.schema';

const FormSuppliesDetails = ({ form }: { form: UseFormReturn<MaterialsCatalogSchema> }) => {
   const { control, watch } = form;

   const { fields, append, remove } = useFieldArray({
      control,
      name: 'details',
   });

   const { data: distributors } = useQuery(
      ['getDistributors'],
      async () => {
         const res = await distributorService.get({ limit: 10000 });
         return res.data;
      },
      {
         onError: (err: AxiosError) => {
            const dataError = err.response?.data as HandleErrorApi;
            return errorMessage(dataError?.message as unknown as string);
         },
      },
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
               {/* <Box component="span" ml={0.5} color="red">
          *
       </Box> */}
            </Typography>
            {fields.length === 0 && watch('name') && (
               <Button
                  size="small"
                  sx={{ minWidth: 'auto', px: '12px' }}
                  onClick={() => append({ distributor_id: '', name_detail: watch('name'), describe: '' })}
               >
                  <AddRoundedIcon />
               </Button>
            )}
         </Box>
         {fields.map((item, index) => {
            return (
               <>
                  <Grid container spacing={2} mt={1} key={item.id}>
                     <Grid item xs={12} md={3}>
                        <ControllerLabel title="Nhà phân phối" required />

                        <ControllerSelect
                           options={(distributors?.data as IDistributor[]) || []}
                           valuePath="_id"
                           titlePath="name"
                           name={`details.${index}.distributor_id`}
                           control={control as unknown as Control<FieldValues>}
                        />
                     </Grid>
                     <Grid item xs={12} md={3}>
                        <ControllerLabel title="Tên riêng" />
                        <ControllerTextField name={`details.${index}.name_detail`} control={control} />
                     </Grid>
                     <Grid item xs={12} md={4}>
                        <ControllerLabel title="Mô tả ngắn" />
                        <ControllerTextField name={`details.${index}.describe`} control={control} />
                     </Grid>
                     <Grid item xs={12} md={2}>
                        <Box mt="25px" display="flex" gap="6px" justifyContent="flex-end" alignItems="center">
                           {watch(`details.${index}.distributor_id`).length > 0 && fields.length === index + 1 && (
                              <Button
                                 sx={{ minWidth: 'auto', px: '12px' }}
                                 onClick={() =>
                                    append({ distributor_id: '', name_detail: watch('name'), describe: '' })
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
