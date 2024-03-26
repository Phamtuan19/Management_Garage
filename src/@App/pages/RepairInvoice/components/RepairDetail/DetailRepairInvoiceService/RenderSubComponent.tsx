/* eslint-disable @typescript-eslint/naming-convention */
import { AccordionDetails, Box, Button, Grid, Typography, styled } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import RemoveIcon from '@mui/icons-material/Remove';
import { ResponseFindOneRepairInvoiceService } from '@App/types/repair-invoice';
import { useState } from 'react';

const RenderSubComponent = ({ data }: { data: ResponseFindOneRepairInvoiceService }) => {
   const [expanded, setExpanded] = useState<string | false>(false);

   return data.details.map((item, index) => {
      return (
         <Box sx={{ borderBottom: '1px solid #e0e0e0' }} key={index}>
            <RenderDetails data={item} expanded={expanded} setExpanded={setExpanded} />
         </Box>
      );
   });
};

const RenderDetails = ({
   data,
   expanded,
   setExpanded,
}: {
   data: { _id: string; name: string; note: string; describe: string };
   expanded: string | false;
   setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
   const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
   };

   const dataRender = [
      {
         title: 'Tên công việc:',
         value: data.name,
         border: true,
      },
      {
         title: 'Ghi chú:',
         value: data.note,
         border: true,
         xs: 12,
      },
      {
         title: 'Mô tả công việc:',
         value: data.describe,
         border: true,
         xs: 12,
      },
   ];

   return (
      <Accordion
         expanded={expanded === data._id}
         onChange={handleChange(data._id)}
         sx={{ boxShadow: 'none', pb: 0, mt: 3, mb: 2 }}
         key={data._id}
      >
         <AccordionSummary>
            <Box display="flex" alignItems="center" gap="12px">
               <Button variant="text" sx={{ p: 0, minWidth: '20px' }}>
                  <RemoveIcon />
               </Button>
               <Typography component="h3" sx={{ fontWeight: 400, fontSize: '17px' }}>
                  {data.name}
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails>
            <Grid container spacing={1}>
               {dataRender.map((item, index) => {
                  return (
                     <Grid item xs={item.xs ?? 12} key={index}>
                        <Grid container spacing={1}>
                           <Grid item xs={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <ControllerLabel title={item.title} />
                           </Grid>
                           <Grid item xs={9} pb={1} minHeight="36px">
                              <Typography
                                 sx={{
                                    p: 1,
                                    pb: 0,
                                    fontWeight: '500',
                                    flexGrow: 1,
                                    fontSize: '1rem',
                                    lineHeight: '1.5rem',
                                    minHeight: '32px',
                                 }}
                              >
                                 {item.value}
                              </Typography>
                              {item.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                           </Grid>
                        </Grid>
                     </Grid>
                  );
               })}
            </Grid>
         </AccordionDetails>
      </Accordion>
   );
};

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
   () => ({
      gap: 0,
      '&:not(:last-child)': {
         borderBottom: 0,
      },
      '&:before': {
         display: 'none',
      },
      '& .Mui-expanded': {
         // backgroundColor: theme.palette.background.default,
      },
   }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
   <MuiAccordionSummary
      expandIcon={<KeyboardDoubleArrowRightIcon sx={{ width: '20px', height: '20px' }} />}
      {...props}
   />
))({
   width: 'max-content',
   minHeight: 'auto !important',
   boxShadow: 'unset',
   flexDirection: 'row',
   margin: '0px',
   padding: '0px',
   borderRadius: '5px',
   textDecoration: 'none',
   cursor: 'pointer',
   gap: 12,
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-content': {
      // margin: '1px !important',
   },
   '& .css-635bne-MuiPaper-root-MuiAccordion-root .Mui-expanded': {
      backgroundColor: '#f3f5f7 !important',
   },
});

export default RenderSubComponent;
