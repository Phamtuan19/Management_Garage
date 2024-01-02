import { UseFormSetError, FieldValues, Path } from 'react-hook-form';

const setErrorMessageHookForm = <T extends FieldValues>(
   setError: UseFormSetError<T>,
   dataError: { [key in keyof T]?: string[] },
) => {
   return Object.keys(dataError).map((key) => {
      return setError(key as Path<T>, {
         type: 'error',
         message: dataError[key as keyof T]?.[0] ?? '',
      });
   });
};

export default setErrorMessageHookForm;
