/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Box, Button } from '@mui/material';
import dayjs from 'dayjs';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { useOnClickOutside } from '@App/hooks/useOnClickOutside';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

const Calendar = ({
   nameStart = 'start_date',
   nameEnd = 'end_date',
   isReset = false,
   startReset = undefined,
   endReset = undefined,
}: {
   nameStart?: string;
   nameEnd?: string;
   isReset?: boolean;
   startReset?: Date | undefined;
   endReset?: Date | undefined;
}) => {
   const [open, setOpen] = useState<boolean>(false);

   const { setParams, searchParams, deleteParams } = useSearchParamsHook();

   const dayPickerRef = useRef<any>(null);

   useOnClickOutside(dayPickerRef, () => {
      setOpen(false);
   });

   const defaultSelected: DateRange = {
      from: searchParams[nameStart] ? new Date(searchParams[nameStart]) : undefined,
      to: searchParams[nameEnd] ? new Date(searchParams[nameEnd]) : undefined,
   };

   const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

   let footer = <p></p>;
   if (range?.from) {
      if (!range.to) {
         footer = <p>{format(range.from, 'PPP')}</p>;
      } else if (range.to) {
         footer = (
            <p>
               {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
            </p>
         );
      }
   }

   useEffect(() => {
      if (range) {
         range.from ? setParams(nameStart, String(range.from)) : deleteParams(nameStart);
         range.to ? setParams(nameEnd, String(range.to)) : deleteParams(nameEnd);
      }
   }, [range]);

   return (
      <Box display="flex" gap={1}>
         <Box sx={{ position: 'relative' }}>
            <Button
               endIcon={<CalendarMonthRoundedIcon />}
               variant="outlined"
               sx={{ borderColor: 'rgba(0, 0, 0, 0.23)', color: 'rgba(0, 0, 0, 0.87)' }}
               onClick={() => setOpen(true)}
            >
               {range?.from ? (
                  range.to ? (
                     <>
                        {dayjs(range?.from).format('DD/MM/YYYY')} - {dayjs(range?.to).format('DD/MM/YYYY')}
                     </>
                  ) : (
                     dayjs(range?.from).format('DD/MM/YYYY')
                  )
               ) : (
                  <span>DD/MM/YYYY - DD/MM/YYYY</span>
               )}
            </Button>
            {open && (
               <Box
                  ref={dayPickerRef}
                  sx={{
                     mt: 1,

                     zIndex: 10,
                     borderRadius: '6px',
                     boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
                     background: 'white',
                     position: 'absolute',
                  }}
               >
                  <DayPicker
                     id="test"
                     mode="range"
                     defaultMonth={undefined}
                     selected={range}
                     footer={footer}
                     onSelect={setRange}
                  />
               </Box>
            )}
         </Box>
         {isReset && (
            <Button
               onClick={() => {
                  deleteParams(nameStart);
                  deleteParams(nameEnd);
                  setRange({
                     from: startReset,
                     to: endReset,
                  });
               }}
            >
               Đặt lại
            </Button>
         )}
      </Box>
   );
};

export default Calendar;
