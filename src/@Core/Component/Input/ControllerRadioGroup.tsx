import { Box, SxProps, FormControlLabel, Radio, RadioGroup, Theme, FormHelperText, Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface ControllerRadioGroupProps<TContext extends FieldValues = any> {
   options: { [key: string]: string }[];
   name: string;
   valuePath: string;
   titlePath: string;
   sx?: SxProps<Theme> | undefined;
   disabled?: boolean;
   defaultValue?: string;
   control: Control<TContext>;
}

const ControllerRadioGroup = (props: ControllerRadioGroupProps): JSX.Element => {
   const { options, name, defaultValue, valuePath, titlePath, control, disabled = false, sx, ...rest } = props;

   return (
      <Controller
         render={({ field: { onChange, ref, value }, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <RadioGroup
                     title="hello"
                     ref={ref}
                     name={name}
                     onChange={onChange}
                     value={value}
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
                     <FormHelperText variant="standard" sx={{ color: '#F00', ml: 1 }}>
                        {error.message}
                     </FormHelperText>
                  )}
               </React.Fragment>
            );
         }}
         name={name as string}
         control={control}
      />
   );
};

export default ControllerRadioGroup;
