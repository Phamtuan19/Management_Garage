/* eslint-disable @typescript-eslint/naming-convention */
import { Accordion, AccordionDetails, Box, Button, Grid, Typography, styled } from '@mui/material';
import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Control, FieldValues, UseFormReturn, useFieldArray } from 'react-hook-form';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { RepairServiceSchema } from '../utils/repairService.schema';

interface BaseFormRepairServiceDetailProps {
   form: UseFormReturn<RepairServiceSchema>;
}

interface CustomAccordionSummaryProps extends AccordionSummaryProps {
   remove: () => void;
}

const BaseFormRepairServiceDetail = ({ form }: BaseFormRepairServiceDetailProps) => {
   const { control } = form;

   const { fields, remove, append } = useFieldArray({
      name: 'details',
      control,
   });

   return (
      <>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               borderBottom: '1px solid #E8EAEB',
            }}
         >
            <Typography
               sx={{
                  fontSize: '1rem',
                  py: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
               }}
            >
               Công việt cần thực hiện
            </Typography>
            <Box>
               <Button
                  variant="contained"
                  sx={{ px: 0.5, py: 0.1, minWidth: '32px !important', mr: 1 }}
                  color="info"
                  onClick={() => {
                     append({
                        name: '',
                        describe: '',
                     });
                  }}
               >
                  <AddIcon />
               </Button>
            </Box>
         </Box>
         {fields.map((_field, index) => {
            return (
               <Box mt={2}>
                  <Accordion sx={{ boxShadow: 'none', borderBottom: '1px solid #E8EAEB' }} key={index}>
                     <AccordionSummary
                        remove={() => {
                           remove(index);
                        }}
                     >
                        <Typography component="h3" sx={{ fontWeight: 400, fontSize: '16px' }}>
                           Công việc {index + 1}
                        </Typography>
                     </AccordionSummary>
                     <AccordionDetails sx={{ px: 1, py: 0 }}>
                        <Grid container spacing={2}>
                           <Grid item xs={12}>
                              <Box height="92px">
                                 <ControllerLabel title="Tên" required />
                                 <ControllerTextField
                                    name={`details.${index}.name`}
                                    control={control}
                                    placeholder="Tên công việc "
                                 />
                              </Box>
                           </Grid>
                           <Grid item xs={12} sx={{ pb: 2 }}>
                              <Box minHeight="92px">
                                 <ControllerLabel title="Tên" required />
                                 <ControllerTextarea
                                    name={`details.${index}.describe`}
                                    control={control as unknown as Control<FieldValues>}
                                    placeholder="Mô tả "
                                 />
                              </Box>
                           </Grid>
                        </Grid>
                     </AccordionDetails>
                  </Accordion>
               </Box>
            );
         })}
      </>
   );
};

const AccordionSummary = styled((props: CustomAccordionSummaryProps) => (
   <MuiAccordionSummary
      expandIcon={
         <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
            <ChevronRightIcon sx={{ width: '20px', height: '20px' }} />

            <Button
               variant="contained"
               sx={{ px: 0.5, py: 0.1, minWidth: '32px !important', mr: 1 }}
               color="error"
               onClick={props.remove}
            >
               <RemoveIcon />
            </Button>
         </Box>
      }
      {...props}
   />
))({
   width: '100%',
   minHeight: 'auto !important',
   boxShadow: 'unset',
   flexDirection: 'row',
   margin: '0px',
   padding: '0px 0px 12px 0px',
   borderRadius: '5px',
   textDecoration: 'none',
   cursor: 'pointer',
   gap: 12,
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      '& .css-gq8pyr-MuiSvgIcon-root': {
         transform: 'rotate(90deg)',
      },
   },
   '& .css-yw020d-MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'none !important',
   },
   '& .MuiAccordionSummary-content': {
      margin: '1px !important',
   },
   '& .css-635bne-MuiPaper-root-MuiAccordion-root .Mui-expanded': {
      backgroundColor: '#f3f5f7 !important',
   },
   '& .css-yw020d-MuiAccordionSummary-expandIconWrapper': {
      width: 'calc(100% - 120px)',
   },
});

export default BaseFormRepairServiceDetail;
