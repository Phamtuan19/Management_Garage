import { DeliveryNoteDataDetail, DeliveryNoteDataDetailOption } from '@App/types/delivery';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { Row } from '@tanstack/react-table';
import formatPrice from '@Core/Helper/formatPrice';

interface RenderSubComponentProps {
   row: Row<DeliveryNoteDataDetail>;
}

const RenderSubComponent = ({ row }: RenderSubComponentProps) => {
   return row?.original?.options.map((item) => {
      return renderDetails(item);
   });
};

const renderDetails = (data: DeliveryNoteDataDetailOption) => {
   const dataRender = [
      {
         title: 'Mã lô vật tư:',
         value: data && '#' + data.supplies_invoice_code,
         border: true,
      },
      {
         title: 'Giá bán:',
         value: formatPrice(data.selling_price),
         border: true,
      },
      {
         title: 'Giảm giá:',
         value: data.discount,
         border: true,
      },
      {
         title: 'Số lượng xuất:',
         value: <Chip label={data.export_quantity ?? 0} color="primary" />,
         border: false,
      },
   ];

   return (
      <Grid container spacing={2}>
         {dataRender.map((item, index) => {
            return (
               <Grid item xs={3} key={index}>
                  <Grid container spacing={5}>
                     <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <Typography
                           sx={({ base }) => ({
                              color: base.text.gray2,
                              fontWeight: '500',
                              flexGrow: 1,
                              fontSize: '1rem',
                              lineHeight: '1.5rem',
                              minHeight: '32px',
                           })}
                        >
                           {item.title}
                        </Typography>
                     </Grid>
                     <Grid item xs={8} pb={1} minHeight="36px">
                        <Typography
                           sx={{
                              p: 1,
                              pb: 0,
                              fontWeight: '500',
                              flexGrow: 1,
                              fontSize: '1rem',
                              lineHeight: '1.5rem',
                              minHeight: '32px',
                           }}
                        >
                           {item.value}
                        </Typography>
                        {item.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                     </Grid>
                  </Grid>
               </Grid>
            );
         })}
      </Grid>
   );
};

export default RenderSubComponent;
