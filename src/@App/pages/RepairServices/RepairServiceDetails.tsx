/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams, useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import MODULE_PAGE from '@App/configs/module-page';
import theme from '@Core/Theme';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import {
   Box,
   Typography,
   Button,
   Grid,
   styled,
   Accordion,
   AccordionDetails,
   TextareaAutosize,
   Chip,
} from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import repairServiceService from '@App/services/repairService.service';
import PageContent from '@App/component/customs/PageContent';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import formatPrice from '@Core/Helper/formatPrice';
import formatDateTime from '@Core/Helper/formatDateTime';

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
      { label: 'Giá', value: formatPrice(repairService?.price) },
      { label: 'Giảm giá', value: repairService?.discount },
      {
         label: 'Loại xe sử dụng dịch vụ',
         value: (
            <Box display="flex" alignItems="center" gap="12px" mb={1}>
               {repairService?.cars.map((item: string) => <Chip label={item} color="default" />)}
            </Box>
         ),
         border: false,
      },
      { label: 'Ngày tạo', value: formatDateTime(repairService?.createdAt) },
   ];

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel={repairService?.name ?? ''}>
         <Box display="flex" gap="12px">
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action="UPDATE">
               <Button variant="contained" onClick={() => navigate(ROUTE_PATH.REPAIR_SERVICES + ROUTE_PATH.CREATE)}>
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action="UPDATE">
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.REPAIR_SERVICES + '/' + repairServiceId + '/update')}
                  color="secondary"
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
                           <Typography
                              sx={{ fontSize: '1rem', lineHeight: '32px', minHeight: '32px', fontWeight: '500' }}
                           >
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
                        sx={{ fontSize: '1rem', lineHeight: '32px', minHeight: '32px', fontWeight: '500' }}
                        dangerouslySetInnerHTML={{ __html: repairService?.describe }}
                     />
                     <Divider variant="inset" sx={{ ml: 0 }} />
                  </Grid>
               </Grid>
            )}
         </PageContent>
         <PageContent>
            <Typography
               sx={{
                  fontSize: '1rem',
                  py: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                  borderBottom: '1px solid #E8EAEB',
               }}
            >
               Công việt cần thực hiện
            </Typography>
            {repairService?.details?.map((item: { name: string; describe: string }, index: number) => {
               return (
                  <Box mt={2}>
                     <Accordion
                        expanded={true}
                        sx={{ boxShadow: 'none', borderBottom: '1px solid #E8EAEB' }}
                        key={index}
                     >
                        <AccordionSummary>
                           <Typography component="h3" sx={{ fontWeight: 400, fontSize: '16px' }}>
                              {item.name}
                           </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 1, py: 0 }}>
                           <Grid container spacing={2}>
                              <Grid item xs={12} sx={{ pb: 2 }}>
                                 <Box>
                                    <ExtendTextareaAutosize
                                       minRows={5}
                                       sx={{ borderColor: '#d0d7de' }}
                                       value={item.describe}
                                       disabled
                                    />
                                 </Box>
                              </Grid>
                           </Grid>
                        </AccordionDetails>
                     </Accordion>
                  </Box>
               );
            })}
         </PageContent>
      </BaseBreadcrumbs>
   );
};

const AccordionSummary = styled((props: AccordionSummaryProps) => (
   <MuiAccordionSummary expandIcon={<ChevronRightIcon sx={{ width: '20px', height: '20px' }} />} {...props} />
))({
   width: '100%',
   minHeight: 'auto !important',
   boxShadow: 'unset',
   flexDirection: 'row',
   margin: '0px',
   padding: '0px 0px 12px 0px',
   borderRadius: '5px',
   textDecoration: 'none',
   cursor: 'pointer',
   gap: 12,
   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
   },
   '& .MuiAccordionSummary-content': {
      margin: '1px !important',
   },
   '& .css-635bne-MuiPaper-root-MuiAccordion-root .Mui-expanded': {
      backgroundColor: '#f3f5f7 !important',
   },
});

const ExtendTextareaAutosize = styled(TextareaAutosize)(({ theme }) => {
   return {
      borderRadius: '6px',
      width: '100%',
      padding: '8.5px 14px',

      '&:hover': {
         borderColor: theme.palette.primary,
      },

      '&:focus-visible': {
         borderWidth: 2,
         borderColor: theme.palette.primary.main,
         outline: 0,
      },
   };
});

export default RepairServiceDetails;
