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
import formatPrice from '@Core/Helper/formatPrice';
import repairServiceCategoriesService from '@App/services/repairServiceCategories.service';
import CarType from './CarType';

interface BaseFormRepairService {
   form: UseFormReturn<RepairServiceSchema>;
   onSubmitForm: SubmitHandler<RepairServiceSchema>;
}

const BaseFormRepairService = ({ form, onSubmitForm }: BaseFormRepairService) => {
   const { handleSubmit, control } = form;

   const { data: repairServiceCategories, isLoading: isLoadingCategories } = useQuery(
      ['getRepairServiceCategories'],
      async () => {
         const res = await repairServiceCategoriesService.get();
         return res.data;
      },
   );

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <PageContent>
            <Grid container spacing={2}>
               <Grid item xs={8}>
                  <Box minHeight="85px">
                     <ControllerLabel title="Tên dịch vụ" required />
                     <ControllerTextField name="name" control={control} placeholder="Tên dịch vụ " />
                  </Box>
               </Grid>
               <Grid item xs={4}>
                  <Box minHeight="85px">
                     <ControllerLabel title="Danh mục" required />
                     <ControllerAutoComplate
                        loading={isLoadingCategories}
                        name="repair_service_category_id"
                        options={(repairServiceCategories as never) ?? []}
                        valuePath="_id"
                        titlePath="name"
                        control={control}
                        placeholder="Chọn danh mục"
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
                  <ControllerLabel title="Giảm giá (%)" />
                  <ControllerTextField name="discount" number control={control} placeholder="Giảm giá " />
               </Grid>
               <Grid item xs={4} minHeight="85px">
                  <ControllerLabel title="Giá sau khi giảm" />
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
                  <Box minHeight="85px">
                     <CarType form={form} />
                  </Box>
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
