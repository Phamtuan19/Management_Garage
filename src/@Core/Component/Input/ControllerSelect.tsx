/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FormHelperText, MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface ControllerSelectProps<TFieldValues extends FieldValues = FieldValues> {
   options: { [key: string]: any }[];
   name: string;
   valuePath: string;
   titlePath: string;
   defaultValue?: string;
   control: Control<TFieldValues>;
}

function ControllerSelect(props: ControllerSelectProps<FieldValues>): React.ReactNode {
   const { options, name, defaultValue, valuePath, titlePath, control, ...rest } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <Select
                     fullWidth
                     variant="outlined"
                     id={name}
                     error={Boolean(error)}
                     size="small"
                     {...field}
                     {...rest}
                  >
                     {options.map((option, index) => {
                        return (
                           <MenuItem key={index} value={option[valuePath]}>
                              {option[titlePath]}
                           </MenuItem>
                        );
                     })}
                  </Select>
                  {error && (
                     <FormHelperText variant="standard" sx={({ palette }) => ({ color: palette.error.main, ml: 1 })}>
                        {error.message}
                     </FormHelperText>
                  )}
               </React.Fragment>
            );
         }}
         defaultValue={defaultValue || ''}
         name={name}
         control={control}
      />
   );
}
export default ControllerSelect;
