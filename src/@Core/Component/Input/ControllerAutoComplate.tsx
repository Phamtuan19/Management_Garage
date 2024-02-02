/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */

import { Autocomplete, CircularProgress, Box, TextField } from '@mui/material';
import { find, get, isObject, map } from 'lodash';
import React, { useCallback } from 'react';
import { type Control, type FieldValues, type Path, Controller } from 'react-hook-form';
interface OptionProps {
   [key: string]: string;
}

interface ControllerAutoComplateProps<TFieldValues extends FieldValues = FieldValues> {
   options: OptionProps[];
   valuePath?: string;
   titlePath?: string;
   id?: string;
   label?: string;
   loading?: boolean;
   multiple?: boolean;
   noOptionsText?: string;
   placeholder?: string;
   disabled?: boolean;
   name: Path<TFieldValues>;
   readOnly?: boolean;
   control: Control<TFieldValues>;
   defaultValue?: string;
}

function ControllerAutoComplate<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerAutoComplateProps<TFieldValues>,
) {
   const {
      id,
      name,
      control,
      options,
      label = '',
      valuePath = 'id',
      titlePath = 'value',
      loading = false,
      noOptionsText = 'Giá trị không hợp lệ!!',
      placeholder,
      disabled = false,
      multiple = false,
      readOnly = false,
      defaultValue = '',
      ...restProps
   } = props;

   const getValueOption = useCallback(
      (value: any) => {
         if (multiple) {
            const values = map(value, (v: any) => {
               if (!isObject(v)) {
                  const option =
                     find(options, (item: any) => {
                        return get(item, valuePath) === v;
                     }) ?? null;
                  return option;
               }
               return v;
            }).filter(Boolean);
            return values;
         }

         if (value === '') {
            return '';
         }

         return value;
      },
      [options],
   );

   const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: OptionProps) => {
      if (!option) {
         return null;
      }

      return (
         <Box
            key={Math.random().toString()}
            component="li"
            sx={{ px: 2, py: 1, cursor: 'pointer', '&:hover': { bgcolor: '#DADADA' } }}
            {...props}
         >
            {get(option, titlePath)}
         </Box>
      );
   };

   return (
      <Controller
         render={({ field: { value, ref, onChange, onBlur }, fieldState: { error } }) => {
            return (
               <Autocomplete
                  id={id}
                  autoHighlight
                  options={options}
                  isOptionEqualToValue={(option, value) => {
                     if (value instanceof Object) {
                        return get(option, valuePath) === get(value, valuePath);
                     }
                     if (value === '') {
                        return true;
                     }

                     return get(option, valuePath) === value;
                  }}
                  getOptionLabel={(option) => {
                     return option ? String(get(find(options, { [valuePath]: option ?? '' }), titlePath)) : '';
                  }}
                  multiple={multiple}
                  readOnly={readOnly}
                  loading={loading}
                  disabled={disabled}
                  noOptionsText={noOptionsText}
                  renderOption={renderOption}
                  onBlur={onBlur}
                  onChange={(_, value: any) => {
                     const values = multiple ? value.map((v: OptionProps) => get(v, valuePath)) : get(value, valuePath);
                     return onChange(values);
                  }}
                  value={getValueOption(value)}
                  renderInput={(params) => {
                     return (
                        <>
                           <TextField
                              {...params}
                              placeholder={placeholder}
                              inputRef={ref}
                              error={!!error}
                              helperText={error && error.message}
                              label={label}
                              InputLabelProps={{
                                 ...params.InputLabelProps,
                                 shrink: true,
                              }}
                              inputProps={{
                                 ...params.inputProps,
                                 autoComplete: 'new-password',
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
                           />
                        </>
                     );
                  }}
                  {...restProps}
               />
            );
         }}
         defaultValue={defaultValue as any}
         name={name}
         control={control}
      />
   );
}

export default ControllerAutoComplate;
