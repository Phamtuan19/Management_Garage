import { STATUS_DELIVERY } from '@App/configs/status-config';
import { DeliveryNoteData } from '@App/types/delivery';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import formatDateTime from '@Core/Helper/formatDateTime';
import { Box, Chip, Grid, Typography } from '@mui/material';

interface DetailDeliveryProps {
   delivery: DeliveryNoteData | undefined;
}

const DetailDeliveryInfo = ({ delivery }: DetailDeliveryProps) => {
   const renderInfo = [
      {
         title: 'Mã phiếu:',
         value: delivery ? '#' + delivery?.code : '',
         border: true,
      },
      {
         title: 'Nhân viên tạo:',
         value: delivery?.personnel_id.full_name ?? '',
         border: true,
      },
      {
         title: 'Trạng thái:',
         value: (
            <Chip
               label={delivery ? STATUS_DELIVERY[delivery.status].title : STATUS_DELIVERY.unconfimred.title}
               color={delivery ? STATUS_DELIVERY[delivery.status].color : STATUS_DELIVERY.unconfimred.color}
            />
         ),
         border: false,
      },
      {
         title: 'Mã phiếu sửa chữa:',
         value: delivery?.repair_invoice_id?.code ?? '',
         border: true,
      },
      {
         title: 'Ngày tạo:',
         value: delivery ? formatDateTime(delivery?.createdAt) : '',
         border: true,
      },
   ];

   return (
      <Grid container spacing={2}>
         {renderInfo.map((item, index) => {
            return (
               <Grid item xs={4} key={index}>
                  <Grid container spacing={1}>
                     <Grid item xs={5} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <ControllerLabel title={item.title} />
                     </Grid>
                     <Grid item xs={7}>
                        <Typography
                           sx={{
                              p: 1,
                              pb: 0,
                              fontWeight: '500',
                              flexGrow: 1,
                              fontSize: '1rem',
                              lineHeight: '1.5rem',
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

export default DetailDeliveryInfo;
