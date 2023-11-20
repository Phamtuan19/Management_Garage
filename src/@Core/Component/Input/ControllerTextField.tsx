import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { FormHelperText, SxProps, TextField, Theme } from '@mui/material';

interface ControllerTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   placeholder?: string;
   defaultValue?: string;
   sx?: SxProps<Theme> | undefined;
   control: Control<TFieldValues>;
}

function ControllerTextField<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerTextFieldProps<TFieldValues>,
): React.ReactNode {
   const { name, placeholder, defaultValue, sx, control, ...rest } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <TextField
                     fullWidth
                     id={name}
                     variant="outlined"
                     error={Boolean(error)}
                     sx={{ mb: 0.5, ...sx }}
                     placeholder={placeholder}
                     {...field}
                     {...rest}
                  />
                  {error && (
                     <FormHelperText variant="standard" sx={{ color: '#F00', ml: 1 }}>
                        {error.message}
                     </FormHelperText>
                  )}
               </React.Fragment>
            );
         }}
         defaultValue={(defaultValue || '') as any}
         name={name as any}
         control={control}
      />
   );
}

export default ControllerTextField;
