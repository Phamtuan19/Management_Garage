import { useSearchParams } from 'react-router-dom';

const useSearchParamsHook = () => {
   const [searchParams, setSearchParams] = useSearchParams();

   const params = Object.fromEntries([...searchParams]);

   const setParams = (key: string, value: string | number) => {
      params[key] = String(value);

      return setSearchParams(params);
   };

   const deleteParams = (key: string) => {
      delete params[key];

      return setSearchParams(params);
   };

   return {
      searchParams: params,
      setParams,
      deleteParams,
   };
};

export default useSearchParamsHook;
