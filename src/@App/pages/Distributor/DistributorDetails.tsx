/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { format } from 'date-fns';
import distributorService, { IDistributor } from '@App/services/distributor.service';
const breadcrumbs = [
   {
      title: 'Nhà phân phối',
      link: ROUTE_PATH.DISTRIBUTORS,
   },
];
const DistributorDetails = () => {
   const { id: distributorId } = useParams();
   const navigate = useNavigate();
   const { data: distributor } = useQuery<IDistributor, Error>(['getDistributorDetails'], async () => {
      const distributorRes = await distributorService.find(distributorId as string);
      return distributorRes.data as IDistributor;
   });
   const formatDate = (dateString: string | number | Date) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };
   const DetailsItem = ({ label, value }: { label: string; value: string }) => (
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         <Grid item xs={3}>
            <Typography sx={{ p: 1, fontWeight: '700', fontSize: '1rem', color: theme.palette.grey[800] }}>
               {label}
            </Typography>
         </Grid>
         <Grid item xs={9}>
            <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem' }}>{value}</Typography>
            <Divider variant="inset" sx={{ m: 0 }} />
         </Grid>
      </Grid>
   );
   const DetailsSection = ({ details }: { details: { label: string; value: string }[] }) =>
      details.map((detail: { label: string; value: string }, index: React.Key | null | undefined) => (
         <Grid key={index}>
            <DetailsItem label={detail.label} value={detail.value} />
         </Grid>
      ));
   const bankAccountDetails = [
      { label: 'Số tài khoản', value: distributor?.bank_account_id.bank_account_number },
      { label: 'Tên tài khoản', value: distributor?.bank_account_id.bank_name },
      { label: 'Chi nhánh', value: distributor?.bank_account_id.bank_branch },
      { label: 'Chủ tài khoản', value: distributor?.bank_account_id.account_holder_name },
      { label: 'Ngày tạo', value: formatDate(distributor!.bank_account_id.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formatDate(distributor!.bank_account_id.updatedAt) },
   ];

   const distrubutorDetails = [
      { label: 'Mã nhà phân phối', value: distributor?.code },
      { label: 'Tên nhà phân phối', value: distributor?.name },
      { label: 'Số điện thoại', value: distributor?.phone },
      { label: 'Email', value: distributor?.email },
      {
         label: 'Địa chỉ',
         value: `${distributor?.address.province.name}, ${distributor?.address.district.name}, ${distributor?.address.wards.name}, ${distributor?.address.specific}`,
      },
      { label: 'Ngày tạo', value: formatDate(distributor!.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formatDate(distributor!.updatedAt) },
   ];

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết nhà phân phối"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            {distributor && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
                        <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="VIEW_ALL">
                           <Button
                              variant="contained"
                              onClick={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + distributorId + '/update')}
                              endIcon={<RateReviewRoundedIcon />}
                           >
                              Chỉnh sửa
                           </Button>
                        </PermissionAccessRoute>
                     </Box>
                     <Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin nhà phân phối
                              </Typography>
                           </Box>
                           <DetailsSection details={distrubutorDetails as any} />
                        </Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Tài khoản thụ hưởng
                              </Typography>
                           </Box>
                           <DetailsSection details={bankAccountDetails as any} />
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};
export default DistributorDetails;
