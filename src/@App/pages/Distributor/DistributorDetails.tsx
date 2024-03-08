import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button, Grid, Chip } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import PageContent from '@App/component/customs/PageContent';
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
      { label: 'Mã nhà phân phối', value: distributor?.code, border: true },
      { label: 'Tên nhà phân phối', value: distributor?.name, border: true },
      { label: 'Email nhà phân phối', value: distributor?.email, border: true },
      { label: 'Số điện thoại', value: distributor?.phone, border: true },

      {
         label: 'Địa chỉ',
         value:
            distributor?.address?.province?.name &&
            distributor?.address?.district?.name &&
            distributor?.address?.wards?.name &&
            distributor?.address?.specific &&
            `${distributor?.address?.province?.name}, ${distributor?.address?.district?.name}, ${distributor?.address?.wards?.name}, ${distributor?.address?.specific || ''}`,
         border: true,
      },
      { label: 'Ngày tạo', value: formDate(distributor?.createdAt), border: true },
      { label: 'Ngày cập nhật cuối', value: formDate(distributor?.updatedAt), border: true },
      {
         label: 'Danh mục',
         value: (
            <Box display="flex" alignItems="center" gap="12px">
               {distributor?.materials_catalogs.map((item) => {
                  return <Chip label={item.name} color="info" />;
               })}
            </Box>
         ),
         border: false,
      },
   ];
   const bankAccountdetails = [
      { label: 'Số tài khoản', value: distributor?.bank_account_id.bank_account_number, border: true },
      { label: 'Người thụ hưởng', value: distributor?.bank_account_id.account_holder_name, border: true },
      { label: 'Tên ngân hàng', value: distributor?.bank_account_id.bank_name, border: true },
      { label: 'Chi nhánh', value: distributor?.bank_account_id.bank_branch, border: true },
   ];

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel="Chi tiết nhà phân phối">
         <Box>
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
         <PageContent>
            {distributor && (
               <Stack>
                  <Box sx={{ ml: 2, bgcolor: '#FFFF', borderRadius: 2, position: 'relative' }}>
                     <Box sx={{ borderRadius: 2, position: 'relative' }}>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 25 }}>
                           <Typography sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}>
                              Thông tin nhà phân phối
                           </Typography>
                        </Box>
                        {ditributordetails.map((detail, index) => (
                           <Grid item xs={12} key={index}>
                              <Grid container spacing={1}>
                                 <Grid item xs={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Typography
                                       sx={{ fontSize: '1rem', lineHeight: '2.4rem', color: theme.palette.grey[800] }}
                                    >
                                       {detail.label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={9}>
                                    <Typography
                                       sx={{
                                          p: 1,
                                          pb: 0,
                                          fontWeight: '500',
                                          flexGrow: 1,
                                          fontSize: '1rem',
                                          lineHeight: '2rem',
                                          minHeight: '40px',
                                       }}
                                    >
                                       {detail.value}
                                    </Typography>
                                    {detail.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                                 </Grid>
                              </Grid>
                           </Grid>
                        ))}
                     </Box>
                     <Box sx={{ mt: 3, borderRadius: 2, position: 'relative' }}>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 25 }}>
                           <Typography sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}>
                              Tài khoản thụ hưởng
                           </Typography>
                        </Box>
                        {bankAccountdetails.map((detail, index) => (
                           <Grid item xs={12} key={index}>
                              <Grid container spacing={1}>
                                 <Grid item xs={3} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Typography
                                       sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}
                                    >
                                       {detail.label}
                                    </Typography>
                                 </Grid>
                                 <Grid item xs={9}>
                                    <Typography
                                       sx={{
                                          p: 1,
                                          pb: 0,
                                          fontWeight: '500',
                                          flexGrow: 1,
                                          fontSize: '1rem',
                                          lineHeight: '2rem',
                                          minHeight: '40px',
                                       }}
                                    >
                                       {detail.value}
                                    </Typography>
                                    {detail.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                                 </Grid>
                              </Grid>
                           </Grid>
                        ))}
                     </Box>
                  </Box>
               </Stack>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default DistributorDetails;
