import { format } from 'date-fns';

const formatDateTime = (date: string | number | Date) => {
   return date ? format(new Date(date), 'dd-MM-yyyy') : '';
};

export default formatDateTime;
