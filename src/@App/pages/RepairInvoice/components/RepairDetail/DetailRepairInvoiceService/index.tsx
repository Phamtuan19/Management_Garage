/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, ButtonBase, Chip, Drawer, Grid, Stack, Tooltip, Typography, styled } from '@mui/material';
import { ResponseFindOneRepairInvoiceService } from '@App/types/repair-invoice';
import { useState } from 'react';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import CloseIcon from '@mui/icons-material/Close';
import formatPrice from '@Core/Helper/formatPrice';

import RenderSubComponent from './RenderSubComponent';

interface DetailRepairInvoiceServiceProps {
   data: ResponseFindOneRepairInvoiceService[];
}

const DetailRepairInvoiceService = ({ data }: DetailRepairInvoiceServiceProps) => {
   const [openDrawer, setOpenDrawer] = useState<boolean>(false);
   const [dataDrawer, setDataDrawer] = useState<ResponseFindOneRepairInvoiceService | null>(null);

   return (
      <>
         {data.map((item) => {
            return (
               <Grid item xs={4}>
                  <Button
                     component={Tooltip}
                     title="Xem chi tiết"
                     variant="text"
                     sx={{ p: 0, width: '100%' }}
                     onClick={() => {
                        setOpenDrawer(true);
                        setDataDrawer(item);
                     }}
                  >
                     <ExtendStack>
                        <Flex>
                           <ControllerLabel title="Loại :" />
                           <Chip label="Dịch vụ" color="warning" size="small" />
                        </Flex>
                        <Flex>
                           <ControllerLabel title="Mã :" />
                           <Typography
                              sx={{
                                 pb: '2px',
                                 textAlign: 'start',
                              }}
                           >
                              #{item.service_code}
                           </Typography>
                        </Flex>
                        <Flex>
                           <ControllerLabel title="Tên dịch vụ :" />
                           <Typography
                              sx={{
                                 pb: '2px',
                                 flex: 1,
                                 textAlign: 'start',
                                 overflow: 'hidden',
                                 textOverflow: 'ellipsis',
                                 whiteSpace: 'nowrap',
                              }}
                           >
                              {item.service_name}
                           </Typography>
                        </Flex>
                        <Flex>
                           <ControllerLabel title="Danh mục :" />
                           <Typography
                              sx={{
                                 pb: '2px',
                                 textAlign: 'start',
                              }}
                           >
                              {item.category_name}
                           </Typography>
                        </Flex>
                        <Flex>
                           <ControllerLabel title="Giá :" />
                           <Typography
                              sx={{
                                 pb: '2px',
                                 textAlign: 'start',
                              }}
                           >
                              {formatPrice(item.price)}
                           </Typography>
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
                  <RenderSubComponent data={dataDrawer as never} />;
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
   alignItems: 'flex-end',
   width: '100%',
   justifyContent: 'flex-start',
   gap: '12px',
});

export default DetailRepairInvoiceService;
