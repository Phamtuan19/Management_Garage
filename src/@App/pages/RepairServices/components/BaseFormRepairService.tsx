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
import { LoadingButton } from '@mui/lab';

interface BaseFormRepairService {
   form: UseFormReturn<RepairServiceSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<RepairServiceSchema>;
   isUpdate?: boolean;
}

const BaseFormRepairService = ({ form, onSubmitForm, isLoading, isUpdate }: BaseFormRepairService) => {
   const { handleSubmit, control } = form;

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Box>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
               {isUpdate ? 'Cập nhật' : 'Thêm mới'}
            </LoadingButton>
         </Box>
         <Box sx={{ mt: 2, bgcolor: '#FFFF', p: 2, borderRadius: 2 }}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Box>
                     <ControllerLabel title="Tên dịch vụ" required />
                     <ControllerTextField name="name" control={control} placeholder="Tên dịch vụ " />
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <Box>
                     <ControllerLabel title="Giá" required />
                     <ControllerTextField name="price" number control={control} placeholder="Giá dịch vụ " />
                  </Box>
               </Grid>
               <Grid item xs={12}>
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
                                       writer.setStyle('height', '200px', rootElement);
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
         </Box>
      </Box>
   );
};

export default BaseFormRepairService;
