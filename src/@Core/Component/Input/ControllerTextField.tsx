import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { FormHelperText, SxProps, TextField, Theme } from '@mui/material';
import Regexs from '@Core/Configs/Regexs';

interface ControllerTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   placeholder?: string;
   defaultValue?: string;
   disabled?: boolean;
   isNumber?: boolean;
   isString?: boolean;
   sx?: SxProps<Theme> | undefined;
   control: Control<TFieldValues>;
}

function ControllerTextField<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerTextFieldProps<TFieldValues>,
): React.ReactNode {
   const {
      name,
      placeholder,
      defaultValue,
      sx,
      control,
      isNumber = false,
      isString = false,
      disabled = false,
      ...rest
   } = props;
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
                     disabled={disabled}
                     onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (isNumber) {
                           event.target.value = event.target.value.replace(Regexs.integer, '');
                        }

                        if (isString) {
                           event.target.value = event.target.value.replace(Regexs.string, '');
                        }

                        event.target.value;
                     }}
                  />
                  {error && (
                     <FormHelperText variant="standard" sx={({ palette }) => ({ color: palette.error.main, ml: 1 })}>
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
