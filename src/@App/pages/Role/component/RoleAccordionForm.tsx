/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Accordion, AccordionDetails, Box, Checkbox, FormControlLabel, Grid, Typography, styled } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { Control, FieldValues, useController } from 'react-hook-form';
import { ModulePagePropsType } from '@App/configs/module-page';
import PAGE_ACTION, { PageActionPropsType } from '@App/configs/page-action';
import { useCallback, useEffect, useState } from 'react';

interface RoleDetailPropsType<TFieldValues extends FieldValues = FieldValues> {
   role: {
      name: ModulePagePropsType;
      title: string;
      action: Array<{
         name: PageActionPropsType;
         title: string;
      }>;
   };
   name: string;
   control: Control<TFieldValues>;
}

const RoleDetail = ({ role, name, control }: RoleDetailPropsType) => {
   const [checkAll, setCheckAll] = useState<boolean>(false);
   const [open, setOpen] = useState<boolean>(false);
   const {
      field: { value, onChange },
   } = useController({
      name,
      control,
   });

   useEffect(() => {
      if (value) {
         const isCheck = Boolean(value[role.name] === '*');
         return setCheckAll(isCheck);
      }

      return setCheckAll(false);
   }, [value]);

   const isCheckItem = useCallback(
      (action: PageActionPropsType) => {
         if (value[role.name] === '*') {
            return true;
         } else {
            if (value?.[role.name]?.includes(action)) {
               return true;
            }
            // console.log(value[role.name]);
            return false;
         }
      },
      [checkAll, value, role.name],
   );

   const handleClickCheckBoxAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = {
         ...value,
         [role.name]: event.target.checked ? '*' : [],
      };

      setOpen(open === false ? true : true);

      return onChange(data);
   };

   const handleClickCheckBoxItem = (action: PageActionPropsType) => {
      let updatedArray;

      if (value[role.name] === '*') {
         updatedArray = ['*'];
      } else {
         if (value[role.name].includes(action)) {
            updatedArray = value[role.name].filter((item: PageActionPropsType) => item !== action);
         } else {
            updatedArray = value[role.name].includes(PAGE_ACTION.VIEW_ALL)
               ? [...value[role.name], action]
               : [...value[role.name], PAGE_ACTION.VIEW_ALL, action];
         }
      }

      const data = {
         ...value,
         [role.name]: updatedArray,
      };

      onChange(data);
   };

   return (
      <Accordion expanded={open} sx={{ boxShadow: 'none' }}>
         <AccordionSummary onClick={() => setOpen(!open)}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
               <ExtendCheckbox size="small" checked={checkAll} onChange={handleClickCheckBoxAll} />
               <Typography component="h3" sx={{ fontWeight: 400, fontSize: '17px' }}>
                  {role.title}
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails sx={{ pl: 5 }}>
            <Grid container spacing={2}>
               {role.action.map((action, index) => {
                  return (
                     <Grid item xs={4} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                           <FormControlLabel
                              label={action.title}
                              control={
                                 <ExtendCheckbox
                                    size="small"
                                    checked={isCheckItem(action.name)}
                                    onChange={() => handleClickCheckBoxItem(action.name)}
                                 />
                              }
                              sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
                           />
                        </Box>
                     </Grid>
                  );
               })}
            </Grid>
         </AccordionDetails>
      </Accordion>
   );
};

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
   padding: '0px 0px 12px 0px',
   borderRadius: '5px',
   textDecoration: 'none',
   cursor: 'pointer',
   gap: 12,
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-content': {
      margin: '1px !important',
   },
   '& .css-635bne-MuiPaper-root-MuiAccordion-root .Mui-expanded': {
      backgroundColor: '#f3f5f7 !important',
   },
});

const ExtendCheckbox = styled(Checkbox)({
   padding: 0,
});

export default RoleDetail;
