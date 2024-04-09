/* eslint-disable @typescript-eslint/naming-convention */
import { ResponseFindOneRepairInvoiceSupplies } from '@App/types/repair-invoice';
import { Box, Button, ButtonBase, Chip, Drawer, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import formatPrice from '@Core/Helper/formatPrice';
import CloseIcon from '@mui/icons-material/Close';
import { STATUS_DELIVERY } from '@App/configs/status-config';

import RenderSubComponent from './RenderSubComponent';

interface DetailRepairInvoiceSuppliesProps {
   data: ResponseFindOneRepairInvoiceSupplies[];
}

const DetailRepairInvoiceSupplies = ({ data }: DetailRepairInvoiceSuppliesProps) => {
   const [openDrawer, setOpenDrawer] = useState<boolean>(false);
   const [dataDrawer, setDataDrawer] = useState<ResponseFindOneRepairInvoiceSupplies | null>(null);

   return (
      <>
         {data.map((item) => {
            const status: {
               title: string;
               color: string;
            } = item.status_supplies ? STATUS_DELIVERY[item.status_supplies as never] : STATUS_DELIVERY.empty;

            const minSellingPrice = item.options.length > 0 ? Math.min(...item.options.map((v) => v.selling_price)) : 0;

            // Tìm giá bán (selling_price) lớn nhất
            const maxSellingPrice = item.options.length > 0 ? Math.max(...item.options.map((v) => v.selling_price)) : 0;

            const price =
               minSellingPrice === maxSellingPrice
                  ? formatPrice(maxSellingPrice)
                  : `${formatPrice(minSellingPrice)} - ${formatPrice(maxSellingPrice)}`;

            return (
               <Grid item xs={4}>
                  <Button
                     component={Tooltip}
                     title="Xem chi tiết"
                     variant="text"
                     sx={{ p: 0, width: '100%' }}
                     onClick={() => {
                        if (item.options.length > 0) {
                           setOpenDrawer(true);
                           setDataDrawer(item);
                        }
                     }}
                  >
                     <ExtendStack>
                        <Box display="flex" gap="12px" flex={1}>
                           <Flex>
                              <ControllerLabel title="Mã :" />
                              <Typography
                                 sx={{
                                    pb: '2px',
                                    textAlign: 'start',
                                 }}
                              >
                                 #{item.supplies_detail_code}
                              </Typography>
                           </Flex>
                           <Flex>
                              <ControllerLabel title="Loại :" />
                              <Chip label="Vật tư" color="secondary" size="small" />
                           </Flex>
                           <Flex>
                              <ControllerLabel title="Đvt :" />
                              <Typography
                                 sx={{
                                    pb: '2px',
                                    textAlign: 'start',
                                 }}
                              >
                                 <Chip label={item.unit} color="default" size="small" />
                              </Typography>
                           </Flex>
                        </Box>
                        <Flex>
                           <ControllerLabel title="Tên:" />
                           <Typography
                              component="div"
                              sx={{
                                 pb: '2px',
                                 textAlign: 'start',
                                 flex: 1,
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis',
                                 whiteSpace: 'nowrap',
                              }}
                           >
                              {item.supplies_detail_name}
                           </Typography>
                        </Flex>
                        <Flex>
                           <ControllerLabel title="NPP:" />
                           <Typography
                              component="div"
                              sx={{
                                 pb: '2px',
                                 textAlign: 'start',
                                 flex: 1,
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis',
                                 whiteSpace: 'nowrap',
                              }}
                           >
                              {item.distributors_name}
                           </Typography>
                        </Flex>
                        <Flex>
                           <Flex>
                              <ControllerLabel title="Giá :" />
                              <Typography
                                 sx={{
                                    pb: '2px',
                                    textAlign: 'start',
                                 }}
                              >
                                 {price ?? 0}
                              </Typography>
                           </Flex>
                        </Flex>
                        <Flex>
                           <ControllerLabel title="Lấy vt :" />
                           <Chip label={status.title} color={status.color as never} size="small" />
                        </Flex>
                     </ExtendStack>
                  </Button>
               </Grid>
            );
         })}

         <Drawer open={openDrawer} anchor="right" sx={{ zIndex: 9999 }}>
            <Box sx={{ minWidth: 600, maxWidth: 700 }}>
               <Box
                  sx={({ palette, base }) => ({
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     borderBottom: '1px solid #DADADA',
                     p: '12px 24px 6px 24px',
                     color: base.text.white,
                     backgroundColor: palette.primary.main,
                  })}
               >
                  <Typography>Thông tin chi tiết</Typography>
                  <Box>
                     <ButtonBase onClick={() => setOpenDrawer(false)}>
                        <CloseIcon />
                     </ButtonBase>
                  </Box>
               </Box>
               <Box sx={{ px: '12px', py: '12px' }}>
                  <RenderSubComponent data={dataDrawer as never} />
               </Box>
            </Box>
         </Drawer>
      </>
   );
};

const ExtendStack = styled(Stack)(() => ({
   color: 'black',
   gap: '8px',
   padding: '12px',
   border: '1px solid #e0e0e0',
   borderRadius: '6px',
   bgcolor: 'white',
   boxShadow: '0 0 12px 0 rgba(82,63,105,.08)',
   width: '100%',
}));

const Flex = styled('div')({
   display: 'flex',
   alignItems: 'flex-start',
   width: '100%',
   justifyContent: 'flex-start',
   gap: '12px',
   overflow: 'hidden',
   textOverflow: 'ellipsis',
});
export default DetailRepairInvoiceSupplies;
