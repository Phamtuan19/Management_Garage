import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import { Box, Typography, Stack, Button } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import PageContent from '@App/component/customs/PageContent';
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
      return new Date(dateString).toLocaleString('en-US', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
         hour: '2-digit',
         minute: '2-digit',
         second: '2-digit',
      });
   };

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Chi tiết nhà phân phối"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <PageContent>
            {distributor && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
                        <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="VIEW_ALL">
                           <Button
                              variant="contained"
                              onClick={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/update/' + distributorId)}
                              endIcon={<RateReviewRoundedIcon />}
                           >
                              Chỉnh sửa
                           </Button>
                        </PermissionAccessRoute>
                     </Box>
                     <Box sx={{ mt: 4, p: 2, borderRadius: 2, position: 'relative' }}>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 22 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Mã nhà phân phối
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>{distributor.code}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 21 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Tên nhà phân phối
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>{distributor.name}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 26 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Số điện thoại
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>{distributor.phone}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 33 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Email
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>{distributor.email}</Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 31.5 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Địa chỉ
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>
                              {`${distributor.address.province.name}, ${distributor.address.district.name}, ${distributor.address.wards.name}, ${distributor.address.specific}`}
                           </Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 29.5 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Ngày tạo
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>
                              {formatDate(distributor.createdAt)}
                           </Typography>
                        </Box>
                        <Box sx={{ minHeight: '50px', display: 'flex', gap: 19.5 }}>
                           <Typography sx={{ fontWeight: '500', fontSize: '1rem', color: theme.palette.grey[800] }}>
                              Ngày cập nhật cuối
                           </Typography>
                           <Typography sx={{ flexGrow: 1, fontSize: '1rem' }}>
                              {formatDate(distributor.updatedAt)}
                           </Typography>
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};
export default DistributorDetails;
