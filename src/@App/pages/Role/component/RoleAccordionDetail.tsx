/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { PageActionPropsType } from '@App/configs/page-action';
import { RoleResponseData } from '@App/services/role.service';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Box,
   Checkbox,
   FormControlLabel,
   Grid,
   Typography,
   styled,
} from '@mui/material';

import { RolePropsTypeConfig } from '../utils';

interface RoleDetailProps {
   role: RolePropsTypeConfig;
   roleDetail: RoleResponseData;
}

const RoleAccordionDetail = ({ role, roleDetail }: RoleDetailProps) => {
   const isCheckItem = (action: PageActionPropsType) => {
      const permission = roleDetail.permission;

      if (typeof permission === 'string' && permission === '*') {
         return true;
      }

      const rolePermission = permission[role.name];

      if (Array.isArray(rolePermission)) {
         return rolePermission.includes(action);
      }

      return rolePermission === '*';
   };

   return (
      <Accordion sx={{ boxShadow: 'none' }} expanded={true}>
         <AccordionSummary>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
               <Typography component="h3" sx={{ fontWeight: 400, fontSize: '17px' }}>
                  {role.title}:
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails sx={{ pl: 5 }}>
            <Grid container spacing={2}>
               {role?.action &&
                  role.action.map((action, index) => {
                     return (
                        <Grid item xs={4} key={index}>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <FormControlLabel
                                 label={action.title}
                                 control={
                                    <CheckboxCustom
                                       size="small"
                                       checked={isCheckItem(action.name)}
                                       disabled={!isCheckItem(action.name)}
                                    />
                                 }
                                 sx={{ display: 'flex', gap: 1, alignItems: 'center', cursor: 'text' }}
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

const CheckboxCustom = styled(Checkbox)({
   cursor: 'context-menu',
   '& .css-8je8zh-MuiTouchRipple-root': {
      position: 'unset',
   },
   '&:hover': {
      backgroundColor: 'transparent',
   },
});

export default React.memo(RoleAccordionDetail);
