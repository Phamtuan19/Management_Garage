/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/order */
import { Box, Grid, InputBase, Typography } from '@mui/material';
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { RepairServiceSchema } from '../utils/repairService.schema';
import PageContent from '@App/component/customs/PageContent';
import BaseFormRepairServiceDetail from './BaseFormRepairServiceDetail';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import brandCarService from '@App/services/brand-car.service';
import { useMemo } from 'react';
import formatPrice from '@Core/Helper/formatPrice';

interface BaseFormRepairService {
   form: UseFormReturn<RepairServiceSchema>;
   onSubmitForm: SubmitHandler<RepairServiceSchema>;
}

const BaseFormRepairService = ({ form, onSubmitForm }: BaseFormRepairService) => {
   const { handleSubmit, control } = form;

   const { data: brandCar, isLoading: isLoadingBrandCar } = useQuery(['getBrandCarAll'], async () => {
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

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <PageContent>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Box minHeight="85px">
                     <ControllerLabel title="Tên dịch vụ" required />
                     <ControllerTextField name="name" control={control} placeholder="Tên dịch vụ " />
                  </Box>
               </Grid>
               <Grid item xs={6}>
                  <Box minHeight="85px">
                     <ControllerLabel title="Thương hiệu xe sử dụng dịch vụ" />
                     <ControllerAutoComplate
                        loading={isLoadingBrandCar}
                        multiple
                        name="name"
                        options={models.brands ?? []}
                        valuePath="key"
                        titlePath="name"
                        control={control}
                        placeholder="Chọn thương hiệu xe sử dụng dịch vụ"
                     />
                  </Box>
               </Grid>
               <Grid item xs={6}>
                  <Box minHeight="85px">
                     <ControllerLabel title="Loại xe sử dụng dịch vụ" />
                     <ControllerAutoComplate
                        loading={isLoadingBrandCar}
                        multiple
                        name="name"
                        options={models.models ?? []}
                        valuePath="key"
                        titlePath="name"
                        control={control}
                        placeholder="Chọn loại xe sử dụng dịch vụ"
                     />
                  </Box>
               </Grid>
               <Grid item xs={4}>
                  <Box minHeight="85px">
                     <ControllerLabel title="Giá" required />
                     <ControllerTextField name="price" number control={control} placeholder="Giá dịch vụ " />
                  </Box>
               </Grid>
               <Grid item xs={4} minHeight="85px">
                  <ControllerLabel title="Giảm giá (%)" required />
                  <ControllerTextField name="discount" number control={control} placeholder="Giảm giá " />
               </Grid>
               <Grid item xs={4} minHeight="85px">
                  <ControllerLabel title="Giá sau khi giảm" required />
                  {/* <ControllerTextField name="discount" number control={control} placeholder="Giảm giá " /> */}
                  <InputBase
                     fullWidth
                     value={formatPrice(form.watch('price') - (form.watch('price') * form.watch('discount')) / 100)}
                     size="small"
                     sx={{
                        p: '6px 12px',
                        '.css-7dqvty-MuiInputBase-input': { p: 0 },
                        border: '1px solid rgb(192, 192, 192)',
                        borderRadius: '6px',
                     }}
                     disabled
                  />
               </Grid>
               <Grid item xs={12}>
                  <Controller
                     name="describe"
                     control={control}
                     render={({ field }) => (
                        <>
                           <Typography variant="subtitle1" gutterBottom>
                              Mô tả
                           </Typography>
                           <CKEditor
                              editor={ClassicEditor}
                              data={field.value}
                              onReady={(editor) => {
                                 const rootElement = editor.editing.view.document.getRoot();
                                 if (rootElement !== null) {
                                    editor.editing.view.change((writer) => {
                                       writer.setStyle('min-height', '100px', rootElement);
                                    });
                                 }
                              }}
                              onChange={(_event, editor) => {
                                 const data = editor.getData();
                                 field.onChange(data);
                              }}
                           />
                        </>
                     )}
                  />
               </Grid>
            </Grid>
         </PageContent>
         <PageContent>
            <BaseFormRepairServiceDetail form={form} />
         </PageContent>
      </Box>
   );
};

export default BaseFormRepairService;
