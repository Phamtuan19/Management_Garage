import { Stack, Checkbox, Typography, Box } from '@mui/material';
import { Control, Controller, FieldValues } from 'react-hook-form';

interface ControllerChexBoxPropsType<TFieldValues extends FieldValues = FieldValues> {
   name: string;
   _id?: string;
   titleLabel?: string;
   required?: boolean;
   control: Control<TFieldValues>;
}

function ControllerChexBox<TFieldValues extends FieldValues = FieldValues>(props: ControllerChexBoxPropsType<TFieldValues>) {
   const { name, _id, titleLabel, required, control } = props;

   return (
      <Controller
         render={({ field }) => {
            return (
               <Stack direction="row" alignItems="center">
                  <Checkbox id={_id} {...field} />
                  <Typography component="label" id={_id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                     {titleLabel}
                     {required && (
                        <Box component="span" sx={{ color: 'red', fontSize: 24 }}>
                           *
                        </Box>
                     )}
                  </Typography>
               </Stack>
            );
         }}
         name={name as any}
         control={control}
      />
   );
}

export default ControllerChexBox;
