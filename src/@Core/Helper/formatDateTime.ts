import { format } from 'date-fns';

const formatDateTime = (date: string | number | Date) => {
   return date ? format(new Date(date), 'MM/dd/yyyy') : '';
};

export default formatDateTime;
