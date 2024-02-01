// import { useParams, useNavigate } from 'react-router-dom';
// import ROUTE_PATH from '@App/configs/router-path';
// import { useQuery } from '@tanstack/react-query';
// import MODULE_PAGE from '@App/configs/module-page';
// import theme from '@Core/Theme';
// import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
// import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
// import { Box, Typography, Stack, Button, Grid } from '@mui/material';
// import Divider from '@mui/material/Divider';
// import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
// import personnelService, { IPersonnel } from '@App/services/personnel.service';

// const breadcrumbs = [
//    {
//       title: 'Nhân sự',
//       link: ROUTE_PATH.PERSONNELS, // Adjust as needed
//    },
// ];

// const PersonnelDetails = () => {
//    const { id: personnelId } = useParams();
//    const navigate = useNavigate();
//    const { data: personnel } = useQuery<IPersonnel, Error>(['getPersonnelDetails'], async () => {
//       const personnelRes = await personnelService.find(personnelId as string);
//       return personnelRes.data as IPersonnel;
//    });

//    const personnelDetails = [
//       { label: 'Mã nhân viên', value: personnel?.code || '' },
//       { label: 'Họ và tên', value: personnel?.fullName || '' },
//       { label: 'Email', value: personnel?.email || '' },
//       { label: 'Tên tài khoản', value: personnel?.accountName || '' },
//       { label: 'Số điện thoại', value: personnel?.phone || '' },
//       { label: 'Ngày sinh', value: personnel?.birthDay || '' },
//       { label: 'Ngày nhân việc', value: personnel?.hireDate || '' },
//       { label: 'Ngày nghỉ việc', value: personnel?.leaveDate || '' },
//       { label: 'CCCD', value: personnel?.cccdNumber || '' },
//    ];

//    return (
//       <Box>
//          <BaseBreadcrumbs
//             breadcrumbs={breadcrumbs}
//             arialabel="Chi tiết nhân sự"
//             sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
//          >
//             {personnel && (
//                <Stack>
//                   <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
//                      <Box sx={{ position: 'absolute', top: '0', right: '0', p: 1 }}>
//                         <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action="VIEW_ALL">
//                            <Button
//                               variant="contained"
//                               onClick={() => navigate(ROUTE_PATH.PERSONNELS + '/' + personnelId + '/update')}
//                               endIcon={<RateReviewRoundedIcon />}
//                            >
//                               Chỉnh sửa
//                            </Button>
//                         </PermissionAccessRoute>
//                      </Box>
//                      <Box>
//                         <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
//                            <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
//                               <Typography
//                                  sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
//                               >
//                                  Thông tin nhân sự
//                               </Typography>
//                            </Box>

//                            {personnelDetails.map((detail, index) => (
//                               <Grid key={index}>
//                                  <DetailsItem label={detail.label} value={detail.value} />
//                               </Grid>
//                            ))}
//                         </Box>
//                      </Box>
//                   </Box>
//                </Stack>
//             )}
//          </BaseBreadcrumbs>
//       </Box>
//    );
// };

// const DetailsItem = ({ label, value }: { label: string; value: string }) => (
//    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//       <Grid item xs={3}>
//          <Typography sx={{ p: 1, fontWeight: '700', fontSize: '1rem', color: theme.palette.grey[800] }}>
//             {label}
//          </Typography>
//       </Grid>
//       <Grid item xs={9}>
//          <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem' }}>{value}</Typography>
//          <Divider variant="inset" sx={{ m: 0 }} />
//       </Grid>
//    </Grid>
// );

// export default PersonnelDetails;

const PersonelDetails = () => {
   return <div>PersonelDetails</div>;
};

export default PersonelDetails;
