import { useEffect, useRef, useState } from 'react';

type UseDebounce = (value: string, delay: number) => string | null;

const useDebounce: UseDebounce = (value, delay) => {
   const [debounceValue, setDebounceValue] = useState<string | null>(null);
   const timer = useRef<number | null>(null);

   useEffect(() => {
      if (debounceValue !== value) {
         timer.current = window.setTimeout(() => {
            setDebounceValue(value);
         }, delay);
      }

      return () => {
         if (timer.current) {
            clearTimeout(timer.current);
         }
      };
   }, [value, delay]);

   return debounceValue;
};

export default useDebounce;
