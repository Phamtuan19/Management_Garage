/* eslint-disable @typescript-eslint/naming-convention */
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ControllerDatePickYear = () => {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer
            sx={{
               pt: 0,
               overflow: 'hidden',
            }}
            components={['DatePicker']}
         >
            <DatePicker
               sx={{
                  '.css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                     height: '1.2375em',
                  },
                  width: '100%',
               }}
               openTo="year"
               views={['year']}

               //    label="chọn năm"
            />
         </DemoContainer>
      </LocalizationProvider>
   );
};

export default ControllerDatePickYear;
