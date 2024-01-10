/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { FormHelperText, SxProps, TextField, Theme } from '@mui/material';
import Regexs from '@Core/Configs/Regexs';

interface ControllerTextFieldProps<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   placeholder?: string;
   defaultValue?: string;
   disabled?: boolean;
   number?: boolean;
   string?: boolean;
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
                        if (number) {
                           event.target.value = event.target.value.replace(Regexs.integer, '');
                        }

                        if (string) {
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
         defaultValue={defaultValue as never}
         name={name as Path<TFieldValues>}
         control={control}
      />
   );
}

export default ControllerTextField;
