import { useEffect, useMemo } from 'react';
import useToastMessage from '@App/redux/slices/toastMessage.slice';
import { Box, Button } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import testService from '@App/services/test.service';

interface TypeRowsData {
   [x: string]: any;
   STT: number;
   lastName: string;
   firstName: string | null;
   age: number | null;
}

const rows = [
   { STT: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
   { STT: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
   { STT: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
   { STT: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
   { STT: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
   { STT: 6, lastName: 'Melisandre', firstName: null, age: 150 },
   { STT: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
   { STT: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
   { STT: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function Home() {
   const { setToastMessage } = useToastMessage();

   const columnHelper = createColumnHelper<TypeRowsData>();

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('STT', {
            header: 'Stt',
         }),
         columnHelper.accessor((data) => data.lastName, {
            header: 'lastName',
         }),
         columnHelper.accessor((data) => data.firstName, {
            header: 'firstName',
         }),
         columnHelper.accessor((data) => data.age, {
            header: 'age',
         }),
         columnHelper.accessor((data) => data.lastName, {
            header: 'lastName',
         }),
         columnHelper.accessor((data) => data.firstName, {
            header: 'firstName',
         }),
         columnHelper.accessor((data) => data.age, {
            header: 'age',
         }),
         columnHelper.accessor((data) => data.lastName, {
            header: 'lastName',
         }),
         columnHelper.accessor((data) => data.firstName, {
            header: 'firstName',
         }),
         columnHelper.accessor((data) => data.age, {
            header: 'age',
         }),
      ];
   }, []);

   useEffect(() => {
      (async () => {
         const res = await testService.testApi();
      })();
   }, []);

   return (
      <>
         <Link to="/profile">Trang Profile</Link>
         <Box>trang home</Box>
         <Button onClick={() => setToastMessage({ message: 'click like me toast message', status: 'success' })}>
            Click Me
         </Button>

         {/* <TableCore columns={columns as any} data={rows} /> */}
      </>
   );
}

export default Home;
