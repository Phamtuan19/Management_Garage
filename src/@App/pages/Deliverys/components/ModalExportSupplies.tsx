/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Grid, Modal, Typography } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { DeliveryNoteDataDetail } from '@App/types/delivery';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import deliveryOptionService from '@App/services/delivery-option-service';

import { DeliveryUpdateExportQuantity } from '../utils/delivery';
import { ModalExportSuppliesRef } from '../utils/modal-export-supplies';

import ControllSupplieInvoice from './ControllSupplieInvoice';

interface ModalExportSuppliesProps {
   form: UseFormReturn<DeliveryUpdateExportQuantity>;
   refetchDelivery: any;
}

const ModalExportSupplies = forwardRef<ModalExportSuppliesRef, ModalExportSuppliesProps>(
   ({ form, refetchDelivery }, ref) => {
      const [open, setOpen] = useState<boolean>(false);
      const [data, setData] = useState<DeliveryNoteDataDetail | null>(null);
      const {
         reset,
         watch,
         handleSubmit,
         control,
         formState: { errors },
      } = form;

      const { append, remove } = useFieldArray({
         name: 'exports',
         control,
      });

      const data_exports = watch('exports');

      useImperativeHandle(ref, () => ({
         setOpen: setOpen,
         setData: setData,
      }));

      const { mutate: updateExportDelivery, isLoading } = useMutation({
         mutationFn: async (dataExport: DeliveryUpdateExportQuantity) => {
            const newData = {
               delivery_id: data?.delivery_id,
               exports: dataExport.exports.map((item) => ({
                  ...(item._id !== '' ? { _id: item._id } : {}),
                  delivery_detail_id: item.delivery_detail_id,
                  repair_invoice_detail_id: item.repair_invoice_detail_id,
                  supplies_service_id: item.supplies_service_id,
                  supplies_invoice_id: item.supplies_invoice_id,
                  supplies_invoice_code: item.supplies_invoice_code,
                  supplies_invoice_detail_id: item.supplies_invoice_detail_id,
                  export_quantity: item.export_quantity,
                  selling_price: item.selling_price,
                  discount: item.discount,
               })),
            };
            return await deliveryOptionService.updateExport(newData);
         },
         onSuccess: (data) => {
            refetchDelivery();
            setOpen(false);
            return successMessage(data.message);
         },
         onError: (err: AxiosError) => {
            return errorMessage(err);
         },
      });

      const { mutate: deleteDeliveryOptionItem, isLoading: isLoadingDelete } = useMutation({
         mutationFn: async (id: string) => {
            return await deliveryOptionService.delete(id);
         },
         onSuccess: (data) => {
            refetchDelivery();
            setOpen(false);
            return successMessage(data.message);
         },
         onError: (err: AxiosError) => {
            return errorMessage(err);
         },
      });

      const handleSubmitForm: SubmitHandler<DeliveryUpdateExportQuantity> = (data) => {
         const total_export_quantity = data.exports.reduce((total, item) => (total += item.export_quantity), 0);
         const isCheck = total_export_quantity <= data.total_quantity;
         if (isCheck) {
            return updateExportDelivery(data);
         }

         return errorMessage('Số lượng xuất lớn hơn số lượng yêu cầu');
      };

      const total_quantity = watch('total_quantity');

      // useMemo(() => {
      //    const total_export_quantity = data_exports.reduce((total, item) => (total += item.export_quantity), 0);

      //    if (total_export_quantity === 0) {
      //       clearErrors('exports.0.export_quantity');
      //       return false;
      //    }

      //    if (total_quantity > data_exports.reduce((total, item) => (total += item.export_quantity), 0)) {
      //       clearErrors('exports.0.export_quantity');
      //       return true;
      //    }

      //    setError('exports.0.export_quantity', { message: 'Tổng số lượng xuất vượt quá số lượng yêu cầu' });
      //    return false;
      // }, [data_exports, total_quantity]);

      const handleDeleteOption = (index: number, id: string = '') => {
         if (id !== '') {
            return deleteDeliveryOptionItem(id);
         }

         return remove(index);
      };

      return (
         <Modal open={open}>
            <Box sx={style} component="form">
               <Typography id="modal-modal-title" variant="h6" component="h2" mb={1.5}>
                  Xuất vật tư {data && ' - ' + data.supplies_detail_name + ` (${data.supplies_detail_code})`}
               </Typography>
               <Box mb={1.5}>
                  <Box pb={1}>
                     Số lượng cần xuất: <Chip label={total_quantity} color="primary" />
                  </Box>
                  <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
               </Box>
               <ScrollbarBase sx={{ height: 430 }}>
                  <Grid container spacing={1}>
                     {data_exports.map((item, index) => {
                        return (
                           <React.Fragment key={index}>
                              <Grid item xs={6} minHeight="80px">
                                 <ControllSupplieInvoice form={form} data={data} index={index} />
                              </Grid>
                              <Grid item xs={6} minHeight="80px">
                                 <ControllerLabel title="Số lượng xuất" required />
                                 <ControllerTextField
                                    name={`exports.${index}.export_quantity`}
                                    disabled={!watch(`exports.${index}.supplies_invoice_code`)}
                                    number
                                    control={control}
                                 />
                              </Grid>
                              <Grid item xs={4} minHeight="80px">
                                 <ControllerLabel title="Tồn kho" />
                                 <ControllerTextField
                                    disabled
                                    name={`exports.${index}.quantity_sold`}
                                    control={control}
                                 />
                              </Grid>
                              <Grid item xs={4} minHeight="80px">
                                 <ControllerLabel title="Giá bán (đ)" />
                                 <ControllerTextField
                                    disabled
                                    name={`exports.${index}.selling_price`}
                                    control={control}
                                 />
                              </Grid>
                              <Grid item xs={4} minHeight="80px">
                                 <ControllerLabel title="Giảm giá (%)" />
                                 <ControllerTextField disabled name={`exports.${index}.discount`} control={control} />
                              </Grid>
                              <Grid item xs={12}>
                                 <Box display="flex" justifyContent="flex-end" gap={1.5}>
                                    {item._id === '' ? (
                                       index !== 0 && (
                                          <LoadingButton
                                             variant="contained"
                                             size="small"
                                             color="error"
                                             sx={{ minWidth: 'auto', p: 1 }}
                                             onClick={() => handleDeleteOption(index, item._id)}
                                             loading={isLoadingDelete}
                                          >
                                             <DeleteOutlineIcon sx={{ fontSize: '16px' }} />
                                          </LoadingButton>
                                       )
                                    ) : (
                                       <LoadingButton
                                          variant="contained"
                                          size="small"
                                          color="error"
                                          sx={{ minWidth: 'auto', p: 1 }}
                                          onClick={() => handleDeleteOption(index, item._id)}
                                          loading={isLoadingDelete}
                                       >
                                          <DeleteOutlineIcon sx={{ fontSize: '16px' }} />
                                       </LoadingButton>
                                    )}
                                    <Button
                                       variant="contained"
                                       size="small"
                                       color="primary"
                                       sx={{ minWidth: 'auto', p: 1 }}
                                       onClick={() =>
                                          append({
                                             _id: '',
                                             delivery_detail_id: '',
                                             export_quantity: 0,
                                             repair_invoice_detail_id: '',
                                             supplies_invoice_code: '',
                                             selling_price: 0,
                                             quantity_sold: 0,
                                             supplies_invoice_detail_id: '',
                                             discount: 0,
                                             supplies_invoice_id: '',
                                             supplies_service_id: '',
                                          })
                                       }
                                    >
                                       <AddIcon sx={{ fontSize: '16px' }} />
                                    </Button>
                                 </Box>
                              </Grid>
                              <Grid item xs={12} sx={{ borderBottom: '1px solid #DADADA' }}></Grid>
                           </React.Fragment>
                        );
                     })}
                  </Grid>
               </ScrollbarBase>
               <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                     variant="outlined"
                     color="error"
                     onClick={() => {
                        setOpen(false);
                        reset();
                     }}
                     disabled={isLoading}
                  >
                     Hủy
                  </Button>
                  <LoadingButton
                     variant="contained"
                     onClick={handleSubmit(handleSubmitForm)}
                     loading={isLoading}
                     disabled={!errors}
                  >
                     Xuất vật tư
                  </LoadingButton>
               </Box>
            </Box>
         </Modal>
      );
   },
);

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 650,
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: '12px',
   borderRadius: '6px',
};

export default ModalExportSupplies;
