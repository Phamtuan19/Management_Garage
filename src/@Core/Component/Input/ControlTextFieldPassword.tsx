import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { Control, FieldValues, useWatch } from 'react-hook-form';

import ControlTextField from '@Core/Component/Input/ControlTextField';
import ShowPassword from '@App/component/customs/ShowPassword';

interface TextFleidPasswordProps<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   placeholder?: string;
   defaultValue?: string;
   sx?: SxProps<Theme> | undefined;
   control: Control<TFieldValues>;
}

function TextFleidPassword<TFieldValues extends FieldValues = FieldValues>(
   props: TextFleidPasswordProps<TFieldValues>,
) {
   const { name, control, ...rest } = props;

   console.log();

   return (
      <React.Fragment>
         <Box sx={{ position: 'relative' }}>
            <ShowPassword password={useWatch({ control })[name]} />
            <ControlTextField name="password" control={control} {...rest} />
         </Box>
      </React.Fragment>
   );
}

export default TextFleidPassword;
