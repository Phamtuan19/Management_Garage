import React from 'react';
import { Box, TextField } from '@mui/material';
import { Controller, Control, FieldValues, FieldPathByValue } from 'react-hook-form';

interface ControllerTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   placeholder?: string;
   defaultValue?: string;
   control: Control<TFieldValues>;
}

function ControlTextField<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerTextFieldProps<TFieldValues>,
): React.ReactNode {
   const { name, placeholder, defaultValue, control } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <Box>
                  <TextField
                     fullWidth
                     id={name}
                     variant="outlined"
                     size="medium"
                     error={Boolean(error)}
                     placeholder={placeholder}
                     {...field}
                  />
                  {error && (
                     <Box component="span" color="red">
                        {error.message}
                     </Box>
                  )}
               </Box>
            );
         }}
         defaultValue={(defaultValue || '') as any}
         name={name as any}
         control={control}
      />
   );
}

export default ControlTextField;
