import React from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

interface OptionProps {
   [key: string]: string;
}

interface ControllerAutoComplateProps<TFieldValues extends FieldValues = FieldValues> {
   options: OptionProps[];
   valuePath: string;
   titlePath: string;
   loading?: boolean;
   multiple?: boolean;
   noOptionsText?: string;
   placeholder?: string;
   disabled?: boolean;
   name: Path<TFieldValues>;
   control: Control<TFieldValues>;
}

function ControllerAutoComplate<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerAutoComplateProps<TFieldValues>,
) {
   const {
      name,
      control,
      options,
      multiple = false,
      valuePath,
      titlePath,
      loading = false,
      noOptionsText,
      placeholder,
      disabled = false,
      ...restProps
   } = props;

   return (
      <Box>
         <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ref, ...propField }, fieldState: { error } }) => {
               return (
                  <React.Fragment>
                     <Autocomplete
                        fullWidth
                        options={options}
                        size="small"
                        getOptionLabel={(option) => option[titlePath]}
                        noOptionsText={noOptionsText || 'Không có giá trị phù hợp!!!'}
                        renderOption={(props, option) => {
                           return (
                              <Box
                                 sx={{ px: 2, py: 1, cursor: 'pointer', '&:hover': { bgcolor: '#DADADA' } }}
                                 key={option[valuePath]}
                                 {...props}
                              >
                                 {option[titlePath]}
                              </Box>
                           );
                        }}
                        onChange={(_, value: any) => {
                           return onChange(value[valuePath]);
                        }}
                        renderInput={(params) => {
                           return (
                              <TextField
                                 {...params}
                                 inputRef={ref}
                                 placeholder={loading ? 'Đang tải ...' : placeholder}
                                 error={Boolean(error)}
                                 size="small"
                                 sx={{ backgroundColor: disabled ? '#DADADA' : '#fff' }}
                                 helperText={error && error.message}
                                 FormHelperTextProps={{ sx: { margin: '4px 0 0 0' } }}
                                 InputLabelProps={{
                                    ...params.InputLabelProps,
                                    shrink: true,
                                 }}
                                 inputProps={{
                                    ...params.inputProps,
                                 }}
                                 InputProps={{
                                    ...params.InputProps,
                                 }}
                                 onChange={(value) => {
                                    onChange(value);
                                 }}
                              />
                           );
                        }}
                        disabled={disabled}
                        {...restProps}
                        {...propField}
                     />
                  </React.Fragment>
               );
            }}
         />
      </Box>
   );
}

export default ControllerAutoComplate;
