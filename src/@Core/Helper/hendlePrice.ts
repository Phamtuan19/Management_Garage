const handlePrice = (number: number, space: string = '.', currencyUnit: string = 'đ'): string => {
   if (!number || number === 0) {
      return 0 + currencyUnit;
   }
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, space) + currencyUnit;
};

export default handlePrice;
