import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface ControlSelectProps<TFieldValues extends FieldValues = FieldValues> {
   options: { [key: string]: any }[];
   name: string;
   _id: string;
   _value: string;
   defaultValue?: string;
   control: Control<TFieldValues>;
}

function ControlSelect(props: ControlSelectProps<FieldValues>): React.ReactNode {
   const { options, name, defaultValue, _id, _value, control } = props;
   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <Select fullWidth variant="outlined" id={name} error={Boolean(error)} size="medium" {...field}>
                  {options.map((option, index) => {
                     return (
                        <MenuItem key={index} value={option[_id]}>
                           {option[_value]}
                        </MenuItem>
                     );
                  })}
               </Select>
            );
         }}
         defaultValue={defaultValue || ''}
         name={name as string}
         control={control}
      />
   );
}
export default ControlSelect;
