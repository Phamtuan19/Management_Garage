/* eslint-disable @typescript-eslint/naming-convention */
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateView } from '@mui/x-date-pickers';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

interface ControllerDateProps<TFieldValues extends FieldValues = FieldValues> {
   openTo?: DateView;
   views?: DateView[];
   defaultValue?: string;
   name: string;
   control: Control<TFieldValues>;
}

function ControllerDate<TFieldValues extends FieldValues = FieldValues>(props: ControllerDateProps<TFieldValues>) {
   const { control, openTo, views, name, defaultValue, ...res } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer
                        sx={{
                           pt: 0,
                           overflow: 'hidden',
                        }}
                        components={['DatePicker']}
                     >
                        <DatePicker
                           sx={({ palette }) => ({
                              '.css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                                 height: '1.2375em',
                              },
                              width: '100%',
                              '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
                                 borderColor: error
                                    ? palette.error.main + '!important'
                                    : 'rgba(0, 0, 0, 0.23) !important',
                              },
                           })}
                           openTo={openTo}
                           views={views}
                           {...field}
                           {...res}
                           defaultValue={field.value}
                        />
                     </DemoContainer>
                  </LocalizationProvider>
                  {error && (
                     <FormHelperText variant="standard" sx={({ palette }) => ({ color: palette.error.main, ml: 1 })}>
                        {error.message}
                     </FormHelperText>
                  )}
               </>
            );
         }}
         defaultValue={defaultValue as never}
         name={name as Path<TFieldValues>}
         control={control}
      />
   );
}

export default ControllerDate;
