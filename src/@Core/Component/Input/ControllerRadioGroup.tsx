/* eslint-disable @typescript-eslint/naming-convention */
import { Box, SxProps, FormControlLabel, Radio, RadioGroup, Theme, FormHelperText, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface ControllerRadioGroupProps<TContext extends FieldValues = FieldValues> {
   options: { [key: string]: string }[];
   name: string;
   valuePath: string;
   titlePath: string;
   sx?: SxProps<Theme> | undefined;
   disabled?: boolean;
   defaultValue?: string;
   onChangeValue?: (e: React.ChangeEvent<HTMLInputElement>) => void;
   control: Control<TContext>;
}

const ControllerRadioGroup = (props: ControllerRadioGroupProps): JSX.Element => {
   const {
      options,
      name,
      defaultValue,
      onChangeValue,
      valuePath,
      titlePath,
      control,
      disabled = false,
      sx,
      ...rest
   } = props;

   return (
      <Controller
         render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <RadioGroup
                     title="hello"
                     ref={ref}
                     name={name}
                     onChange={(e) => {
                        onChange(e);
                        return onChangeValue && onChangeValue(e);
                     }}
                     value={value as string}
                     defaultValue={defaultValue}
                     {...rest}
                  >
                     <Box sx={sx}>
                        {options.map((option, i) => {
                           return (
                              <FormControlLabel
                                 key={i}
                                 value={option[valuePath]}
                                 control={<Radio disabled={disabled} size="small" />}
                                 label={<Typography>{option[titlePath]}</Typography>}
                                 sx={{ display: 'flex' }}
                              />
                           );
                        })}
                     </Box>
                  </RadioGroup>
                  {error && (
                     <FormHelperText variant="standard" sx={({ palette }) => ({ color: palette.error.main, ml: 1 })}>
                        {error.message}
                     </FormHelperText>
                  )}
               </React.Fragment>
            );
         }}
         name={name}
         control={control}
      />
   );
};

export default ControllerRadioGroup;
