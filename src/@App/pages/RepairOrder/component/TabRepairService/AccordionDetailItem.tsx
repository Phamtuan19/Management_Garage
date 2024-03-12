// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/naming-convention */
// import { useState } from 'react';
// import { Accordion, AccordionDetails, Box, Grid, TextareaAutosize, Typography, styled } from '@mui/material';
// import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { STATUS_REPAIR_DETAIL, StatusRepairDetail } from '@App/configs/status-config';
// import { Control, FieldValues, UseFormReturn } from 'react-hook-form';
// import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
// import { useQuery } from '@tanstack/react-query';
// import personnelService from '@App/services/personnel.service';
// import ControllerLabel from '@Core/Component/Input/ControllerLabel';
// import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';

// import { RepairInvoiceSchema } from '../../utils/repair-invoice';

// interface AccordionDetailItemProps {
//    form: UseFormReturn<RepairInvoiceSchema>;
//    item: {
//       suppliesServiceIndex: number;
//       name: string;
//       describe: string;
//       status: StatusRepairDetail;
//       personnel_id: string;
//       note: string;
//    };
//    index: number;
// }

// const AccordionDetailItem = ({ item, form, index }: AccordionDetailItemProps) => {
//    const { setValue, watch, setError, clearErrors, control } = form;
//    const [open, setOpen] = useState<boolean>(true);

//    const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
//       const res = await personnelService.fieldAll();
//       return res.data;
//    });

//    const dataStatus = Object.keys(STATUS_REPAIR_DETAIL).map((key) => STATUS_REPAIR_DETAIL[key as StatusRepairDetail]);

//    return (
//       <Box mt={2}>
//          <Accordion
//             expanded={open}
//             sx={{ boxShadow: 'none', borderBottom: '1px solid #E8EAEB' }}
//             onChange={() => {
//                setOpen(!open);
//             }}
//          >
//             <AccordionSummary>
//                <Typography component="h3" sx={{ fontWeight: 400, fontSize: '16px' }}>
//                   {item.name}
//                </Typography>
//             </AccordionSummary>
//             <AccordionDetails sx={{ px: 1, pt: 0, pb: 1 }}>
//                <Grid container spacing={1}>
//                   <Grid item xs={6}>
//                      <ControllerLabel title="Nhân viên thực hiện" />
//                      <ControllerAutoComplate
//                         options={personnels ?? []}
//                         valuePath="_id"
//                         titlePath="full_name"
//                         name={`suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`}
//                         control={control}
//                         disabled={
//                            watch(`suppliesService.${item.suppliesServiceIndex}.details.${index}.status`) ===
//                               STATUS_REPAIR_DETAIL.close.key ||
//                            watch(`suppliesService.${item.suppliesServiceIndex}.details.${index}.status`) ===
//                               STATUS_REPAIR_DETAIL.empty.key
//                         }
//                         onChange={(e) => {
//                            if (e._id) {
//                               clearErrors(`suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`);
//                            }
//                         }}
//                      />
//                   </Grid>
//                   <Grid item xs={6}>
//                      <ControllerLabel title="Trạng thái" />
//                      <ControllerAutoComplate
//                         options={dataStatus}
//                         valuePath="key"
//                         titlePath="title"
//                         name={`suppliesService.${item.suppliesServiceIndex}.details.${index}.status`}
//                         control={control}
//                         onChange={(e) => {
//                            if ((e.key as string) === STATUS_REPAIR_DETAIL.close.key) {
//                               setValue(
//                                  `suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`,
//                                  '',
//                               );

//                               return clearErrors(
//                                  `suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`,
//                               );
//                            }

//                            if (
//                               (e.key as string) === STATUS_REPAIR_DETAIL.complete.key ||
//                               (e.key as string) === STATUS_REPAIR_DETAIL.check.key
//                            ) {
//                               if (
//                                  !watch(`suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`)
//                               ) {
//                                  return setError(
//                                     `suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`,
//                                     {
//                                        message: 'Không được để trống',
//                                     },
//                                  );
//                               }
//                               return clearErrors(
//                                  `suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`,
//                               );
//                            } else {
//                               return clearErrors(
//                                  `suppliesService.${item.suppliesServiceIndex}.details.${index}.personnel_id`,
//                               );
//                            }
//                         }}
//                      />
//                   </Grid>
//                   <Grid item xs={12}>
//                      <ControllerLabel title="Ghi chú" />
//                      <ControllerTextarea
//                         name={`suppliesService.${item.suppliesServiceIndex}.details.${index}.note`}
//                         minRows={4}
//                         control={control as unknown as Control<FieldValues>}
//                      />
//                   </Grid>
//                   <Grid item xs={12}>
//                      <ExtendTextareaAutosize
//                         minRows={4}
//                         sx={{ borderColor: '#d0d7de' }}
//                         value={item.describe}
//                         disabled
//                      />
//                   </Grid>
//                </Grid>
//             </AccordionDetails>
//          </Accordion>
//       </Box>
//    );
// };

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//    <MuiAccordionSummary expandIcon={<ChevronRightIcon sx={{ width: '20px', height: '20px' }} />} {...props} />
// ))({
//    width: '100%',
//    minHeight: 'auto !important',
//    boxShadow: 'unset',
//    flexDirection: 'row',
//    margin: '0px',
//    padding: '0px 0px 12px 0px',
//    borderRadius: '5px',
//    textDecoration: 'none',
//    cursor: 'pointer',
//    gap: 12,
//    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//       transform: 'rotate(90deg)',
//    },
//    '& .MuiAccordionSummary-content': {
//       margin: '1px !important',
//    },
//    '& .css-635bne-MuiPaper-root-MuiAccordion-root .Mui-expanded': {
//       backgroundColor: '#f3f5f7 !important',
//    },
// });

// const ExtendTextareaAutosize = styled(TextareaAutosize)(({ theme }) => {
//    return {
//       borderRadius: '6px',
//       width: '100%',
//       padding: '8.5px 14px',

//       '&:hover': {
//          borderColor: theme.palette.primary,
//       },

//       '&:focus-visible': {
//          borderWidth: 2,
//          borderColor: theme.palette.primary.main,
//          outline: 0,
//       },
//    };
// });

// export default AccordionDetailItem;
