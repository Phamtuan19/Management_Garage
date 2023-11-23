import { Grid, TextField } from '@mui/material';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box } from '@mui/system';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';

export default function Personnels() {
   const columns = useMemo(() => {
      return [
         columnHelper.accessor('', {
            header: 'STT',
            cell: ({ row }) => {
               return <Box width={100}>{row.index + 1}</Box>;
            },
         }),
         columnHelper.accessor('', {
            header: 'name',
            cell: ({ row }) => {
               return <Box width={100}>{row.index + 1}</Box>;
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Personnels">
         <TextField placeholder="Search" name="search" size="small" sx={{ marginBottom: '20px' }} />

         <TableCore columns={columns as any} data={[]} />
      </BaseBreadcrumbs>
   );
}
