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

function ControlTextField<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerTextFieldProps<TFieldValues>,
): React.ReactNode {
   const { name, placeholder, defaultValue, sx, control } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <TextField
                     fullWidth
                     id={name}
                     variant="outlined"
                     size="small"
                     error={Boolean(error)}
                     sx={{ mb: 0.5, ...sx }}
                     placeholder={placeholder}
                     {...field}
                  />
                  {error && <FormHelperText variant="standard">{error.message}</FormHelperText>}
               </React.Fragment>
            );
         }}
         defaultValue={(defaultValue || '') as any}
         name={name as any}
         control={control}
      />
   );
}

export default ControlTextField;
