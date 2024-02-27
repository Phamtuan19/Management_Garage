import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import Divider from '@mui/material/Divider';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';

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
   const formDate = (dateString: string | undefined) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };
   const ditributordetails = [
      { label: 'Mã nhà phân phối', value: distributor?.code },
      { label: 'Tên nhà phân phối', value: distributor?.name },
      { label: 'Email nhà phân phối', value: distributor?.email },
      { label: 'Số điện thoại', value: distributor?.phone },
      {
         label: 'Địa chỉ',
         value: `${distributor?.address.province?.name}, ${distributor?.address.district?.name}, ${distributor?.address.wards?.name}, ${distributor?.address.specific}`,
      },
      { label: 'Ngày tạo', value: formDate(distributor?.createdAt) },
      { label: 'Ngày cập nhật cuối', value: formDate(distributor?.updatedAt) },
   ];
   const bankAccountdetails = [
      { label: 'Số tài khoản', value: distributor?.bank_account_id.bank_account_number },
      { label: 'Người thụ hưởng', value: distributor?.bank_account_id.account_holder_name },
      { label: 'Tên ngân hàng', value: distributor?.bank_account_id.bank_name },
      { label: 'Chi nhánh', value: distributor?.bank_account_id.bank_branch },
   ];

   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết nhà phân phối"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            <Box sx={{ p: 1 }}>
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
            {distributor && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box>
                        <Box sx={{ mt: 2, p: 2, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin nhà phân phối
                              </Typography>
                           </Box>
                           {ditributordetails.map((detail, index) => (
                              <Grid key={index}>
                                 <DetailsItem label={detail.label} value={detail.value} />
                              </Grid>
                           ))}
                        </Box>
                        <Box sx={{ mt: 2, p: 2, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Tài khoản thụ hưởng
                              </Typography>
                           </Box>
                           {bankAccountdetails.map((detail, index) => (
                              <Grid key={index}>
                                 <DetailsItem label={detail.label} value={detail.value} />
                              </Grid>
                           ))}
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};
const DetailsItem = ({ label, value }: { label: string; value: string | undefined }) => (
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
         <Typography sx={{ p: 1, fontSize: '1rem', color: theme.palette.grey[800] }}>{label}</Typography>
      </Grid>
      <Grid item xs={9}>
         <Typography sx={{ p: 1, fontWeight: '500', flexGrow: 1, fontSize: '1rem', height: '50px' }}>
            {value}
         </Typography>
         <Divider variant="inset" sx={{ m: 0 }} />
      </Grid>
   </Grid>
);
export default DistributorDetails;
