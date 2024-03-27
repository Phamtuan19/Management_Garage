/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-misused-promises */
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Box, Button, Modal, Typography } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import repairServiceCategoriesService from '@App/services/repairServiceCategories.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';

import { ValidationFormCategory, validationFormCategory } from '../utils/repairService.schema';

interface ModalCreateCategoriesProps {}

export interface ModalCreateCategoriesRef {
   handleOpen: () => void;
}

const ModalCreateCategories = forwardRef<ModalCreateCategoriesRef, ModalCreateCategoriesProps>(({}, ref) => {
   const [open, setOpen] = useState(false);

   const { handleSubmit, control } = useForm<ValidationFormCategory>({
      resolver: yupResolver(validationFormCategory),
      defaultValues: validationFormCategory.getDefault(),
   });

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   useImperativeHandle(ref, () => ({
      handleOpen: handleOpen,
   }));

   const { mutate: createCategory, isLoading } = useMutation({
      mutationFn: async (data: ValidationFormCategory) => {
         return await repairServiceCategoriesService.create(data);
      },
      onSuccess: () => {
         successMessage('Thêm mới thành công');
         handleClose();
         return;
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const handleSubmitForm: SubmitHandler<ValidationFormCategory> = (data) => createCategory(data);

   return (
      <Modal open={open}>
         <Box component="form" sx={style} onSubmit={handleSubmit(handleSubmitForm)}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Thêm mới danh mục dịch vụ
            </Typography>
            <Box minHeight="90px" my={2}>
               <ControllerLabel title="Tên danh mục" />
               <ControllerTextField name="name" control={control} />
            </Box>

            <Box display="flex" justifyContent="flex-end" gap={1.5}>
               <Button color="error" onClick={handleClose}>
                  Hủy
               </Button>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  Thêm mới
               </LoadingButton>
            </Box>
         </Box>
      </Modal>
   );
});

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   bgcolor: 'background.paper',
   borderRadius: 1,
   boxShadow: 24,
   p: 1.5,
};

export default ModalCreateCategories;
