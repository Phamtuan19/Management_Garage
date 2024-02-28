import { format } from 'date-fns';

const hendleDateTime = (date: string | number | Date) => {
   return date ? format(new Date(date), 'MM-dd-yyyy') : '';
};

export default hendleDateTime;
