/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useCallback } from 'react';

const DEFAULT_RESPONSE: any = {
   data: null,
   pageSize: 10,
   pageIndex: 1,
   total: 1,
};

const useCoreTable = (props: any) => {
   const { data = DEFAULT_RESPONSE, loading, runQueryAsync } = props;

   const handleFetchData = useCallback((params: { [key: string]: string }) => {
      const query = {
         ...params,
      };
      return runQueryAsync(query);
   }, []);

   return {
      data: data,
      pageSize: Number(data?.pageSize) ?? 10,
      pageIndex: Number(data?.pageIndex) ?? 1,
      total: Number(data?.total),
      handleFetchData,
      loading,
   };
};

export default useCoreTable;
