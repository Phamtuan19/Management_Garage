/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/order */
import { Box, Grid, Typography } from '@mui/material';
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { RepairServiceSchema } from '../utils/repairService.schema';
import PageContent from '@App/component/customs/PageContent';
import BaseFormRepairServiceDetail from './BaseFormRepairServiceDetail';

interface BaseFormRepairService {
   form: UseFormReturn<RepairServiceSchema>;
   onSubmitForm: SubmitHandler<RepairServiceSchema>;
}

const BaseFormRepairService = ({ form, onSubmitForm }: BaseFormRepairService) => {
   const { handleSubmit, control } = form;

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <PageContent>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Box height="92px">
                     <ControllerLabel title="Tên dịch vụ" required />
                     <ControllerTextField name="name" control={control} placeholder="Tên dịch vụ " />
                  </Box>
               </Grid>
               <Grid item xs={6}>
                  <Box height="92px">
                     <ControllerLabel title="Giá" required />
                     <ControllerTextField name="price" number control={control} placeholder="Giá dịch vụ " />
                  </Box>
               </Grid>
               <Grid item xs={6} height="92px">
                  <ControllerLabel title="Giảm giá (%)" required />
                  <ControllerTextField name="discount" number control={control} placeholder="Giảm giá " />
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
