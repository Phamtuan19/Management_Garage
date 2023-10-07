/**
 *
 * @param {NonNullableData}
 * NonNullableData<T> là một conditional type.
 * Nó kiểm tra kiểu dữ liệu T và nếu T là null hoặc undefined,
 * thì kiểu kết quả là never (để ngăn việc gán null hoặc undefined cho dataLocal).
 * Nếu T không phải là null hoặc undefined, thì kiểu kết quả là T chính nó.
 *
 */

type NonNullableData<T> = T extends null | undefined ? never : T;

interface UseLocalStorageType<T> {
   key: string;
   dataLocal: NonNullableData<T>;
}

const useLocalStorage = () => {
   const getLocalStorage = (key: string) => {
      try {
         const value = localStorage.getItem(key);
         return value ? JSON.parse(value) : value;
      } catch (_) {
         console.error('đã có lỗi xảy ra');
      }
   };

   const setLocalStorage = <T>(props: UseLocalStorageType<T>) => {
      try {
         const { key, dataLocal } = props;
         return localStorage.setItem(key, JSON.stringify(dataLocal));
      } catch (_) {
         console.error('đã có lỗi xảy ra');
      }
   };

   return { getLocalStorage, setLocalStorage };
};

export default useLocalStorage;
