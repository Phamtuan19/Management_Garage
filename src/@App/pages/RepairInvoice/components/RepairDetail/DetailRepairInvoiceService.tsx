/* eslint-disable @typescript-eslint/naming-convention */
import { AccordionDetails, Box, Button, Chip, Grid, Typography, styled } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { ResponseFindOneRepairInvoiceService } from '@App/types/repair-invoice';
import { useMemo } from 'react';
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatPrice from '@Core/Helper/formatPrice';
import { STATUS_REPAIR_DETAIL } from '@App/configs/status-config';
import { Row } from '@tanstack/react-table';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import RemoveIcon from '@mui/icons-material/Remove';

interface DetailRepairInvoiceServiceProps {
   data: ResponseFindOneRepairInvoiceService[];
}

const DetailRepairInvoiceService = ({ data }: DetailRepairInvoiceServiceProps) => {
   const columns = useMemo(() => {
      return [
         columnHelper.accessor('expander', {
            header: '',
            cell: ({ row }) => {
               return (
                  <Box textAlign="center" width="25px" py={1}>
                     {row.getCanExpand() ? (
                        <Button
                           variant="text"
                           sx={{ p: '1px 2px', minWidth: 'auto' }}
                           {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: { cursor: 'pointer' },
                           }}
                        >
                           {row.getIsExpanded() ? '👇' : '👉'}
                        </Button>
                     ) : (
                        '🔵'
                     )}{' '}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('service_code', {
            header: 'Mã Dv',
            cell: (info) => {
               return <Box>#{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('service_name', {
            header: 'Tên dịch vụ',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
            size: 500,
         }),
         columnHelper.accessor('category_name', {
            header: 'Danh mục',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('price', {
            header: 'Đơn giá',
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('discount', {
            header: 'giảm giá',
            cell: ({ row }) => {
               const data = row.original as ResponseFindOneRepairInvoiceService;
               const discountPrice = data.price - (data.price * data.discount) / 100;
               return <Box>{formatPrice(discountPrice)}</Box>;
            },
         }),
         columnHelper.accessor('status', {
            header: 'Số lượng',
            cell: ({ row }) => {
               const data = row.original as ResponseFindOneRepairInvoiceService;
               const isCheck = data.details.some(
                  (item) =>
                     item.status !== STATUS_REPAIR_DETAIL.empty.key && item.status !== STATUS_REPAIR_DETAIL.check.key,
               );
               return (
                  <Box>
                     <Chip label={isCheck ? 'Hoàn thành' : 'Chưa hoàn thành'} color={isCheck ? 'success' : 'error'} />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <>
         <TableCore
            data={data}
            columns={columns}
            isPagination={false}
            getRowCanExpand={() => true}
            renderSubComponent={renderSubComponent as never}
            onClickRow={(row) => {
               row.getToggleExpandedHandler();
            }}
         />
      </>
   );
};

const renderSubComponent = (row: Row<ResponseFindOneRepairInvoiceService>) => {
   return row.original.details.map((item) => {
      return renderDetails(item);
   });
};

const renderDetails = (data: {
   name: string;
   repair_staff_id: string;
   status: string;
   note: string;
   describe: string;
}) => {
   const dataRender = [
      {
         title: 'Tên công việc:',
         value: data.name,
         border: true,
      },
      {
         title: 'Trạng thái:',
         value: data.repair_staff_id,
         border: true,
      },
      {
         title: 'Nhân viên sc:',
         value: data.status,
         border: true,
      },
      {
         title: 'Ghi chú:',
         value: data.note,
         border: true,
         xs: 12,
      },
      {
         title: 'Mô tả công việc:',
         value: data.describe,
         border: true,
         xs: 12,
      },
   ];

   return (
      <Accordion sx={{ boxShadow: 'none', pb: 0 }}>
         <AccordionSummary>
            <Box display="flex" alignItems="center" gap="12px">
               <Button variant="text" sx={{ p: 0, minWidth: '20px' }}>
                  <RemoveIcon />
               </Button>
               <Typography component="h3" sx={{ fontWeight: 400, fontSize: '17px' }}>
                  {data.name}
               </Typography>
            </Box>
         </AccordionSummary>
         <AccordionDetails>
            <Grid container spacing={1}>
               {dataRender.map((item, index) => {
                  return (
                     <Grid item xs={item.xs ?? 4} key={index}>
                        <Grid container spacing={1}>
                           <Grid item xs={item.xs ? 1.5 : 4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                              <ControllerLabel title={item.title} />
                           </Grid>
                           <Grid item xs={item.xs ? 10.5 : 8} pb={1} minHeight="36px">
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
         </AccordionDetails>
      </Accordion>
   );
};

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
   () => ({
      gap: 0,
      '&:not(:last-child)': {
         borderBottom: 0,
      },
      '&:before': {
         display: 'none',
      },
      '& .Mui-expanded': {
         // backgroundColor: theme.palette.background.default,
      },
   }),
);

const AccordionSummary = styled((props: AccordionSummaryProps) => (
   <MuiAccordionSummary
      expandIcon={<KeyboardDoubleArrowRightIcon sx={{ width: '20px', height: '20px' }} />}
      {...props}
   />
))({
   width: 'max-content',
   minHeight: 'auto !important',
   boxShadow: 'unset',
   flexDirection: 'row',
   margin: '0px',
   padding: '0px',
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

export default DetailRepairInvoiceService;
