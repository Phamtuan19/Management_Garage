/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Button, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import repairServiceService from '@App/services/repairService.service';
import PageContent from '@App/component/customs/PageContent';
import hendleDateTime from '@Core/Helper/formatDateTime';

const breadcrumbs = [
   {
      title: 'Dịch vụ sửa chữa',
      link: ROUTE_PATH.REPAIR_SERVICES,
   },
];
const RepairServiceDetails = () => {
   const { id: repairServiceId } = useParams();
   const navigate = useNavigate();
   const { data: repairService } = useQuery(['getRepairServiceDetails'], async () => {
      const res = await repairServiceService.find(repairServiceId as string);
      return res.data;
   });

   const repairServiceDetails = [
      { label: 'Tên dịch vụ', value: repairService?.name },
      { label: 'Giá', value: repairService?.price },
      { label: 'Giảm giá', value: repairService?.discount },
      { label: 'Ngày tạo', value: hendleDateTime(repairService?.createdAt) },
   ];

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel={repairService?.name ?? ''}>
         <Box>
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action="UPDATE">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.REPAIR_SERVICES + '/' + repairServiceId + '/update')}
                  endIcon={<RateReviewRoundedIcon />}
               >
                  Chỉnh sửa
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            {repairService && (
               <Grid container spacing={2}>
                  {repairServiceDetails?.map((detail, index) => (
                     <>
                        <Grid item xs={2} key={index}>
                           <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>
                              {detail.label}
                           </Typography>
                        </Grid>
                        <Grid item xs={10}>
                           <Typography sx={{ fontSize: '1rem', lineHeight: '32px', height: '32px', fontWeight: '500' }}>
                              {detail.value}
                           </Typography>
                           <Divider variant="inset" sx={{ ml: 0 }} />
                        </Grid>
                     </>
                  ))}

                  <Grid item xs={2}>
                     <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>Mô tả</Typography>
                  </Grid>
                  <Grid item xs={10}>
                     <Typography
                        sx={{ fontSize: '1rem', lineHeight: '32px', height: '32px', fontWeight: '500' }}
                        dangerouslySetInnerHTML={{ __html: repairService?.describe }}
                     />
                     <Divider variant="inset" sx={{ ml: 0 }} />
                  </Grid>
               </Grid>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};
export default RepairServiceDetails;
