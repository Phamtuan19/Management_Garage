// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/naming-convention */
// import { AccordionDetails, Box, Button, Grid, Typography, styled } from '@mui/material';
// import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
// import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
// import { Row } from '@tanstack/react-table';
// import ControllerLabel from '@Core/Component/Input/ControllerLabel';
// import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
// import RemoveIcon from '@mui/icons-material/Remove';
// import { dataStatus } from '@App/pages/RepairInvoice/utils';
// import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';
// import { UseFormReturn } from 'react-hook-form';
// import {
//    RepairInvoiceUpdateSchema,
//    SuppliesInvoiceUpdateSchema,
// } from '@App/pages/RepairInvoice/utils/repair-invoice-update';
// import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
// import personnelService from '@App/services/personnel.service';
// import { useQuery } from '@tanstack/react-query';
// import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';
// import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';

// interface RenderSubComponentProps {
//    row: Row<SuppliesInvoiceUpdateSchema>;
//    form: UseFormReturn<RepairInvoiceUpdateSchema>;
// }

// const RenderSubComponent = ({ form, row }: RenderSubComponentProps) => {
//    const data = row.original;

//    const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
//       const res = await personnelService.fieldAll();
//       return res.data;
//    });

//    //    return data.details.map((item, index) => {
//    //       return (
//    //          <RenderDetails
//    //             key={index}
//    //             data={item}
//    //             index={row.index}
//    //             detail_index={index}
//    //             personnels={personnels}
//    //             form={form}
//    //          />
//    //       );
//    //    });
//    return <></>;
// };

// interface RenderDetailsProps {
//    data: {
//       name: string;
//       repair_staff_id: string;
//       status: string;
//       note: string;
//       describe: string;
//    };
//    index: number;
//    detail_index: number;
//    personnels: { _id: string; full_name: string }[] | undefined;
//    form: UseFormReturn<RepairInvoiceUpdateSchema>;
// }

// const RenderDetails = ({ data, detail_index, form, index, personnels }: RenderDetailsProps) => {
//    const { setError, clearErrors, setValue, watch, control } = form;

//    const dataRender = [
//       {
//          title: 'Nhân viên sc:',
//          render: () => (
//             <ControllerAutoComplate
//                name={`repairService.${index}.details.${detail_index}.repair_staff_id`}
//                options={personnels ?? []}
//                valuePath="_id"
//                titlePath="full_name"
//                control={control}
//                onChange={(e: any) => {
//                   if (e) {
//                      clearErrors(`repairService.${index}.details.${detail_index}.repair_staff_id`);
//                   }
//                }}
//             />
//          ),
//          border: false,
//          xs: 6,
//       },
//       {
//          title: 'Trạng thái:',
//          render: () => (
//             <ControllerRadioGroup
//                name={`repairService.${index}.details.${detail_index}.status`}
//                options={dataStatus}
//                valuePath="key"
//                titlePath="title"
//                control={control as never}
//                sx={{ display: 'flex', flexDirection: 'row' }}
//                onChangeValue={(e) => {
//                   if (
//                      e.target.value === STATUS_REPAIR_DETAIL.repair.key ||
//                      e.target.value === STATUS_REPAIR_DETAIL.complete.key
//                   ) {
//                      if (watch(`repairService.${index}.details.${detail_index}.repair_staff_id`) === '') {
//                         return setError(`repairService.${index}.details.${detail_index}.repair_staff_id`, {
//                            message: 'Nhân viên sửa chữa không được để trống.',
//                         });
//                      }
//                   }

//                   if (
//                      e.target.value !== STATUS_REPAIR_DETAIL.repair.key &&
//                      e.target.value !== STATUS_REPAIR_DETAIL.complete.key
//                   ) {
//                      return clearErrors(`repairService.${index}.details.${detail_index}.repair_staff_id`);
//                   }

//                   return setValue(`repairService.${index}.details.${detail_index}.repair_staff_id`, '');
//                }}
//             />
//          ),
//          border: false,
//          xs: 6,
//       },
//       {
//          title: 'Ghi chú:',
//          render: () => (
//             <ControllerTextarea
//                name={`repairService.${index}.details.${detail_index}.note`}
//                control={control as never}
//             />
//          ),
//          border: false,
//          xs: 12,
//       },
//       {
//          title: 'Mô tả công việc:',
//          value: data.describe,
//          border: true,
//       },
//    ];

//    return (
//       <Accordion sx={{ boxShadow: 'none', pb: 0 }}>
//          <AccordionSummary>
//             <Box display="flex" alignItems="center" gap="12px">
//                <Button variant="text" sx={{ p: 0, minWidth: '20px' }}>
//                   <RemoveIcon />
//                </Button>
//                <Typography component="h3" sx={{ fontWeight: 400, fontSize: '17px' }}>
//                   {data.name}
//                </Typography>
//             </Box>
//          </AccordionSummary>
//          <AccordionDetails>
//             <Grid container spacing={3}>
//                {dataRender.map((item, index) => (
//                   <Grid item xs={item.render ? item.xs : 12} key={index}>
//                      <Grid container spacing={1}>
//                         <Grid
//                            item
//                            xs={item.render ? 12 : 2}
//                            sx={{ display: 'flex', ...(item.render ? { flexDirection: 'column' } : {}) }}
//                         >
//                            <ControllerLabel title={item.title} />
//                            {item.render && item.render()}
//                         </Grid>
//                         {item.value && (
//                            <Grid item xs={10} pb={1} minHeight="36px">
//                               <Typography
//                                  sx={{
//                                     p: 1,
//                                     pb: 0,
//                                     fontWeight: '500',
//                                     flexGrow: 1,
//                                     fontSize: '1rem',
//                                     lineHeight: '1.5rem',
//                                     minHeight: '32px',
//                                  }}
//                               >
//                                  {item.value}
//                               </Typography>
//                               {item.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
//                            </Grid>
//                         )}
//                      </Grid>
//                   </Grid>
//                ))}
//             </Grid>
//          </AccordionDetails>
//       </Accordion>
//    );
// };

// const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
//    () => ({
//       gap: 0,
//       '&:not(:last-child)': {
//          borderBottom: 0,
//       },
//       '&:before': {
//          display: 'none',
//       },
//       '& .Mui-expanded': {
//          // backgroundColor: theme.palette.background.default,
//       },
//    }),
// );

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//    <MuiAccordionSummary
//       expandIcon={<KeyboardDoubleArrowRightIcon sx={{ width: '20px', height: '20px' }} />}
//       {...props}
//    />
// ))({
//    width: 'max-content',
//    minHeight: 'auto !important',
//    boxShadow: 'unset',
//    flexDirection: 'row',
//    margin: '0px',
//    padding: '0px',
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

// export default RenderSubComponent;