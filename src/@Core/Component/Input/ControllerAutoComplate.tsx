// import React, { useCallback } from 'react';
// import PropTypes from 'prop-types';
// import { Autocomplete, TextField, Box, Typography, Theme, useTheme } from '@mui/material';
// import { Control, Controller, FieldValues } from 'react-hook-form';

// interface Option {
//    [key: string]: any;
// }

// interface ControllerAutoComplateProps<TFieldValues extends FieldValues = FieldValues> {
//    options: Option[];
//    labelPath?: string;
//    valuePath?: string;
//    disabled?: boolean;
//    placeholder?: string;
//    multiple?: boolean;
//    loading?: boolean;
//    readOnly?: boolean;
//    required?: boolean;
//    returnValueType?: 'option' | 'string' | 'enum';
//    legendLabel?: string | null;
//    onChangeSelect: (value: string) => void;
//    disabledDeleteIcon?: boolean;
//    name: string;
//    control: Control<TFieldValues>;
//    className?: string;
//    theme?: Theme;
// }

// const ControllerAutoComplate = (props: ControllerAutoComplateProps) => {
//    const { palette } = useTheme();
//    const {
//       name,
//       control,
//       options,
//       disabled = false,
//       placeholder,
//       multiple = false,
//       labelPath = 'id',
//       valuePath = 'value',
//       loading = false,
//       readOnly = false,
//       required = false,
//       returnValueType = 'option',
//       legendLabel = null,
//       onChangeSelect,
//       disabledDeleteIcon = false,
//       className,
//       ...restProps
//    } = props;

//    const getValueOptions = useCallback(
//       (value: string | number | (string | number)[] | Option) => {
//          if (multiple) {
//             const values = (value as (string | number)[])
//                .map((v) => {
//                   if (!isObject(v)) {
//                      const option = options.find((item) => item[valuePath] === v) || null;
//                      return option;
//                   }
//                   return v;
//                })
//                .filter(Boolean);

//             return values;
//          }

//          if (returnValueType === 'enum') {
//             return options.find((item) => item[valuePath] === value) || null;
//          }
//          return value;
//       },
//       [options, valuePath, multiple, returnValueType],
//    );

//    return (
//       <Box className={className}>
//          <Controller
//             name={name}
//             control={control}
//             render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
//                <>
//                   {legendLabel ? (
//                      <Typography variant="h5" component="label">
//                         {legendLabel}
//                      </Typography>
//                   ) : null}
//                   <Autocomplete
//                      fullWidth
//                      multiple={multiple}
//                      options={options}
//                      onBlur={onBlur}
//                      size="small"
//                      getOptionLabel={(option) => String(option[labelPath] ?? '')}
//                      isOptionEqualToValue={(option, val) => {
//                         if (val instanceof Object) {
//                            return option[valuePath] === val[valuePath];
//                         }
//                         return option[valuePath] === val;
//                      }}
//                      clearIcon={!disabledDeleteIcon}
//                      loading={loading}
//                      disabled={disabled}
//                      noOptionsText="No options!!!"
//                      onChange={(_, val) => {
//                         return returnValueType === 'enum'
//                            ? onChange(multiple ? val.map((v: { [x: string]: any }) => v[valuePath]) : val[valuePath])
//                            : onChange(val);
//                      }}
//                      value={getValueOptions(value)}
//                      renderOption={(props, option) => {
//                         return (
//                            <Box {...props} key={String(option[labelPath])}>
//                               {String(option[labelPath])}
//                            </Box>
//                         );
//                      }}
//                      renderInput={(params) => (
//                         <TextField
//                            {...params}
//                            inputRef={ref}
//                            placeholder={loading ? 'Đang tải ...' : placeholder}
//                            error={Boolean(error)}
//                            size="small"
//                            sx={{ backgroundColor: disabled ? '#DADADA' : '#fff' }}
//                            helperText={error && error.message}
//                            FormHelperTextProps={{ sx: { margin: '4px 0 0 0' } }}
//                            InputLabelProps={{
//                               ...params.InputLabelProps,
//                               shrink: true,
//                               required,
//                            }}
//                            inputProps={{
//                               ...params.inputProps,
//                               readOnly,
//                            }}
//                            InputProps={{
//                               ...params.InputProps,
//                            }}
//                            onChange={(event) => {
//                               onChange(event.target.value);
//                               if (onChangeSelect) {
//                                  onChangeSelect(event.target.value);
//                               }
//                            }}
//                         />
//                      )}
//                      filterOptions={(opts, { inputValue }) =>
//                         opts.filter((opt) => String(opt[labelPath]).toLowerCase().includes(inputValue.toLowerCase()))
//                      }
//                      {...restProps}
//                   />
//                </>
//             )}
//          />
//       </Box>
//    );
// };

// export default ControllerAutoComplate;
