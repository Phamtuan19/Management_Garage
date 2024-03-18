/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Grid, Modal, Typography } from '@mui/material';
import React, { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import { SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { DeliveryNoteDataDetail } from '@App/types/delivery';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import suppliesInvoiceDetailService from '@App/services/supplies-invoice-detail';
import { DataGetSuppliesInvoiceDetailBySupplieId } from '@App/types/supplies-invoice-detail';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import deliveryDetailService from '@App/services/delivery-detail.service';

import { DeliveryUpdateExportQuantity } from '../utils/delivery';
import { ModalExportSuppliesRef } from '../utils/modal-export-supplies';

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
         setValue,
         setError,
         clearErrors,
         control,
         formState: { errors },
      } = form;
      const exportData = watch('exports');
      const { fields, append, remove } = useFieldArray({
         name: 'exports',
         control,
      });

      useImperativeHandle(ref, () => ({
         setOpen: setOpen,
         setData: setData,
      }));

      const { data: suppliesInvoices } = useQuery(
         ['getSuppliesInvoiceDetailsBySuppliesDetailId', data?.supplies_service_id],
         async () => {
            const res = await suppliesInvoiceDetailService.getBySupplieDetailId(data?.supplies_service_id as string);
            return res.data;
         },
      );
      const { mutate: updateExportDelivery, isLoading } = useMutation({
         mutationFn: async (dataExport: DeliveryUpdateExportQuantity) => {
            return await deliveryDetailService.updateExport(data?._id as string, dataExport);
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

      const handleOnchangeAutoComplete = (v: DataGetSuppliesInvoiceDetailBySupplieId, index: number) => {
         setValue(`exports.${index}.supplies_invoice_id`, v.supplies_invoice_id._id);
         setValue(`exports.${index}.selling_price`, v.selling_price);
         setValue(`exports.${index}.quantity_inventory`, v.quantity_sold);
         setValue(`exports.${index}.discount`, v.discount);
      };

      const handleSubmitForm: SubmitHandler<DeliveryUpdateExportQuantity> = (data) => updateExportDelivery(data);

      const total_export = useMemo(() => {
         // if (data) {
         //    const total_option_export = data.options.reduce((total, item) => {
         //       total += item.export_quantity;
         //       return total;
         //    }, 0);

         //    return data.quantity - total_option_export;
         // }

         return 0;
      }, [data]);

      return (
         <Modal
            open={open}
            // onClose={handleClose}
         >
            <Box sx={style} component="form">
               <Typography id="modal-modal-title" variant="h6" component="h2" mb={1.5}>
                  Xuất vật tư {data && ' - ' + data.supplies_detail_name + ` (${data.supplies_detail_code})`}
               </Typography>
               <Box mb={1.5}>
                  <Box pb={1}>
                     Số lượng cần xuất: <Chip label={total_export} color="primary" />
                  </Box>
                  <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
               </Box>
               <ScrollbarBase sx={{ height: 430 }}>
                  <Grid container spacing={1}>
                     {fields.map((item, index) => {
                        return (
                           <React.Fragment key={item.id}>
                              <Grid item xs={6} minHeight="80px">
                                 <ControllerLabel title="Mã lô hàng" required />
                                 <ControllerAutoComplate
                                    name={`exports.${index}.supplies_invoice_code`}
                                    options={
                                       (suppliesInvoices?.map((item) => ({
                                          key: item.supplies_invoice_id.code,
                                          title: item.supplies_invoice_id.code,
                                          ...item,
                                       })) as never) ?? []
                                    }
                                    valuePath="key"
                                    titlePath="title"
                                    control={control}
                                    onChange={(e: DataGetSuppliesInvoiceDetailBySupplieId) => {
                                       handleOnchangeAutoComplete(e, index);
                                    }}
                                 />
                              </Grid>
                              <Grid item xs={6} minHeight="80px">
                                 <ControllerLabel title="Số lượng xuất" required />
                                 <ControllerTextField
                                    name={`exports.${index}.export_quantity`}
                                    disabled={!watch(`exports.${index}.supplies_invoice_code`)}
                                    number
                                    control={control}
                                    onChangeValue={() => {
                                       const quantityExport = exportData.reduce((quantity, item) => {
                                          quantity += Number(item.export_quantity);
                                          return quantity;
                                       }, 0);

                                       return Number(quantityExport) > Number(data?.quantity)
                                          ? setError(`exports.${index}.export_quantity`, {
                                               message: 'Số lượng đã chọn đã lớn hơn số cần xuất',
                                            })
                                          : clearErrors(`exports.${index}.export_quantity`);
                                    }}
                                 />
                              </Grid>
                              <Grid item xs={4} minHeight="80px">
                                 <ControllerLabel title="Tồn kho" />
                                 <ControllerTextField
                                    disabled
                                    name={`exports.${index}.quantity_inventory`}
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
                                    {index !== 0 && (
                                       <Button
                                          variant="contained"
                                          size="small"
                                          color="error"
                                          sx={{ minWidth: 'auto', p: 1 }}
                                          onClick={() => remove(index)}
                                       >
                                          <DeleteOutlineIcon sx={{ fontSize: '16px' }} />
                                       </Button>
                                    )}
                                    <Button
                                       variant="contained"
                                       size="small"
                                       color="primary"
                                       sx={{ minWidth: 'auto', p: 1 }}
                                       onClick={() =>
                                          append({
                                             supplies_invoice_id: '',
                                             supplies_invoice_code: '',
                                             selling_price: 0,
                                             quantity_inventory: 0,
                                             discount: 0,
                                             export_quantity: 0,
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
