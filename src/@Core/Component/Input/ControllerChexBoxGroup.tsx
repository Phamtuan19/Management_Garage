/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
import { Stack, Checkbox, FormControlLabel, FormHelperText, SxProps, Theme } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface ControllerChexBoxGroupPropsType<TFieldValues extends FieldValues = FieldValues> {
   options: { [key: string]: string }[];
   name: string;
   disabled?: boolean;
   valuePath: string;
   titlePath: string;
   required?: boolean;
   control: Control<TFieldValues>;
   sx?: SxProps<Theme> | undefined;
}

function ControllerChexBoxGroup<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerChexBoxGroupPropsType<TFieldValues>,
) {
   const { name, valuePath, titlePath, disabled, options, control, sx } = props;
   return (
      <Controller
         render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <Stack sx={sx}>
                     {options.map((option, index) => {
                        return (
                           <FormControlLabel
                              sx={{ width: 'auto' }}
                              key={index}
                              control={
                                 <Checkbox
                                    disabled={disabled}
                                    checked={value.includes(option[valuePath])}
                                    onChange={() => {
                                       if (value.includes(option[valuePath])) {
                                          return onChange(value.filter((item: string) => item !== option[valuePath]));
                                       }
                                       return onChange([...value, option[valuePath]]);
                                    }}
                                    name="gilad"
                                 />
                              }
                              label={option[titlePath]}
                           />
                        );
                     })}
                  </Stack>
                  {error && (
                     <FormHelperText variant="standard" sx={({ palette }) => ({ color: palette.error.main, ml: 1 })}>
                        {error.message}
                     </FormHelperText>
                  )}
               </React.Fragment>
            );
         }}
         name={name as any}
         control={control}
      />
   );
}

export default ControllerChexBoxGroup;
