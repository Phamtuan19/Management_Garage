/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosResponseDataType } from '@Core/Api/axios-config';
import { UseQueryResult } from '@tanstack/react-query';

import useSearchParamsHook from './useSearchParamsHook';

const useCoreTable = (props: UseQueryResult<AxiosResponseDataType, unknown>) => {
   const { searchParams, setParams } = useSearchParamsHook();
   const { data, isLoading, refetch } = props;

   if (Number(data?.total_page) < Number(searchParams?.page)) {
      setParams('page', 1);
   }

   if (searchParams.limit && ![10, 20, 50].includes(Number(searchParams.limit))) {
      setParams('limit', 10);
   }

   return {
      data: data?.data || [],
      total_page: Number(data?.total_page) || 1,
      page: Number(searchParams?.page) || 1,
      total_record: Number(data?.total_record) || 1,
      limit: Number(searchParams?.limit) || 10,
      refetch,
      isLoading,
   };
};

export default useCoreTable;
