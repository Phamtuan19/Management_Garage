/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Chip, Grid, Typography, AccordionDetails, Button } from '@mui/material';
import { DeliveryNoteDataDetailOption } from '@App/types/delivery';
import formatPrice from '@Core/Helper/formatPrice';
import { ResponseFindOneRepairInvoiceSupplies } from '@App/types/repair-invoice';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';
import styled from 'styled-components';

interface RenderSubComponentProps {
   data: ResponseFindOneRepairInvoiceSupplies;
}

const RenderSubComponent = ({ data }: RenderSubComponentProps) => {
   const [expanded, setExpanded] = useState<string | false>(false);

   return data.options.map((item, index) => {
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
   data: DeliveryNoteDataDetailOption;
   expanded: string | false;
   setExpanded: React.Dispatch<React.SetStateAction<string | false>>;
}) => {
   const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
   };

   const dataRender = [
      {
         title: 'Mã lô vật tư:',
         value: data && '#' + data.supplies_invoice_code,
         border: true,
      },
      {
         title: 'Giá bán:',
         value: formatPrice(data.selling_price),
         border: true,
      },
      {
         title: 'Giảm giá:',
         value: data.discount,
         border: true,
      },
      {
         title: 'Số lượng xuất:',
         value: <Chip label={data.export_quantity} color="primary" />,
         border: false,
      },
   ];

   return (
      <Accordion
         expanded={expanded === data._id}
         onChange={handleChange(data._id)}
         sx={{ boxShadow: 'none', pb: 0, mb: 2 }}
         key={data._id}
      >
         <AccordionSummary>
            <Box display="flex" alignItems="center" gap="12px">
               <Button variant="text" sx={{ p: 0, minWidth: '20px' }}>
                  <RemoveIcon />
               </Button>
               <Typography component="h3" sx={{ fontWeight: 400, fontSize: '17px' }}>
                  #{data.supplies_invoice_code}
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails>
            <Grid container spacing={1}>
               {dataRender.map((item, index) => {
                  return (
                     <Grid item xs={12} key={index}>
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
      // <Grid container spacing={2}>
      //    {dataRender.map((item, index) => {
      //       return (
      //          <Grid item xs={12} key={index}>
      //             <Grid container spacing={1}>
      //                <Grid item xs={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
      //                   <Typography
      //                      sx={({ base }) => ({
      //                         color: base.text.gray2,
      //                         fontWeight: '500',
      //                         flexGrow: 1,
      //                         fontSize: '1rem',

      //                         minHeight: '32px',
      //                      })}
      //                   >
      //                      {item.title}
      //                   </Typography>
      //                </Grid>
      //                <Grid item xs={8} pb={1} minHeight="36px">
      //                   <Typography
      //                      sx={{
      //                         pb: 0,
      //                         fontWeight: '500',
      //                         flexGrow: 1,
      //                         fontSize: '1rem',
      //                      }}
      //                   >
      //                      {item.value}
      //                   </Typography>
      //                   {item.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
      //                </Grid>
      //             </Grid>
      //          </Grid>
      //       );
      //    })}
      // </Grid>
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
