/* eslint-disable @typescript-eslint/naming-convention */
import { Control, Controller, FieldValues } from 'react-hook-form';
import { FormControl, FormHelperText, styled,TextareaAutosize } from '@mui/material';
/*
 * @param {*} props
 * @interface  Props<T> extends Omit<TextFieldProps, 'name'> {name: FieldPath<T>control: Control<T>};
 * @returns Form controller JSX element
 */

interface ControllerTextareaPropsType<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   minRows?: number;
   disabled?: boolean;
   placeholder?: string;
   defaultValue?: string;
   control: Control<TFieldValues>;
}

const ControllerTextarea = (props: ControllerTextareaPropsType<FieldValues>): JSX.Element => {
   const { name, control, minRows = 4, disabled = false, placeholder, ...rest } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <FormControl error={Boolean(error)} sx={{ width: '100%', height: '100%' }}>
                  <ExtendTextareaAutosize
                     minRows={minRows}
                     placeholder={disabled ? void 0 : placeholder}
                     disabled={disabled}
                     {...field}
                     {...rest}
                     sx={({ palette }) => ({ borderColor: error ? palette.error.main : '#d0d7de' })}
                  />
                  {error?.message && (
                     <FormHelperText variant="standard" sx={({ palette }) => ({ color: palette.error.main })}>
                        {error.message}
                     </FormHelperText>
                  )}
               </FormControl>
            );
         }}
         name={name}
         control={control}
      />
   );
};

const ExtendTextareaAutosize = styled(TextareaAutosize)(({ theme }) => {
   return {
      borderRadius: '6px',
      width: '100%',
      padding: '8.5px 14px',

      '&:hover': {
         borderColor: theme.palette.primary,
      },

      '&:focus-visible': {
         borderWidth: 2,
         borderColor: theme.palette.primary.main,
         outline: 0,
      },
   };
});

export default ControllerTextarea;
