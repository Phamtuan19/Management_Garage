/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, MenuItem, Select } from '@mui/material';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs from 'dayjs';

import { dataSelectTime } from '../utils';

const DoashboardFilter = () => {
   const { searchParams, setParams } = useSearchParamsHook();

   return (
      <Grid container spacing={1}>
         <Grid item xs={2}>
            <Select
               placeholder=""
               value={searchParams['time_select'] ?? dataSelectTime[0]}
               fullWidth
               onChange={(e) => setParams('time_select', e.target.value)}
            >
               {dataSelectTime.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
               ))}
            </Select>
         </Grid>

         <Grid item xs={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DemoContainer
                  components={['SingleInputDateRangeField']}
                  sx={{
                     pt: 0,
                  }}
               >
                  <DateRangePicker
                     slots={{ field: SingleInputDateRangeField }}
                     name="allowedRange"
                     calendars={1}
                     sx={{
                        '.css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                           fontSize: '15px',
                        },
                     }}
                     value={[
                        searchParams['start_date'] ? dayjs(searchParams['start_date']) : dayjs().startOf('month'),
                        searchParams['end_date'] ? dayjs(searchParams['end_date']) : dayjs(),
                     ]}
                     // defaultValue={[]}
                     format="DD-MM-YYYY"
                     onChange={(e) => {
                        if (e && e[0] && e[1]) {
                           setParams('start_date', dayjs(e[0]) as unknown as string);
                           setParams('end_date', dayjs(e[1]) as unknown as string);
                        }
                     }}
                  />
               </DemoContainer>
            </LocalizationProvider>
         </Grid>
      </Grid>
   );
};

export default DoashboardFilter;
