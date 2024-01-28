/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */

import { Autocomplete, CircularProgress, Box, TextField } from '@mui/material';
import React from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
interface OptionProps {
   [key: string]: string;
}

interface ControllerAutoComplateProps<TFieldValues extends FieldValues = FieldValues> {
   options: OptionProps[];
   valuePath?: string;
   titlePath?: string;
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
      valuePath = 'id',
      titlePath = 'value',
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
            render={({ field: { onChange, ref, ...propField }, fieldState: { error } }) => {
               return (
                  <React.Fragment>
                     <Autocomplete
                        fullWidth
                        options={options}
                        size="small"
                        getOptionLabel={(option) => (propField.value !== '' ? option[titlePath] : '')}
                        noOptionsText={noOptionsText || 'Không có giá trị phù hợp!!!'}
                        renderOption={(props, option) => {
                           return (
                              <Box
                                 component="li"
                                 sx={{ px: 2, py: 1, cursor: 'pointer', '&:hover': { bgcolor: '#DADADA' } }}
                                 key={option[valuePath]}
                                 {...props}
                              >
                                 {option[titlePath] || ''}
                              </Box>
                           );
                        }}
                        onChange={(_, value: any) => {
                           onChange(value[valuePath]);
                        }}
                        clearIcon={
                           <ClearOutlinedIcon
                              sx={{ fontSize: '16px' }}
                              onClick={() => {
                                 onChange('');
                              }}
                           />
                        }
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
                                    endAdornment: (
                                       <>
                                          {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                          {params.InputProps.endAdornment}
                                       </>
                                    ),
                                 }}
                                 onChange={(value) => {
                                    onChange(value);
                                 }}
                                 value={propField.value === undefined ? '' : propField.value}
                              />
                           );
                        }}
                        disabled={disabled}
                        {...restProps}
                        {...propField}
                        value={propField.value}
                     />
                  </React.Fragment>
               );
            }}
         />
      </Box>
   );
}

export default ControllerAutoComplate;
