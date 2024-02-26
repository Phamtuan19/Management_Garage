/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { Grid, MenuItem, Select } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import dayjs from 'dayjs';

const dataSelectTime = [
   'Tùy chỉnh',
   'Hôm nay',
   'Hôm trước',
   'Tuần này',
   'Tuần trước',
   'Tháng này',
   'Tháng trước',
   'Quý này',
   'Quý trước',
   'Năm nay',
   'Năm trước',
];

const Doashboard = () => {
   const { searchParams, setParams } = useSearchParamsHook();

   // const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
   //    {
   //       label: 'This Week',
   //       getValue: () => {
   //          const today = dayjs();
   //          return [today.startOf('week'), today.endOf('week')];
   //       },
   //    },
   //    {
   //       label: 'Last Week',
   //       getValue: () => {
   //          const today = dayjs();
   //          const prevWeek = today.subtract(7, 'day');
   //          return [prevWeek.startOf('week'), prevWeek.endOf('week')];
   //       },
   //    },
   //    {
   //       label: 'Last 7 Days',
   //       getValue: () => {
   //          const today = dayjs();
   //          return [today.subtract(7, 'day'), today];
   //       },
   //    },
   //    {
   //       label: 'Current Month',
   //       getValue: () => {
   //          const today = dayjs();
   //          return [today.startOf('month'), today.endOf('month')];
   //       },
   //    },
   //    {
   //       label: 'Next Month',
   //       getValue: () => {
   //          const today = dayjs();
   //          const startOfNextMonth = today.endOf('month').add(1, 'day');
   //          return [startOfNextMonth, startOfNextMonth.endOf('month')];
   //       },
   //    },
   //    { label: 'Reset', getValue: () => [null, null] },
   // ];

   return (
      <BaseBreadcrumbs arialabel="Doashboard">
         <PageContent>
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
                           value={[dayjs(searchParams['start_date']), dayjs(searchParams['end_date'])]}
                           onChange={(e) => {
                              setParams('start_date', dayjs(e[0]) as unknown as string);
                              setParams('end_date', dayjs(e[1]) as unknown as string);
                           }}
                        />
                     </DemoContainer>
                  </LocalizationProvider>
               </Grid>
            </Grid>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default Doashboard;
