/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormHelperText, SxProps, TextField, TextFieldVariants, Theme } from '@mui/material';
import Regexs from '@Core/Configs/Regexs';

interface ControllerTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   placeholder?: string;
   defaultValue?: string;
   disabled?: boolean;
   number?: boolean;
   string?: boolean;
   variant?: TextFieldVariants;
   sx?: SxProps<Theme> | undefined;

   control: Control<TFieldValues>;
}

function ControllerTextField<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerTextFieldProps<TFieldValues>,
): React.ReactNode {
   const {
      name,
      placeholder,
      defaultValue = '',
      sx,
      control,
      number = false,
      string = false,
      disabled = false,
      variant = 'outlined',
      ...rest
   } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <TextField
                     autoComplete="off"
                     fullWidth
                     id={name}
                     variant={variant}
                     error={Boolean(error)}
                     sx={{ mb: 0.5, ...sx }}
                     placeholder={placeholder}
                     {...field}
                     {...rest}
                     disabled={disabled}
                     onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (number) {
                           return (event.target.value = String(Number(event.target.value.replace(Regexs.integer, ''))));
                        }

                        if (string) {
                           return (event.target.value = event.target.value.replace(Regexs.string, ''));
                        }

                        return event.target.value;
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
         defaultValue={defaultValue as never}
         name={name as Path<TFieldValues>}
         control={control}
      />
   );
}

export default ControllerTextField;
