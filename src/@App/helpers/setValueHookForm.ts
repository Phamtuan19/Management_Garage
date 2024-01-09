import { UseFormSetValue, FieldValues, Path, PathValue } from 'react-hook-form';

const setValueHookForm = <T extends FieldValues>(setValue: UseFormSetValue<T>, data: { [key: string]: string }) => {
   return Object.keys(data).map((key) => {
      const value = data[key];
      return setValue(key as Path<T>, value as PathValue<T, Path<T>>);
   });
};

export default setValueHookForm;
