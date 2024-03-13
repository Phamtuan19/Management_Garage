import PageContent from '@App/component/customs/PageContent';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Grid, Typography } from '@mui/material';

interface RepairInvoiceInformationProps {
   data: ResponseFindOneRepairInvoice | undefined;
}

const RepairInvoiceInformation = ({ data }: RepairInvoiceInformationProps) => {
   const renderInfo = [
      {
         title: 'Tên khách hàng:',
         value: data?.customer_id.name,
         border: true,
      },
      {
         title: 'Số điện thoại:',
         value: data?.customer_id.phone,
         border: true,
      },
      {
         title: 'Email:',
         value: data?.customer_id.email,
         border: true,
      },
      {
         title: 'Xe:',
         value: data?.car_id.name,
         border: true,
      },
      {
         title: 'Số Km:',
         value: data?.kilometer,
         border: true,
      },
      {
         title: 'Biển số xe:',
         value: data?.car_id.license_plate,
         border: true,
      },
      {
         title: 'Hãng xe:',
         value: data?.car_id.brand_car,
         border: true,
      },
      {
         title: 'Loại xe:',
         value: data?.car_id.car_type,
         border: true,
      },
      {
         title: 'Màu xắc:',
         value: data?.car_id.car_color,
         border: true,
      },
   ];

   return (
      <PageContent>
         <Grid container spacing={2}>
            {renderInfo.map((item, index) => {
               return (
                  <Grid item xs={4} key={index}>
                     <Grid container spacing={1}>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                           <ControllerLabel title={item.title} />
                        </Grid>
                        <Grid item xs={8}>
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
      </PageContent>
   );
};

export default RepairInvoiceInformation;
