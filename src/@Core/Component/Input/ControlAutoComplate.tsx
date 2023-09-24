import React, { useCallback } from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

interface ControlAutoComplateProps {
   options: { [key: string]: any }[];
   _id: string; // key options
   id?: string;
   name: string;
   multiple?: boolean;
   control: Control<any>;
}

function ControlAutoComplate(props: ControlAutoComplateProps) {
   const { options, _id, id, name, multiple, control } = props;

   const getValueOptions = useCallback(
      (value: any) => {
         console.log(value);
         //  return multiple && value.map((v: { [x: string]: any }) => Object.assign({}, v[_id]));
      },
      [options],
   );

   return (
      <Controller
         render={({ field: { onChange, onBlur, value, ref } }) => {
            return (
               <Box>
                  <Autocomplete
                     fullWidth
                     multiple={multiple}
                     size="small"
                     autoComplete={true}
                     id={id}
                     options={options}
                     onBlur={onBlur}
                     onChange={(_, value) => {
                        return onChange(value);
                     }}
                     value={getValueOptions(value) as any}
                     renderInput={(params) => <TextField {...params} inputRef={ref} />}
                  />
               </Box>
            );
         }}
         name={name as any}
         control={control}
      />
   );
}

export default ControlAutoComplate;
